"use client";

import * as React from "react";
import { Search } from "@/components/ui/Search/Search";
import { Button } from "@/components/ui/Button/Button";
import { Bell, Grid3X3, User } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const Navigationbar = () => {
  const navItems = [
    { label: "Home", active: true },
    { label: "Workbench", active: false },
    { label: "Tickets", active: false },
    { label: "Service Catalogue", active: false },
    { label: "Knowledge Management", active: false },
    { label: "Admin Settings", active: false },
  ];

  return (
    <div className="w-full bg-white">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-bg rounded-full flex items-center justify-center">
            <Image
              src="/Bazara.svg"
              alt="Bazara Logo"
              width={20}
              height={20}
              className="text-brand-text"
            />
          </div>
          <span className="text-xl font-semibold text-brand-name">Bazara</span>
        </div>

        <div className="flex-1 max-w-md mx-8">
          <Search placeholder="Search for anything" className="w-full" />
        </div>

        <div className="flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={cn(
                "px-3 py-2 text-sm text-text font-medium transition-colors rounded-md cursor-pointer",
                item.active
                  ? "text-nav-active bg-nav-active-bg"
                  : "text-nav-text hover:bg-nav-bg-hover hover:text-nav-text-hover"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 ml-6">
          <div className="w-px h-6 bg-separator"></div>
          <Button
            variant="outline"
            size="icon"
            className="w-9 h-9 rounded-full border-button-border hover:bg-button-hover"
          >
            <Bell className="w-4 h-4 text-icon-gray" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="w-9 h-9 rounded-full border-button-border hover:bg-button-hover"
          >
            <Grid3X3 className="w-4 h-4 text-icon-blue" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="w-9 h-9 rounded-full border-button-border hover:bg-button-hover"
          >
            <User className="w-4 h-4 text-icon-blue" />
          </Button>
        </div>
      </div>
    </div>
  );
};
