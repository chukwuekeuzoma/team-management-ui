"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { Home, X } from "lucide-react";

type Step = {
  label: string;
  icon?: LucideIcon;
};

type StepsNavigationBarProps = {
  className?: string;
  onStepClick?: (index: number) => void; // backward compatibility (unused)
  title?: string;
  onClose?: () => void;
};

export const StepsNavigationBar: React.FC<StepsNavigationBarProps> = ({
  className,
  onStepClick,
  title = "Admin Settings",
  onClose,
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
    </nav>
  );
};

export default StepsNavigationBar;
