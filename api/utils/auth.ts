import { supabase } from "./supabase.js";

export async function requireUser(req: any) {
  const auth = req.headers.authorization;

  console.log("Authorization header:", auth ? "Present" : "Missing");

  if (!auth) throw new Error("No authorization header");

  const token = auth.replace("Bearer ", "");

  console.log("Token length:", token.length);

  try {
    const { data, error } = await supabase.auth.getUser(token);

    if (error) {
      console.error("Auth error:", error);
      throw new Error(`Authentication failed: ${error.message}`);
    }

    if (!data.user) {
      throw new Error("No user found");
    }

    console.log("User authenticated:", data.user.email);
    return data.user;
  } catch (error) {
    console.error("requireUser error:", error);
    throw error;
  }
}
