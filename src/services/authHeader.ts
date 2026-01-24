import supabase from "../utils/supabase/supabase";

export async function authHeaders() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.log("Session error:", error);
    throw new Error("Failed to get session");
  }
  const token = data.session?.access_token;

  if (!token) {
    console.error("No access token found");
    throw new Error("User not authenticated");
  }

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}
