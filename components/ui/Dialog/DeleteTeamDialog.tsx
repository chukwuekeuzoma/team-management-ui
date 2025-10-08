"use client";

import React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./AlertDialog";
import { Button } from "../Button/Button";

interface DeleteTeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  teamName?: string;
}

export const DeleteTeamDialog: React.FC<DeleteTeamDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  teamName,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        className="sm:max-w-md"
        aria-describedby="delete-team-description"
      >
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          aria-label="Close dialog"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <AlertDialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <Image src="/error.svg" alt="Error" width={24} height={24} />
            </div>
          </div>

          <AlertDialogTitle className="text-lg font-semibold text-gray-900 text-center">
            Delete Team
          </AlertDialogTitle>

          <AlertDialogDescription
            className="text-sm text-gray-600 text-center"
            id="delete-team-description"
          >
            Are you sure you want to deactivate this team?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex-row justify-center gap-3 sm:justify-center">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Close
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
