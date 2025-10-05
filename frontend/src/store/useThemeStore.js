import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("qrconnect-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("qrconnect-theme", theme);
    set({ theme });
  },
}));
