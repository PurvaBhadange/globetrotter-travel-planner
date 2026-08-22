import React from "react";

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
  systemTag = "SYS // AUTH.01",
}) => {
  return (
    <div className={`w-full max-w-md bg-white border-4 border-black rounded-none p-6 sm:p-10 swiss-grid-pattern relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${className}`}>
      {/* Top Bar System Indicator */}
      <div className="flex items-center justify-between border-b-2 border-black pb-4 mb-8">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#FF3000]"></div>
          <span className="text-[10px] font-black tracking-widest uppercase text-black">
            {systemTag}
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
};
