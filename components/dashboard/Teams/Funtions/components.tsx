import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/Avatar/Avatar";

export const ManagerAvatar = ({ name }: { name: string }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-8 w-8">
        <AvatarFallback className="bg-blue-500 text-white text-xs">
          {initials}
        </AvatarFallback>
      </Avatar>
      <span className="text-sm">{name}</span>
    </div>
  );
};

export const toggleSelectAll = (
  selectedRows: Set<string>,
  paged: any[],
  setSelectedRows: (selected: Set<string>) => void
) => {
  if (selectedRows.size === paged.length) {
    setSelectedRows(new Set());
  } else {
    setSelectedRows(new Set(paged.map((t) => t.id)));
  }
};

export const toggleSelectRow = (
  id: string,
  selectedRows: Set<string>,
  setSelectedRows: (selected: Set<string>) => void
) => {
  const newSelected = new Set(selectedRows);
  if (newSelected.has(id)) {
    newSelected.delete(id);
  } else {
    newSelected.add(id);
  }
  setSelectedRows(newSelected);
};
