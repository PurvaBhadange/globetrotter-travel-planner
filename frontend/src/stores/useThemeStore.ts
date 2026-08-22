import { create } from "zustand";

export type ThemeMode = "neo-brutalism" | "swiss" | "travel-tech";

interface ThemeState {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

const getInitialTheme = (): ThemeMode => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("gt-theme") as ThemeMode;
    if (saved && ["neo-brutalism", "swiss", "travel-tech"].includes(saved)) {
      return saved;
    }
  }
  return "neo-brutalism";
};

export const useThemeStore = create<ThemeState>((set) => ({
  theme: getInitialTheme(),
  setTheme: (newTheme: ThemeMode) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("gt-theme", newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
    }
    set({ theme: newTheme });
  },
}));

// Apply initial attribute on load
if (typeof window !== "undefined") {
  const initial = getInitialTheme();
  document.documentElement.setAttribute("data-theme", initial);
}
