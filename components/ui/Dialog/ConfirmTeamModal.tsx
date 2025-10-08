"use client";

import React from "react";
import { Settings } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "./AlertDialog";
import { Button } from "../Button/Button";

interface ConfirmTeamModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  teamData?: {
    name: string;
    code: string;
    entity: string;
    manager: string;
  };
}

export const ConfirmTeamModal: React.FC<ConfirmTeamModalProps> = ({
  open,
  onOpenChange,
  onConfirm,
  teamData,
}) => {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader className="text-center">
          {/* Icon with blue background and gear symbol */}
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Settings className="w-6 h-6 text-blue-600" />
            </div>
          </div>

          <AlertDialogTitle className="text-center text-lg font-semibold text-gray-900">
            Create Team
          </AlertDialogTitle>

          <AlertDialogDescription className="text-center text-sm text-gray-600">
            Are you sure you want to create this team?
          </AlertDialogDescription>

          {/* Team details preview */}
          {teamData && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg text-left">
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Name:</span>{" "}
                  <span className="text-gray-600">{teamData.name}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Code:</span>{" "}
                  <span className="text-gray-600">{teamData.code}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Entity:</span>{" "}
                  <span className="text-gray-600">{teamData.entity}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Manager:</span>{" "}
                  <span className="text-gray-600">{teamData.manager}</span>
                </div>
              </div>
            </div>
          )}
        </AlertDialogHeader>

        {/* Action buttons */}
        <div className="flex items-center gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            className="px-6 w-full border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Close
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            className="bg-blue-600 hover:bg-blue-700 px-6 w-full"
          >
            Yes, Create
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
