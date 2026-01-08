import express from "express";
import { requireUser } from "../utils/auth.js";
import { supabase } from "../utils/supabase.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const user = await requireUser(req);
    const { productId } = req.query;

    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const { data: product } = await supabase
      .from("products")
      .select("id")
      .eq("id", productId)
      .eq("user_id", user.id)
      .single();

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const { data, error } = await supabase
      .from("price_history")
      .select("*")
      .eq("product_id", productId)
      .order("checked_at", { ascending: true });

    if (error) throw error;

    return res.json(data || []);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
