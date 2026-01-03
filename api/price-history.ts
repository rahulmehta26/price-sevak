import { supabase } from "./utils/supabase.js";

export default async function handler(req, res) {
  const { productId } = req.query;

  const { data } = await supabase
    .from("price_history")
    .select("*")
    .eq("product_id", productId)
    .order("created_at", { ascending: false });

  res.json(data);
}
