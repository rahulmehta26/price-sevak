import { useAuthState } from "../store/useAuthStore";
import supabase from "./supabase/supabase";

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
    throw error;
  }
};

export const handleGoogleLogout = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    useAuthState.getState().logOut();
  } catch (error) {
    throw error;
  }
};
