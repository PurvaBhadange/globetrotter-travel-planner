import { TextareaHTMLAttributes, forwardRef } from "react";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = "", id, ...props }, ref) => {
    const inputId =
      id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-medium text-gray-300 tracking-wide uppercase"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={`w-full bg-surfaceDark/80 border text-gray-100 placeholder-gray-500 text-sm rounded-control transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/60 focus:border-accent p-3.5 ${
            error
              ? "border-red-500/80 focus:ring-red-500/50"
              : "border-white/10 hover:border-white/20"
          } ${className}`}
          {...props}
        />
        {error ? (
          <p className="text-xs text-red-400 font-medium animate-fadeIn">
            {error}
          </p>
        ) : helperText ? (
          <p className="text-xs text-gray-400">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
