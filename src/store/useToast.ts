import { create } from "zustand";

export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id?: string;
  title?: string;
  description?: string;
  type: ToastType;
  duration?: number;
}

interface ToastState {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

export const useToast = create<ToastState>((set) => ({
  toasts: [],

  addToast: (toast) =>
    set((state) => ({
      toasts: [
        ...state.toasts,
        {
          id: crypto.randomUUID(),
          ...toast,
        },
      ],
    })),

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
