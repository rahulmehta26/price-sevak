import express from "express";
import { requireUser } from "../utils/auth.js";
import { supabase } from "../utils/supabase.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const user = await requireUser(req);

    const limit = Number(req.query.limit ?? 50);
    const offset = Number(req.query.offset ?? 0);

    const { data, error } = await supabase
      .from("activities")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    res.json(data || []);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/grouped", async (req, res) => {
  try {
    const user = await requireUser(req);

    const { data, error } = await supabase
      .from("activities")
      .select(
        `
        id,
        type,
        product_name,
        old_price,
        new_price,
        change_percentage,
        description,
        created_at
      `,
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(500);

    if (error) throw error;

    const grouped: Record<string, any[]> = {};

    (data || []).forEach((activity) => {
      const date = activity.created_at.split("T")[0];
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(activity);
    });

    const response = Object.keys(grouped)
      .sort((a, b) => b.localeCompare(a))
      .slice(0, 30)
      .map((date) => ({
        date,
        activities: grouped[date],
      }));

    res.json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
