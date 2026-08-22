import React from "react";
import { useThemeStore } from "../../stores/useThemeStore";
import { Sparkles } from "lucide-react";

export interface AuthCardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  showLogo?: boolean;
  systemTag?: string;
}

export const AuthCard: React.FC<AuthCardProps> = ({
  children,
  title,
  subtitle,
  className = "",
  showLogo = true,
  systemTag,
}) => {
  const { theme } = useThemeStore();

  if (theme === "neo-brutalism") {
    return (
      <div className={`w-full max-w-md bg-white border-4 border-black rounded-none p-6 sm:p-8 shadow-[12px_12px_0px_0px_#000] relative rotate-[-0.5deg] hover:rotate-0 transition-transform duration-200 neo-grid-pattern ${className}`}>
        {/* Neo Sticker Header */}
        <div className="flex items-center justify-between border-b-4 border-black pb-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="px-2 py-0.5 bg-[#FF6B6B] text-black font-black text-xs border-2 border-black rotate-[-2deg] flex items-center gap-1 shadow-[2px_2px_0px_0px_#000]">
              <Sparkles className="w-3 h-3" />
              <span>{systemTag || "NEO // AUTH"}</span>
            </div>
          </div>
          <span className="text-[11px] font-black uppercase tracking-widest text-black bg-[#FFD93D] px-2 py-0.5 border-2 border-black rotate-[1deg]">
            STATION 01
          </span>
        </div>

        {showLogo && (
          <div className="flex flex-col items-start mb-6">
            <div className="w-14 h-14 bg-[#FF6B6B] text-black border-4 border-black flex items-center justify-center font-black text-2xl mb-3 shadow-[4px_4px_0px_0px_#000] rotate-[-3deg] hover:rotate-6 transition-transform">
              GT
            </div>
            {title && (
              <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-black leading-none mb-1">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-sm font-bold text-black/80">{subtitle}</p>
            )}
          </div>
        )}

        {children}
      </div>
    );
  }

  if (theme === "swiss") {
    return (
      <div className={`w-full max-w-md bg-white border-4 border-black rounded-none p-6 sm:p-10 swiss-grid-pattern relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${className}`}>
        <div className="flex items-center justify-between border-b-2 border-black pb-4 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#FF3000]"></div>
            <span className="text-[10px] font-black tracking-widest uppercase text-black">
              {systemTag || "SWISS // AUTH.01"}
            </span>
          </div>
          <span className="text-[10px] font-mono font-bold tracking-widest text-black/60">
            GT-1950.SWISS
          </span>
        </div>

        {showLogo && (
          <div className="flex flex-col items-start mb-8">
            <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-black font-heading text-lg mb-4 rounded-none border border-black hover:bg-[#FF3000] transition-colors">
              GT
            </div>
            {title && (
              <h1 className="text-3xl font-black uppercase tracking-tighter text-black leading-none mb-2">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-xs text-black/70 font-medium tracking-wide">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {children}
      </div>
    );
  }

  // travel-tech
  return (
    <div className={`w-full max-w-md bg-[#1B1E24]/90 backdrop-blur-xl border border-white/10 rounded-[12px] p-6 sm:p-8 shadow-2xl shadow-black/50 ${className}`}>
      {showLogo && (
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#0F6E6E] to-[#FF7A59] p-0.5 shadow-lg shadow-[#FF7A59]/20 mb-3 flex items-center justify-center">
            <div className="w-full h-full bg-[#111318] rounded-full flex items-center justify-center text-[#FF7A59]">
              <span className="text-2xl font-bold font-heading">GT</span>
            </div>
          </div>
          {title && (
            <h1 className="text-2xl font-bold font-heading text-white tracking-tight">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-sm text-gray-400 mt-1 font-body">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
};
