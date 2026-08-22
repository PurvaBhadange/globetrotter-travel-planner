import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { useThemeStore } from "../../stores/useThemeStore";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "accent" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "accent",
      size = "md",
      isLoading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const { theme } = useThemeStore();

    let themeStyles = "";

    if (theme === "neo-brutalism") {
      const base =
        "font-black uppercase tracking-wider rounded-none border-4 border-black transition-all duration-100 cursor-pointer select-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none";
      const variants = {
        accent:
          "bg-[#FF6B6B] text-black shadow-[4px_4px_0px_0px_#000] hover:bg-[#FF8787] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#000]",
        primary:
          "bg-[#FFD93D] text-black shadow-[4px_4px_0px_0px_#000] hover:bg-[#FFE066] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#000]",
        outline:
          "bg-white text-black shadow-[4px_4px_0px_0px_#000] hover:bg-[#FFFDF5] hover:-translate-y-0.5",
        ghost: "bg-transparent text-black border-transparent hover:border-black",
      };
      const sizes = {
        sm: "text-xs px-3 py-2 gap-2 h-10",
        md: "text-sm px-5 py-3 gap-2.5 h-12",
        lg: "text-base px-8 py-4 gap-3 h-14 font-black",
      };
      themeStyles = `${base} ${variants[variant]} ${sizes[size]}`;
    } else if (theme === "swiss") {
      const base =
        "font-extrabold uppercase tracking-widest rounded-none border-2 border-black transition-all duration-150 cursor-pointer select-none active:translate-y-[1px]";
      const variants = {
        accent: "bg-[#FF3000] text-white border-black hover:bg-black hover:text-white",
        primary: "bg-black text-white border-black hover:bg-[#FF3000] hover:text-white",
        outline: "bg-white text-black border-black hover:bg-black hover:text-white",
        ghost: "bg-transparent text-black border-transparent hover:bg-black hover:text-white",
      };
      const sizes = {
        sm: "text-xs px-3 py-2 gap-2 h-9",
        md: "text-xs px-5 py-3 gap-2.5 h-11",
        lg: "text-sm px-8 py-4 gap-3 h-14 font-black",
      };
      themeStyles = `${base} ${variants[variant]} ${sizes[size]}`;
    } else {
      // travel-tech
      const base =
        "font-semibold rounded-[8px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF7A59]/50 select-none cursor-pointer active:scale-[0.99]";
      const variants = {
        accent: "bg-[#FF7A59] hover:bg-[#FF7A59]/90 text-white shadow-lg shadow-[#FF7A59]/20",
        primary: "bg-[#0F6E6E] hover:bg-[#0F6E6E]/90 text-white shadow-lg shadow-[#0F6E6E]/20",
        outline: "border border-white/15 bg-[#1B1E24]/50 hover:bg-white/10 text-gray-200",
        ghost: "bg-transparent hover:bg-white/10 text-gray-300",
      };
      const sizes = {
        sm: "text-xs px-3 py-1.5 gap-1.5 h-8",
        md: "text-sm px-4 py-2.5 gap-2 h-10",
        lg: "text-base px-6 py-3.5 gap-2.5 h-12 font-semibold",
      };
      themeStyles = `${base} ${variants[variant]} ${sizes[size]}`;
    }

    const widthClass = fullWidth ? "w-full" : "";

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`inline-flex items-center justify-center ${themeStyles} ${widthClass} ${className}`}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
