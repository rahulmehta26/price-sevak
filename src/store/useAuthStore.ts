import type { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";

interface AuthStateProps {
  user: User | null;
  session: Session | null;
  loading: boolean;
  setAuth: (session: Session | null) => void;
  logOut: () => void;
}

export const useAuthState = create<AuthStateProps>((set) => ({
  user: null,
  session: null,
  loading: true,

  setAuth: (session) =>
    set({
      session,
      user: session?.user ?? null,
      loading: false,
    }),

  logOut: () =>
    set({
      user: null,
      session: null,
    }),
}));
