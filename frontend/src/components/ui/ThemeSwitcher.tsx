import React from "react";
import { useThemeStore, ThemeMode } from "../../stores/useThemeStore";
import { Zap, Compass, Moon } from "lucide-react";

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useThemeStore();

  const themes: { id: ThemeMode; label: string; icon: React.ReactNode }[] = [
    {
      id: "neo-brutalism",
      label: "NEO-BRUTALISM",
      icon: <Zap className="w-3.5 h-3.5" />,
    },
    {
      id: "swiss",
      label: "SWISS",
      icon: <Compass className="w-3.5 h-3.5" />,
    },
    {
      id: "travel-tech",
      label: "TRAVEL-TECH",
      icon: <Moon className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <aside aria-label="Theme selection" className="fixed top-4 right-4 z-50 flex items-center gap-1.5 p-1.5 bg-black text-white border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <span className="text-[10px] font-black tracking-widest px-2 text-yellow-300 uppercase hidden sm:inline-block">
        THEME:
      </span>
      <div className="flex items-center gap-1">
        {themes.map((t) => {
          const isActive = theme === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-black uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                isActive
                  ? "bg-[#FF6B6B] text-black border border-black shadow-[2px_2px_0px_0px_#000]"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {t.icon}
              <span className="hidden md:inline">{t.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
