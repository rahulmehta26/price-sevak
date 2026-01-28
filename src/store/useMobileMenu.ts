import { create } from "zustand";

interface MobileMenuState {
  open: boolean;
  toggle: () => void;
  close: () => void;
  openMenu: () => void;
}

export const useMobileMenu = create<MobileMenuState>((set) => ({
  open: false,

  toggle: () =>
    set((s) => ({
      open: !s.open,
    })),

  close: () => set({ open: false }),

  openMenu: () => set({ open: true }),
}));
