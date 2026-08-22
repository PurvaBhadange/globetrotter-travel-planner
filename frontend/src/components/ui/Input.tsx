import { InputHTMLAttributes, forwardRef, ReactNode } from "react";
import { useThemeStore } from "../../stores/useThemeStore";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      leftIcon,
      rightIcon,
      helperText,
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const { theme } = useThemeStore();
    const inputId =
      id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    let containerStyle = "";
    let labelStyle = "";
    let inputStyle = "";
    let errorStyle = "";

    if (theme === "neo-brutalism") {
      containerStyle = "flex flex-col gap-1.5";
      labelStyle = "text-xs font-black text-black tracking-wider uppercase";
      inputStyle = `w-full bg-white border-4 border-black text-black font-bold placeholder-black/40 rounded-none text-base transition-all duration-150 focus:outline-none focus:bg-[#FFD93D] focus:shadow-[4px_4px_0px_0px_#000] ${
        error ? "bg-red-100 border-[#FF6B6B]" : ""
      }`;
      errorStyle = "text-xs text-[#FF6B6B] font-black uppercase tracking-wider mt-1 bg-black text-white px-2 py-0.5 inline-block w-fit";
    } else if (theme === "swiss") {
      containerStyle = "flex flex-col gap-1";
      labelStyle = "text-[10px] font-black text-black tracking-widest uppercase mb-1";
      inputStyle = `w-full bg-white border-2 text-black placeholder-gray-400 text-sm font-medium rounded-none transition-colors duration-150 focus:outline-none focus:border-[#FF3000] ${
        error ? "border-[#FF3000] bg-red-50/20" : "border-black"
      }`;
      errorStyle = "text-[11px] text-[#FF3000] font-bold uppercase tracking-wide mt-1";
    } else {
      // travel-tech
      containerStyle = "flex flex-col gap-1.5";
      labelStyle = "text-xs font-medium text-gray-300 tracking-wide uppercase";
      inputStyle = `w-full bg-[#1B1E24]/80 border text-gray-100 placeholder-gray-500 text-sm rounded-[8px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF7A59]/60 focus:border-[#FF7A59] ${
        error ? "border-red-500/80 focus:ring-red-500/50" : "border-white/10 hover:border-white/20"
      }`;
      errorStyle = "text-xs text-red-400 font-medium mt-1";
    }

    return (
      <div className={`w-full ${containerStyle}`}>
        {label && (
          <label htmlFor={inputId} className={labelStyle}>
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className={`absolute left-3.5 pointer-events-none flex items-center justify-center ${
              theme === "travel-tech" ? "text-gray-400" : "text-black"
            }`}>
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`${inputStyle} ${leftIcon ? "pl-10" : "pl-3.5"} ${
              rightIcon ? "pr-10" : "pr-3.5"
            } py-3 ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 flex items-center justify-center">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className={errorStyle}>
            {theme === "neo-brutalism" ? `⚠ ${error}` : theme === "swiss" ? `■ ${error}` : error}
          </p>
        ) : helperText ? (
          <p className="text-xs text-gray-400">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
