import express from "express";
import { ENV } from "../config/env.js";
import { supabase } from "../utils/supabase.js";
import { scrapeProduct } from "../utils/firecrawl.js";
import { sendPriceDropAlert } from "../utils/email.js";

const router = express.Router();

router.post("/check-prices", async (req, res) => {
  try {
    // 1. Verify authorization
    const authHeader = req.headers.authorization;
    if (authHeader !== `Bearer ${ENV.CRON_SECRET}`) {
      console.log("❌ Unauthorized cron request");
      return res.status(401).json({ error: "Unauthorized" });
    }

    console.log("✅ Cron job authorized, starting price check...");

    //2. Fetch all products (service role)

    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("*");

    if (productsError) {
      console.error("Database error:", productsError);
      throw productsError;
    }

    console.log(`📦 Found ${products?.length || 0} products to check`);

    const results = {
      total: products?.length || 0,
      updated: 0,
      failed: 0,
      priceChanges: 0,
      alertsSent: 0,
    };

    if (!products || products.length === 0) {
      return res.json({
        success: true,
        message: "No products to check",
        results,
      });
    }

    // 3. Process each product

    for (const product of products) {
      try {
        console.log(`\n🔍 Checking: ${product.name}`);

        // Scrape current price
        const productData = await scrapeProduct(product.url);

        if (!productData.currentPrice) {
          console.log(`⚠️  No price found for ${product.name}`);
          results.failed++;
          continue;
        }

        const newPrice = parseFloat(productData.currentPrice.toString());
        const oldPrice = parseFloat(product.current_price);

        console.log(`💰 Old: ${oldPrice}, New: ${newPrice}`);

        // Update product
        await supabase
          .from("products")
          .update({
            current_price: newPrice,
            currency: productData.currencyCode || product.currency,
            name: productData.productName || product.name,
            image_url: productData.productImageUrl || product.image_url,
            updated_at: new Date().toISOString(),
          })
          .eq("id", product.id);

        results.updated++;

        // If price changed, add to history
        if (oldPrice !== newPrice) {
          await supabase.from("price_history").insert({
            product_id: product.id,
            price: newPrice,
            currency: productData.currencyCode || product.currency,
          });

          results.priceChanges++;
          console.log(`📊 Price changed! Added to history`);

          // If price dropped, send email
          if (newPrice < oldPrice) {
            const {
              data: { user },
              error: userError,
            } = await supabase.auth.admin.getUserById(product?.user_id);

            if (!userError && user?.email) {
              const emailProduct = {
                name: productData.productName || product.name,
                image_url: productData.productImageUrl || product.image_url,
                currency: productData.currencyCode || product.currency,
                url: product.url,
              };

              const emailResult = await sendPriceDropAlert(
                user.email,
                emailProduct,
                oldPrice,
                newPrice
              );

              if (emailResult?.success) {
                results.alertsSent++;
              }
            }
          }
        } else {
          console.log(`✓ Price unchanged`);
        }
      } catch (error: any) {
        console.error(`❌ Error processing ${product.name}:`, error.message);
        results.failed++;
      }
    }

    console.log("\n📊 Price check completed!");
    console.log(`Results:`, results);

    return res.json({
      success: true,
      message: "Price check completed",
      results,
    });
  } catch (error: any) {
    console.error("❌ Cron job error:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET endpoint for health check
router.get("/check-prices", (req, res) => {
  res.json({
    message: "Price check endpoint is working. Use POST to trigger.",
    status: "ready",
  });
});

export default router;
