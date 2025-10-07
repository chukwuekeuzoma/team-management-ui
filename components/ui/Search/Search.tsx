"use client";

import * as React from "react";
import { Search as SearchIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type SearchProps = React.ComponentProps<"input"> & {
  containerClassName?: string;
};

const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  ({ className, containerClassName, ...props }, ref) => {
    return (
      <div className={cn("relative", containerClassName)}>
        <SearchIcon
          className={cn(
            "pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-input"
          )}
        />
        <input
          type="search"
          ref={ref}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent pl-8 pr-3 py-1 text-base transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
Search.displayName = "Search";

export { Search };
