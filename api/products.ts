import { requireUser } from "./utils/auth.js";
import { scrapeProduct } from "./utils/firecrawl.js";
import { supabase } from "./utils/supabase.js";

export default async function handler(req: any, res: any) {
  try {
    if (req.method === "POST") {
      const user = await requireUser(req);
      const { url } = req.body;

      if (!url) return res.status(400).json({ error: "URL required" });

      const product = await scrapeProduct(url);

      const { data } = await supabase
        .from("products")
        .insert({
          user_id: user.id,
          url,
          title: product.title,
          price: product.price,
          image: product.image,
        })
        .select()
        .single();

      await supabase.from("price_history").insert({
        product_id: data.id,
        price: product.price,
      });

      return res.json({ success: true });
    }

    if (req.method === "GET") {
      const user = await requireUser(req);

      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("user_id", user.id);

      return res.json(data);
    }

    if (req.method === "DELETE") {
      const user = await requireUser(req);
      const { id } = req.query;

      await supabase
        .from("products")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id);

      return res.json({ success: true });
    }

    res.status(405).end();
  } catch (e: any) {
    return res.status(401).json({ error: e.message });
  }
}
