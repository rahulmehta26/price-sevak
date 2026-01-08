import express from "express";
import { ENV } from "../config/env.js";
import { supabase } from "../utils/supabase.js";
import { scrapeProduct } from "../utils/firecrawl.js";
import { sendPriceDropAlert } from "../utils/email.js";

const router = express.Router();

// POST /api/cron/check-prices - Check all product prices
router.post("/check-prices", async (req, res) => {
  try {
    // Verify cron secret
    const authHeader = req.headers.authorization;
    if (authHeader !== `Bearer ${ENV.CRON_SECRET}`) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Get all products (using service role to bypass RLS)
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("*");

    if (productsError) throw productsError;

    console.log(`Found ${products.length} products to check`);

    const results = {
      total: products.length,
      updated: 0,
      failed: 0,
      priceChanges: 0,
      alertsSent: 0,
    };

    for (const product of products) {
      try {
        const productData = await scrapeProduct(product.url);

        if (!productData.currentPrice) {
          results.failed++;
          continue;
        }

        const newPrice = parseFloat(productData.currentPrice.toString());
        const oldPrice = parseFloat(product.current_price);

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

        // Add price history if changed
        if (oldPrice !== newPrice) {
          await supabase.from("price_history").insert({
            product_id: product.id,
            price: newPrice,
            currency: productData.currencyCode || product.currency,
          });

          results.priceChanges++;

          // Send email if price dropped
          if (newPrice < oldPrice) {
            const {
              data: { user },
            } = await supabase.auth.admin.getUserById(product.user_id);

            if (user?.email) {
              const emailResult = await sendPriceDropAlert(
                user.email,
                product,
                oldPrice,
                newPrice
              );

              if (emailResult.success) {
                results.alertsSent++;
              }
            }
          }
        }

        results.updated++;
      } catch (error) {
        console.error(`Error processing product ${product.id}:`, error);
        results.failed++;
      }
    }

    return res.json({
      success: true,
      message: "Price check completed",
      results,
    });
  } catch (error: any) {
    console.error("Cron job error:", error);
    return res.status(500).json({ error: error.message });
  }
});

// GET /api/cron/check-prices - Test endpoint
router.get("/check-prices", (req, res) => {
  res.json({
    message: "Price check endpoint is working. Use POST to trigger.",
  });
});

export default router;
