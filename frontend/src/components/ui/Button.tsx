import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";

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
    const baseStyles =
      "inline-flex items-center justify-center font-extrabold uppercase tracking-widest rounded-none border-2 border-black transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#FF3000] disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer active:translate-y-[1px]";

    const variants = {
      accent:
        "bg-[#FF3000] text-white border-black hover:bg-black hover:text-white shadow-none",
      primary:
        "bg-black text-white border-black hover:bg-[#FF3000] hover:border-black hover:text-white shadow-none",
      outline:
        "bg-white text-black border-black hover:bg-black hover:text-white shadow-none",
      ghost:
        "bg-transparent text-black border-transparent hover:bg-black hover:text-white shadow-none",
    };

    const sizes = {
      sm: "text-xs px-3 py-2 gap-2 h-9",
      md: "text-xs px-5 py-3 gap-2.5 h-11",
      lg: "text-sm px-8 py-4 gap-3 h-14 font-black",
    };

    const widthClass = fullWidth ? "w-full" : "";

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
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
