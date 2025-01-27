import { create } from "zustand";

export const useToastStore = create((set) => ({
  toast: {
    open: false,
    severity: "success", // success | error | info | warning
    message: "",
  },
  showToast: ({ severity, message }) =>
    set({
      toast: {
        open: true,
        severity,
        message,
      },
    }),
  hideToast: () =>
    set({
      toast: {
        open: false,
        severity: "success",
        message: "",
      },
    }),
}));
