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
      return res.status(401).json({ error: "Unauthorized" });
    }

    //2. Fetch products with ACTIVE alerts only

    const { data: alerts, error: alertsError } = await supabase
      .from("alerts")
      .select(
        `
      id,
      user_id,
      product_id,
      target_price,
      email_enabled,
      products(
      id, 
      name,
      url,
      current_price,
      original_price,
      currency,
      image_url
      )
        `,
      )
      .eq("is_active", true);

    if (alertsError) {
      throw alertsError;
    }

    const results = {
      total: alerts?.length || 0,
      updated: 0,
      failed: 0,
      unchanged: 0,
      priceDrops: 0,
      priceRises: 0,
      alertsSent: 0,
      errors: [] as string[],
    };

    if (!alerts || alerts.length === 0) {
      return res.json({
        success: true,
        message: "No active alerts to check",
        results,
      });
    }

    // 3. Process each product

    for (const alert of alerts) {
      const alertData = alert as any;
      const product = Array.isArray(alertData.products)
        ? alertData.products[0]
        : alertData.products;

      if (!product) {
        results.failed++;
        results.errors.push(`Alert ${product.id}: Product not found`);
        continue;
      }

      try {
        // Scrape current price
        const productData = await scrapeProduct(product.url);

        if (!productData.currentPrice) {
          results.failed++;
          results.errors.push(`${product.name}: No price found`);

          await supabase.from("activities").insert({
            user_id: alert.user_id,
            product_id: product.id,
            type: "check",
            product_name: product.name,
            description: `Failed to check price: No price data returned`,
          });
          continue;
        }

        const newPrice = parseFloat(productData.currentPrice.toString());
        const oldPrice = parseFloat(product.current_price);

        // Update product
        const { error: updateError } = await supabase
          .from("products")
          .update({
            current_price: newPrice,
            currency: productData.currencyCode || product.currency,
            name: productData.productName || product.name,
            image_url: productData.productImageUrl || product.image_url,
            updated_at: new Date().toISOString(),
          })
          .eq("id", product.id);

        if (updateError) {
          results.failed++;
          results.errors.push(`${product.name}: Update failed`);
          continue;
        }

        results.updated++;

        if (oldPrice === newPrice) {
          results.unchanged++;
          continue;
        }

        const change =
          oldPrice > 0 ? ((oldPrice - newPrice) / oldPrice) * 100 : 0;
        const activityType = newPrice < oldPrice ? "price_drop" : "price_rise";

        await supabase.from("price_history").insert({
          product_id: product.id,
          price: newPrice,
          currency: productData.currencyCode || product.currency,
        });

        await supabase.from("activities").insert({
          user_id: alert.user_id,
          product_id: product.id,
          new_price: newPrice,
          old_price: oldPrice,
          type: activityType,
          product_name: product.name,
          change_percentage: parseFloat(change.toFixed(2)),
          description: `Price ${activityType === "price_drop" ? "dropped" : "increased"} by ${Math.abs(change).toFixed(2)}%`,
        });

        if (activityType === "price_drop") {
          results.priceDrops++;
        } else {
          results.priceRises++;
        }

        const shouldSendEmail =
          alert.email_enabled &&
          newPrice < oldPrice &&
          (!alert.target_price || newPrice <= alert.target_price);

        if (shouldSendEmail) {
          // Get user email
          const {
            data: { user },
            error: userError,
          } = await supabase.auth.admin.getUserById(alert.user_id);

          if (userError) {
            results.errors.push(`${product.name}: Failed to fetch user`);
          } else if (user?.email) {
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
              newPrice,
            );

            if (emailResult?.success) {
              results.alertsSent++;

              // Log alert triggered
              await supabase.from("activities").insert({
                user_id: alert.user_id,
                product_id: product.id,
                type: "alert_triggered",
                product_name: product.name,
                old_price: oldPrice,
                new_price: newPrice,
                change_percentage: parseFloat(change.toFixed(2)),
                description: `Email alert sent: Price dropped to ${product.currency} ${newPrice}`,
              });
            } else {
              results.errors.push(`${product.name}: Email sending failed`);
            }
          }
        }
      } catch (error: any) {
        results.failed++;
        results.errors.push(`${product.name}: ${error.message}`);

        // Log failed check
        await supabase.from("activities").insert({
          user_id: alert.user_id,
          product_id: product.id,
          type: "check",
          product_name: product.name,
          description: `Failed to check price: ${error.message}`,
        });
      }
    }

    return res.json({
      success: true,
      message: "Price check completed",
      results,
    });
  } catch (error: any) {
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
