import supabase from "../utils/supabase/supabase";
import { useAuthState } from "../store/useAuthStore";
import { useToast } from "../store/useToast";

export const loginWithGoogle = async () => {
  try {
    const { origin } = window.location;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: origin },
    });

    if (error) throw error;
  } catch (error) {
    useToast.getState().addToast({
      title: "Login failed",
      description: "Unable to sign in with Google.",
      type: "error",
    });

    throw error;
  }
};

export const logout = async () => {
  try {
    await supabase.auth.signOut();
    useAuthState.getState().logOut();

    useToast.getState().addToast({
      title: "Signed out",
      type: "success",
    });
  } catch (error) {
    useToast.getState().addToast({
      title: "Logout failed",
      type: "error",
    });

    throw error;
  }
};
