"use client";

import React from "react";
import { X, CheckCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "./AlertDialog";
import { Button } from "../Button/Button";

interface SuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  message?: string;
  buttonText?: string;
  onDone?: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  open,
  onOpenChange,
  title = "Success",
  message = "Operation completed successfully.",
  buttonText = "Done",
  onDone,
}) => {
  const handleDone = () => {
    if (onDone) {
      onDone();
    } else {
      onOpenChange(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-md">
        {/* Close button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <AlertDialogHeader className="text-center">
          {/* Success icon */}
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>

          <AlertDialogTitle className="text-lg font-semibold text-gray-900">
            {title}
          </AlertDialogTitle>

          <AlertDialogDescription className="text-sm text-gray-600">
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex justify-center mt-6">
          <Button
            onClick={handleDone}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
          >
            {buttonText}
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
