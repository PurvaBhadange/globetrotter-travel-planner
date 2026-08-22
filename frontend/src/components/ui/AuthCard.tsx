import React from "react";

export interface AuthCardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  showLogo?: boolean;
}

export const AuthCard: React.FC<AuthCardProps> = ({
  children,
  title,
  subtitle,
  className = "",
  showLogo = true,
}) => {
  return (
    <div className={`w-full max-w-md bg-surfaceDark/90 backdrop-blur-xl border border-white/10 rounded-card p-6 sm:p-8 shadow-2xl shadow-black/50 ${className}`}>
      {showLogo && (
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-accent p-0.5 shadow-lg shadow-accent/20 mb-3 flex items-center justify-center">
            <div className="w-full h-full bg-bgDark rounded-full flex items-center justify-center text-accent">
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
