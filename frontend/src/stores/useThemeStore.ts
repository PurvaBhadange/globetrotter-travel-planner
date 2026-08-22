import { create } from "zustand";

export type ThemeMode = "neo-brutalism" | "swiss" | "travel-tech";

export interface MonthThemeConfig {
  monthIndex: number; // 0-11
  name: string; // "January", "February", etc.
  season: "Winter" | "Spring" | "Summer" | "Autumn";
  code: string; // "JAN", "FEB", etc.
  tagline: string;
  primaryColor: string; // HEX or Tailwind class
  secondaryColor: string;
  bgColor: string;
  cardBgColor: string;
  badgeBg: string;
  icon: string; // Emoji or Lucide name
}

export const MONTH_CONFIGS: MonthThemeConfig[] = [
  {
    monthIndex: 0,
    name: "January",
    code: "JAN",
    season: "Winter",
    tagline: "FROST & NEW BEGINNINGS",
    primaryColor: "#00F0FF", // Electric Ice Blue
    secondaryColor: "#7000FF",
    bgColor: "#E0F7FA",
    cardBgColor: "#FFFFFF",
    badgeBg: "#00E5FF",
    icon: "❄️",
  },
  {
    monthIndex: 1,
    name: "February",
    code: "FEB",
    season: "Winter",
    tagline: "VALENTINE & CYBER VIOLET",
    primaryColor: "#FF2E93", // Neon Pink
    secondaryColor: "#FF8A00",
    bgColor: "#FCE4EC",
    cardBgColor: "#FFFFFF",
    badgeBg: "#FF4081",
    icon: "💖",
  },
  {
    monthIndex: 2,
    name: "March",
    code: "MAR",
    season: "Spring",
    tagline: "SPRING AWAKENING & LIME VOLT",
    primaryColor: "#00E676", // Electric Lime Green
    secondaryColor: "#00B0FF",
    bgColor: "#E8F5E9",
    cardBgColor: "#FFFFFF",
    badgeBg: "#69F0AE",
    icon: "🌱",
  },
  {
    monthIndex: 3,
    name: "April",
    code: "APR",
    season: "Spring",
    tagline: "SAKURA BLOOM & SUNSHINE",
    primaryColor: "#FF4081", // Coral Rose
    secondaryColor: "#FFD54F",
    bgColor: "#FFF0F5",
    cardBgColor: "#FFFFFF",
    badgeBg: "#FF80AB",
    icon: "🌸",
  },
  {
    monthIndex: 4,
    name: "May",
    code: "MAY",
    season: "Spring",
    tagline: "GOLDEN HOUR & VERDANT TRAILS",
    primaryColor: "#FFC107", // Golden Amber
    secondaryColor: "#00E676",
    bgColor: "#FFF8E1",
    cardBgColor: "#FFFFFF",
    badgeBg: "#FFE082",
    icon: "🌼",
  },
  {
    monthIndex: 5,
    name: "June",
    code: "JUN",
    season: "Summer",
    tagline: "SOLSTICE & CORAL FIRE",
    primaryColor: "#FF3D00", // Sizzling Coral
    secondaryColor: "#FFD93D",
    bgColor: "#FFEBEE",
    cardBgColor: "#FFFFFF",
    badgeBg: "#FF6E40",
    icon: "☀️",
  },
  {
    monthIndex: 6,
    name: "July",
    code: "JUL",
    season: "Summer",
    tagline: "OCEAN BLUE & BEACH WAVES",
    primaryColor: "#00B0FF", // Vivid Cyan Blue
    secondaryColor: "#FF4081",
    bgColor: "#E1F5FE",
    cardBgColor: "#FFFFFF",
    badgeBg: "#40C4FF",
    icon: "🏖️",
  },
  {
    monthIndex: 7,
    name: "August",
    code: "AUG",
    season: "Summer",
    tagline: "MID-SUMMER SUNBURST",
    primaryColor: "#FFD93D", // Vivid Sun Yellow
    secondaryColor: "#FF6B6B",
    bgColor: "#FFFDF5",
    cardBgColor: "#FFFFFF",
    badgeBg: "#FFE082",
    icon: "🌻",
  },
  {
    monthIndex: 8,
    name: "September",
    code: "SEP",
    season: "Autumn",
    tagline: "AUTUMN EQUINOX & HARVEST OCHRE",
    primaryColor: "#FF6D00", // Deep Amber Orange
    secondaryColor: "#FFC107",
    bgColor: "#FFF3E0",
    cardBgColor: "#FFFFFF",
    badgeBg: "#FF9100",
    icon: "🍂",
  },
  {
    monthIndex: 9,
    name: "October",
    code: "OCT",
    season: "Autumn",
    tagline: "NEON PUMPKIN & CRIMSON NIGHT",
    primaryColor: "#FFAB00", // Spooky Pumpkin Gold
    secondaryColor: "#D500F9",
    bgColor: "#F3E5F5",
    cardBgColor: "#FFFFFF",
    badgeBg: "#FFC400",
    icon: "🎃",
  },
  {
    monthIndex: 10,
    name: "November",
    code: "NOV",
    season: "Autumn",
    tagline: "GOLDEN FOREST & COZY LEAVES",
    primaryColor: "#D84315", // Warm Terracotta
    secondaryColor: "#FF8F00",
    bgColor: "#FBE9E7",
    cardBgColor: "#FFFFFF",
    badgeBg: "#FF7043",
    icon: "🍁",
  },
  {
    monthIndex: 11,
    name: "December",
    code: "DEC",
    season: "Winter",
    tagline: "HOLIDAY LIGHTS & EMERALD FROST",
    primaryColor: "#D50000", // Electric Crimson
    secondaryColor: "#00E676",
    bgColor: "#FFEBEE",
    cardBgColor: "#FFFFFF",
    badgeBg: "#FF5252",
    icon: "🎄",
  },
];

interface ThemeState {
  theme: ThemeMode;
  currentMonthIndex: number;
  isAutoMonth: boolean;
  setTheme: (theme: ThemeMode) => void;
  setMonth: (monthIndex: number) => void;
  setAutoMonth: (isAuto: boolean) => void;
  getCurrentMonthConfig: () => MonthThemeConfig;
}

const getAutoMonthIndex = (): number => {
  return new Date().getMonth();
};

const getInitialMonthIndex = (): number => {
  if (typeof window !== "undefined") {
    const savedMonth = localStorage.getItem("gt-month-index");
    if (savedMonth !== null) {
      const parsed = parseInt(savedMonth, 10);
      if (!isNaN(parsed) && parsed >= 0 && parsed <= 11) {
        return parsed;
      }
    }
  }
  return getAutoMonthIndex();
};

const getInitialAutoStatus = (): boolean => {
  if (typeof window !== "undefined") {
    const savedAuto = localStorage.getItem("gt-is-auto-month");
    if (savedAuto !== null) {
      return savedAuto === "true";
    }
  }
  return true; // Default to auto month active
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: "neo-brutalism", // Enforce Neo-brutalism as primary design style
  currentMonthIndex: getInitialAutoStatus() ? getAutoMonthIndex() : getInitialMonthIndex(),
  isAutoMonth: getInitialAutoStatus(),

  setTheme: (newTheme: ThemeMode) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("gt-theme", newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
    }
    set({ theme: newTheme });
  },

  setMonth: (monthIndex: number) => {
    const validIndex = Math.max(0, Math.min(11, monthIndex));
    if (typeof window !== "undefined") {
      localStorage.setItem("gt-month-index", validIndex.toString());
      localStorage.setItem("gt-is-auto-month", "false");
      applyMonthAttributes(validIndex);
    }
    set({ currentMonthIndex: validIndex, isAutoMonth: false });
  },

  setAutoMonth: (isAuto: boolean) => {
    const monthIndex = isAuto ? getAutoMonthIndex() : get().currentMonthIndex;
    if (typeof window !== "undefined") {
      localStorage.setItem("gt-is-auto-month", isAuto.toString());
      if (isAuto) {
        localStorage.setItem("gt-month-index", monthIndex.toString());
      }
      applyMonthAttributes(monthIndex);
    }
    set({ isAutoMonth: isAuto, currentMonthIndex: monthIndex });
  },

  getCurrentMonthConfig: () => {
    const idx = get().currentMonthIndex;
    return MONTH_CONFIGS[idx] || MONTH_CONFIGS[7];
  },
}));

function applyMonthAttributes(monthIdx: number) {
  if (typeof window === "undefined") return;
  const config = MONTH_CONFIGS[monthIdx] || MONTH_CONFIGS[7];
  document.documentElement.setAttribute("data-theme", "neo-brutalism");
  document.documentElement.setAttribute("data-month", config.code.toLowerCase());
  document.documentElement.style.setProperty("--neo-accent", config.primaryColor);
  document.documentElement.style.setProperty("--neo-secondary", config.secondaryColor);
  document.documentElement.style.setProperty("--neo-bg", config.bgColor);
}

// Apply attributes on initialization
if (typeof window !== "undefined") {
  const initialAuto = getInitialAutoStatus();
  const initialMonth = initialAuto ? getAutoMonthIndex() : getInitialMonthIndex();
  applyMonthAttributes(initialMonth);
}
