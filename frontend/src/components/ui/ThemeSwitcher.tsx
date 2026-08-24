import React, { useState } from "react";
import { useThemeStore, MONTH_CONFIGS } from "../../stores/useThemeStore";
import { Calendar, Sparkles, RefreshCw, ChevronDown, Check } from "lucide-react";

export const ThemeSwitcher: React.FC = () => {
  const { currentMonthIndex, isAutoMonth, setMonth, setAutoMonth, getCurrentMonthConfig } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);

  const activeConfig = getCurrentMonthConfig();
  const realCurrentMonthIdx = new Date().getMonth();

  return (
    <aside
      aria-label="Automatic Monthly Theme Selector"
      className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-end gap-2"
    >
      {/* Main Pill Bar */}
      <div className="flex items-center gap-2 p-1.5 bg-[#FFD93D] text-black border-3 border-black shadow-[4px_4px_0px_0px_#000]">
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-black text-white text-[10px] font-black tracking-widest uppercase border border-black">
          <Calendar className="w-3.5 h-3.5 text-[#FFD93D]" />
          <span className="hidden sm:inline">MONTHLY ENGINE:</span>
        </div>

        {/* Active Month Display & Dropdown Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 px-3 py-1 bg-white text-black font-extrabold text-xs uppercase tracking-wider border-2 border-black hover:bg-[#FF6B6B] hover:text-white transition-colors cursor-pointer shadow-[2px_2px_0px_0px_#000]"
        >
          <span>{activeConfig.icon}</span>
          <span className="font-black">{activeConfig.name.toUpperCase()}</span>
          <span className="text-[10px] bg-black text-white px-1.5 py-0.2 rounded-none font-black">
            {activeConfig.season.toUpperCase()}
          </span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {/* Auto Sync Toggle Button */}
        <button
          onClick={() => setAutoMonth(!isAutoMonth)}
          title={isAutoMonth ? "Auto Syncing with Real Calendar Month" : "Click to re-enable Auto Month Sync"}
          className={`flex items-center gap-1 px-2 py-1 text-[10px] font-black uppercase tracking-wider border-2 border-black transition-all cursor-pointer ${
            isAutoMonth
              ? "bg-[#00E676] text-black shadow-[2px_2px_0px_0px_#000]"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <RefreshCw className={`w-3 h-3 ${isAutoMonth ? "animate-spin-slow" : ""}`} />
          <span>{isAutoMonth ? "AUTO SYNC ON" : "MANUAL PREVIEW"}</span>
        </button>
      </div>

      {/* Expanded Month Picker Grid (Neo-Brutalist Popover) */}
      {isOpen && (
        <div className="w-80 p-3 bg-white border-3 border-black shadow-[6px_6px_0px_0px_#000] animate-fadeIn text-black">
          <div className="flex items-center justify-between pb-2 mb-2 border-b-2 border-black">
            <div className="flex items-center gap-1 text-xs font-black uppercase tracking-wider text-black">
              <Sparkles className="w-4 h-4 text-[#FF3D00]" />
              <span>SELECT SEASONAL THEME</span>
            </div>
            {isAutoMonth && (
              <span className="text-[10px] font-black bg-[#00E676] text-black px-1.5 py-0.5 border border-black">
                LIVE CALENDAR ACTIVE
              </span>
            )}
          </div>

          {/* 12 Months Grid */}
          <div className="grid grid-cols-3 gap-1.5">
            {MONTH_CONFIGS.map((m) => {
              const isSelected = currentMonthIndex === m.monthIndex;
              const isRealCurrent = realCurrentMonthIdx === m.monthIndex;

              return (
                <button
                  key={m.code}
                  onClick={() => {
                    setMonth(m.monthIndex);
                    setIsOpen(false);
                  }}
                  className={`p-2 flex flex-col items-center justify-center border-2 border-black text-center transition-all cursor-pointer text-xs font-black uppercase ${
                    isSelected
                      ? "bg-[#FFD93D] text-black shadow-[3px_3px_0px_0px_#000] scale-[1.03]"
                      : "bg-gray-50 hover:bg-[#FF6B6B] hover:text-white"
                  }`}
                  style={{
                    borderLeftColor: isSelected ? "#000" : m.primaryColor,
                    borderLeftWidth: "4px",
                  }}
                >
                  <span className="text-base mb-0.5">{m.icon}</span>
                  <span className="text-[11px] leading-tight font-extrabold">{m.code}</span>
                  <span className="text-[9px] opacity-80">{m.season}</span>

                  {isRealCurrent && (
                    <span className="mt-1 text-[8px] bg-black text-white px-1 py-0.2 font-bold tracking-widest">
                      NOW
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer controls inside popover */}
          <div className="pt-3 mt-2 border-t-2 border-black flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-600">
              {activeConfig.tagline}
            </span>
            <button
              onClick={() => {
                setAutoMonth(true);
                setIsOpen(false);
              }}
              className="text-[10px] font-black uppercase px-2 py-1 bg-black text-white hover:bg-[#FF3D00] border border-black cursor-pointer"
            >
              RESET TO TODAY →
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
