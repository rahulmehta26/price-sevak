import { supabase } from "./supabase.js";

export async function requireUser(req: any) {
  const auth = req.headers.authorization;

  if (!auth) throw new Error("No authorization header");

  const token = auth.replace("Bearer ", "");

  try {
    const { data, error } = await supabase.auth.getUser(token);

    if (error) {
      throw new Error(`Authentication failed: ${error.message}`);
    }

    if (!data.user) {
      throw new Error("No user found");
    }

    return data.user;
  } catch (error) {
    throw error;
  }
}
