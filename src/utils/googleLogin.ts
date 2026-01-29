import { useAuthState } from "../store/useAuthStore";
import { useToast } from "../store/useToast";
import supabase from "./supabase/supabase";

const addToast = useToast((s) => s.addToast);

export const handleGoogleLogin = async () => {
  try {
    const { origin } = window.location;

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: origin,
      },
    });
  } catch (error) {
    addToast({
      title: "Login failed",
      description: "Unable to sign in with Google. Please try again.",
      type: "error",
    });
  }
};

export const handleGoogleLogout = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    useAuthState.getState().logOut();

    addToast({
      title: "Signed out successfully",
      type: "success",
      duration: 2000,
    });
  } catch (error) {
    addToast({
      title: "Logout failed",
      description: "Please try again or refresh the page",
      type: "error",
    });
  }
};
