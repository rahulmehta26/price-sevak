import { useToast } from "../store/useToast";
import supabase from "../utils/supabase/supabase";

const addToast = useToast((s) => s.addToast);

export async function authHeaders() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    addToast({
      title: "Session expired",
      description: "Please sign in again",
      type: "warning",
      duration: 5000,
    });
    throw new Error(`Authentication failed: ${error.message}`);
  }
  const token = data.session?.access_token;

  if (!token) {
    addToast({
      title: "Authentication required",
      description: "Please sign in to continue",
      type: "info",
    });
    throw new Error("User not authenticated");
  }

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}
