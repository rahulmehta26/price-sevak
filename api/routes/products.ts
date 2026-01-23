import express from "express";
import { requireUser } from "../utils/auth.js";
import { scrapeProduct } from "../utils/firecrawl.js";
import { supabase } from "../utils/supabase.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const user = await requireUser(req);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return res.json(data || []);
  } catch (error: any) {
    return res.status(401).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await requireUser(req);

    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    const productData = await scrapeProduct(url);

    if (!productData.productName || !productData.currentPrice) {
      return res.status(400).json({
        error: "Could not extract product information from this URL",
      });
    }

    const newPrice = parseFloat(productData.currentPrice.toString());
    const currency = productData.currencyCode || "INR";

    const { data: existingProduct } = await supabase
      .from("products")
      .select("id, current_price, original_price")
      .eq("user_id", user.id)
      .eq("url", url)
      .single();

    const isUpdate = !!existingProduct;

    const { data: product, error: productError } = await supabase
      .from("products")
      .upsert(
        {
          user_id: user.id,
          url,
          name: productData.productName,
          current_price: productData.currentPrice,
          original_price: isUpdate ? existingProduct.original_price : newPrice,
          currency: productData.currencyCode,
          image_url: productData.productImageUrl,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id,url",
          ignoreDuplicates: false,
        },
      )
      .select()
      .single();

    if (productError) throw productError;

    const shouldAddHistory =
      !isUpdate || existingProduct.current_price !== newPrice;

    if (shouldAddHistory) {
      await supabase.from("price_history").insert({
        product_id: product.id,
        price: newPrice,
        currency: currency,
      });
    }

    if (!isUpdate) {
      const { error: alertError } = await supabase.from("alerts").insert({
        user_id: user.id,
        product_id: product.id,
        is_active: false,
        email_enabled: false,
      });

      if (alertError) {
        console.error("⚠️ Alert creation error:", alertError);
      } else {
        console.log("🔔 Created inactive alert");
      }

      const { error: activityError } = await supabase
        .from("activities")
        .insert({
          user_id: user.id,
          product_id: product.id,
          type: "check",
          product_name: productData.productName,
          new_price: newPrice,
          description: `Started tracking ${productData.productName}`,
        });

      if (activityError) {
        console.error("⚠️ Activity log error:", activityError);
      } else {
        console.log("📝 Logged activity");
      }
    }

    return res.json({
      success: true,
      product,
      message: isUpdate
        ? "Product updated with latest price!"
        : "Product added successfully!",
    });
  } catch (error: any) {
    console.log("Add product error:", error);
    return res.status(500).json({ error: error.message });
  }
});

router.delete("/", async (req, res) => {
  try {
    const user = await requireUser(req);
    const id = req.query.id as string;

    if (!id) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      console.error("SUPABASE DELETE ERROR 👉", error);
      return res.status(500).json({ error });
    }

    if (error) throw error;

    return res.json({ success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
