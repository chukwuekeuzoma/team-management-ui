"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Home, X, ChevronLeft } from "lucide-react";

type StepsNavigationBarProps = {
  className?: string;
  onStepClick?: (index: number) => void;
  title?: string;
  onClose?: () => void;
  breadcrumbs?: string[];
  onBack?: () => void;
};

export const StepsNavigationBar: React.FC<StepsNavigationBarProps> = ({
  className,
  title = "Admin Settings",
  onClose,
  breadcrumbs = ["Admin Settings", "Teams"],
  onBack,
}) => {
  return (
    <nav className={cn("w-full", className)}>
      <div className="w-full bg-brand-bg h-9 relative">
        <div className="max-w-7xl h-full px-6 flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
            <Home className="w-4 h-4 text-white" />
          </span>

          <div className="bg-white rounded-t-md px-5 py-2 flex items-center gap-3  mt-2 h-7">
            <span className="text-sm font-medium text-text whitespace-nowrap">
              {title}
            </span>
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="w-4 h-4 rounded-full border border-button-border flex items-center justify-center text-nav-text hover:bg-button-hover cursor-pointer"
            >
              <X className="w-2 h-2" />
            </button>
          </div>
        </div>
      </div>
      {breadcrumbs?.length && (
        <div className="w-full bg-white">
          <div className="max-w-7xl px-6 py-3">
            {breadcrumbs?.length ? (
              <div className="flex items-center text-[12px] text-nav-text">
                <button
                  type="button"
                  aria-label="Back"
                  onClick={onBack}
                  className={cn(
                    "w-4 h-4 mr-3 rounded-full border border-button-border flex items-center justify-center hover:bg-button-hover",
                    onBack ? "cursor-pointer" : "cursor-default opacity-60"
                  )}
                >
                  <ChevronLeft className="w-2 h-2" />
                </button>
                {breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={`${crumb}-${index}`}>
                    {index > 0 && <span className="mx-2">/</span>}
                    <span
                      className={cn(
                        "whitespace-nowrap",
                        index === breadcrumbs.length - 1 &&
                          "font-semibold text-text"
                      )}
                    >
                      {crumb}
                    </span>
                  </React.Fragment>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </nav>
  );
};

export default StepsNavigationBar;
