"use client";

import * as React from "react";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu/DropdownMenu";
import { Button } from "@/components/ui/Button/Button";

interface ActionsMenuProps {
  onEdit: () => void;
  onDelete: () => void;
  editLabel?: string;
  deleteLabel?: string;
}

export const ActionsMenu: React.FC<ActionsMenuProps> = ({
  onEdit,
  onDelete,
  editLabel = "Edit",
  deleteLabel = "Delete",
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-8 w-8 p-0 hover:bg-gray-100 border-0"
          aria-label="Open menu"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem
          onClick={onEdit}
          className="cursor-pointer hover:bg-gray-100"
        >
          <Edit className="mr-2 h-4 w-4" />
          {editLabel}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onDelete}
          className="cursor-pointer hover:bg-gray-100 text-red-600 focus:text-red-600"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          {deleteLabel}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
