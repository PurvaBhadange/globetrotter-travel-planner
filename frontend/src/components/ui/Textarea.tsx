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
      <div className="w-full flex flex-col gap-1">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[10px] font-black text-black tracking-widest uppercase mb-1"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={`w-full bg-white border-2 text-black placeholder-gray-400 text-sm font-medium rounded-none transition-colors duration-150 focus:outline-none focus:border-swiss-accent p-3.5 ${
            error
              ? "border-swiss-accent bg-red-50/20"
              : "border-black hover:border-black/80"
          } ${className}`}
          {...props}
        />
        {error ? (
          <p className="text-[11px] text-swiss-accent font-bold uppercase tracking-wide mt-1">
            ■ {error}
          </p>
        ) : helperText ? (
          <p className="text-xs text-gray-600 mt-1">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
