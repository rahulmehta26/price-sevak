import supabase from "../utils/supabase/supabase";

export async function authHeaders() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw new Error(`Authentication failed: ${error.message}`);
  }
  const token = data.session?.access_token;

  if (!token) {
    throw new Error("User not authenticated");
  }

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}
