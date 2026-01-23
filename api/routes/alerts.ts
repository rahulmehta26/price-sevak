import express from "express";
import { requireUser } from "../utils/auth.js";
import { supabase } from "../utils/supabase.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const user = await requireUser(req);

    const { data, error } = await supabase
      .from("alerts")
      .select(
        `
        id,
        product_id,
        target_price,
        is_active,
        email_enabled,
        created_at,
        updated_at,
        products(
          name,
          image_url,
          current_price,
          original_price,
          url
        )
      `,
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Flatten product fields (optional, matches your SQL output)
    const alerts = (data || []).map((alert: any) => {
      const product = Array.isArray(alert.products)
        ? alert.products[0]
        : alert.products;
      return {
        ...alert,
        product_name: product?.name,
        image_url: product?.image_url,
        current_price: product?.current_price,
        original_price: product?.original_price,
        url: product?.url,
        products: undefined,
      };
    });

    res.json(alerts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await requireUser(req);
    const { product_id, target_price } = req.body;

    if (!product_id) {
      return res.status(400).json({ error: "product_id is required" });
    }

    const { data: product } = await supabase
      .from("products")
      .select("id")
      .eq("id", product_id)
      .eq("user_id", user.id)
      .single();

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const { data, error } = await supabase
      .from("alerts")
      .upsert(
        {
          user_id: user.id,
          product_id,
          target_price,
          is_active: false,
          email_enabled: false,
        },
        {
          onConflict: "user_id,product_id",
        },
      )
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const user = await requireUser(req);
    const alertId = req.params.id;
    const { is_active, target_price, email_enabled } = req.body;

    const updates: any = {};
    if (typeof is_active === "boolean") updates.is_active = is_active;
    if (typeof email_enabled === "boolean")
      updates.email_enabled = email_enabled;
    if (target_price !== undefined) updates.target_price = target_price;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: "No updates provided" });
    }

    const { data, error } = await supabase
      .from("alerts")
      .update(updates)
      .eq("id", alertId)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error || !data) {
      return res.status(404).json({ error: "Alert not found" });
    }

    if (is_active === true) {
      const { data: product } = await supabase
        .from("products")
        .select("name")
        .eq("id", data.product_id)
        .single();

      if (product) {
        await supabase.from("activities").insert({
          user_id: user.id,
          product_id: data.product_id,
          type: "alert_set",
          product_name: product.name,
          description: `Alert enabled for ${product.name}`,
        });
      }
    }

    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await requireUser(req);
    const alertId = req.params.id;

    const { data, error } = await supabase
      .from("alerts")
      .delete()
      .eq("id", alertId)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error || !data) {
      return res.status(404).json({ error: "Alert not found" });
    }

    res.json({ success: true, message: "Alert deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
