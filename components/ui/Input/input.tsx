"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, onChange, value, defaultValue, ...props }, ref) => {
    const isControlled = value !== undefined;
    const initialHasText = () => {
      if (isControlled) return String(value ?? "").length > 0;
      if (defaultValue !== undefined)
        return String(defaultValue ?? "").length > 0;
      return false;
    };
    const [hasText, setHasText] = React.useState<boolean>(initialHasText);

    React.useEffect(() => {
      if (isControlled) {
        setHasText(String(value ?? "").length > 0);
      }
    }, [isControlled, value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setHasText(e.target.value.length > 0);
      }
      onChange?.(e);
    };

    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 pr-10 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          ref={ref}
          onChange={handleChange}
          value={value as any}
          defaultValue={defaultValue as any}
          role="textbox"
          {...props}
        />
        {hasText && (
          <svg
            className={cn(
              "pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-input-icon"
            )}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.172 7.707 8.879a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
