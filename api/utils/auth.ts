import { supabase } from "./supabase.js";

export async function requireUser(req: any) {
  const auth = req.headers.authorization;

  if (!auth) throw new Error("Unauthorized");

  const token = auth.replace("Bearer ", "");

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) throw new Error("Unauthorized");

  return data.user;
}
