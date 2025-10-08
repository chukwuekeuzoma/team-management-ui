"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./AlertDialog";
import { ConfirmTeamModal } from "./ConfirmTeamModal";
import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/input";
import { Textarea } from "@/components/ui/TextArea/TextArea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select/Select";
import { cn } from "@/lib/utils";
import {
  teamSchema,
  TeamFormData,
} from "@/components/validations/teamValidation";

interface NewTeamModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: TeamFormData) => void;
}

// Mock data for dropdowns
const ENTITIES = [
  "Access Bank Nigeria",
  "Access Bank Ghana",
  "Access Bank Angola",
  "Access Bank Zambia",
  "Access Bank Gambia",
  "Access Bank Sierra Leone",
];

const MANAGERS = [
  "Joshua Gladness",
  "Ada Okoro",
  "Emeka John",
  "Zara Ibrahim",
  "Liam O'Neil",
  "Aisha Bello",
  "Chen Li",
  "Diego Alvarez",
  "Maya Patel",
  "Noah Smith",
  "Fatima Yusuf",
];

export const NewTeamModal: React.FC<NewTeamModalProps> = ({
  open,
  onOpenChange,
  onSubmit,
}) => {
  const [confirmModalOpen, setConfirmModalOpen] = React.useState(false);
  const [pendingTeamData, setPendingTeamData] =
    React.useState<TeamFormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
    setValue,
  } = useForm<TeamFormData>({
    resolver: yupResolver(teamSchema),
    mode: "onChange",
    defaultValues: {
      entity: "Access Bank Nigeria",
      teamEmail: "ngit@accessbankplc.com",
    },
  });

  const watchedValues = watch();

  const handleFormSubmit = (data: TeamFormData) => {
    setPendingTeamData(data);
    setConfirmModalOpen(true);
  };

  const handleConfirmCreate = () => {
    if (pendingTeamData) {
      onSubmit(pendingTeamData);
      reset();
      setPendingTeamData(null);
      onOpenChange(false);
    }
  };

  const handleClose = () => {
    reset();
    setPendingTeamData(null);
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        className="max-w-2xl"
        aria-describedby="new-team-description"
      >
        <AlertDialogHeader>
          <div className="flex items-center justify-between">
            <AlertDialogTitle className="text-xl font-semibold text-gray-900">
              New Team
            </AlertDialogTitle>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </AlertDialogHeader>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-6"
          role="form"
          aria-label="New team form"
        >
          <div className="space-y-2">
            <label
              htmlFor="entity-select"
              className="text-sm font-medium text-gray-900"
            >
              Entity <span className="text-red-500">*</span>
            </label>
            <Select
              value={watchedValues.entity || ""}
              onValueChange={(value) =>
                setValue("entity", value, { shouldValidate: true })
              }
            >
              <SelectTrigger
                className="w-full"
                id="entity-select"
                aria-describedby={errors.entity ? "entity-error" : undefined}
              >
                <SelectValue placeholder="Select entity" />
              </SelectTrigger>
              <SelectContent>
                {ENTITIES.map((entity) => (
                  <SelectItem key={entity} value={entity}>
                    {entity}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.entity && (
              <p
                id="entity-error"
                className="text-sm text-red-500"
                role="alert"
                aria-live="polite"
              >
                {errors.entity.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="team-name"
              className="text-sm font-medium text-gray-900"
            >
              Team Name <span className="text-red-500">*</span>
            </label>
            <Input
              {...register("name")}
              id="team-name"
              placeholder="Enter team name"
              aria-describedby={errors.name ? "team-name-error" : undefined}
              className={cn(
                "w-full",
                errors.name && "border-red-500 focus-visible:ring-red-500",
              )}
            />
            {errors.name && (
              <p
                id="team-name-error"
                className="text-sm text-red-500"
                role="alert"
                aria-live="polite"
              >
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="team-code"
              className="text-sm font-medium text-gray-900"
            >
              Code <span className="text-red-500">*</span>
            </label>
            <Input
              {...register("code")}
              id="team-code"
              placeholder="Enter team code here"
              aria-describedby={
                errors.code ? "team-code-error" : "team-code-help"
              }
              className={cn(
                "w-full uppercase",
                errors.code && "border-red-500 focus-visible:ring-red-500",
              )}
              onChange={(e) => {
                e.target.value = e.target.value.toUpperCase();
                register("code").onChange(e);
              }}
            />
            <p id="team-code-help" className="text-xs text-gray-500">
              Min.: 3 and Max.: 10 characters
            </p>
            {errors.code && (
              <p
                id="team-code-error"
                className="text-sm text-red-500"
                role="alert"
                aria-live="polite"
              >
                {errors.code.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="team-description"
              className="text-sm font-medium text-gray-900"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <Textarea
              {...register("description")}
              id="team-description"
              placeholder="Enter the description of this Team"
              aria-describedby={
                errors.description ? "team-description-error" : undefined
              }
              className={cn(
                "w-full min-h-[80px]",
                errors.description &&
                  "border-red-500 focus-visible:ring-red-500",
              )}
            />
            {errors.description && (
              <p
                id="team-description-error"
                className="text-sm text-red-500"
                role="alert"
                aria-live="polite"
              >
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="team-email"
              className="text-sm font-medium text-gray-900"
            >
              Team Email Address
            </label>
            <Input
              {...register("teamEmail")}
              id="team-email"
              type="email"
              placeholder="Enter team email address"
              aria-describedby={
                errors.teamEmail ? "team-email-error" : "team-email-help"
              }
              className={cn(
                "w-full",
                errors.teamEmail && "border-red-500 focus-visible:ring-red-500",
              )}
            />
            <p id="team-email-help" className="text-xs text-gray-500">
              Everyone in this Team receives an email whenever a message is sent
              to this email address.
            </p>
            {errors.teamEmail && (
              <p
                id="team-email-error"
                className="text-sm text-red-500"
                role="alert"
                aria-live="polite"
              >
                {errors.teamEmail.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="team-manager"
              className="text-sm font-medium text-gray-900"
            >
              Team Manager <span className="text-red-500">*</span>
            </label>
            <Select
              value={watchedValues.manager || ""}
              onValueChange={(value) =>
                setValue("manager", value, { shouldValidate: true })
              }
            >
              <SelectTrigger
                className="w-full"
                id="team-manager"
                aria-describedby={
                  errors.manager ? "team-manager-error" : undefined
                }
              >
                <SelectValue placeholder="Select team manager" />
              </SelectTrigger>
              <SelectContent>
                {MANAGERS.map((manager) => (
                  <SelectItem key={manager} value={manager}>
                    {manager}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.manager && (
              <p
                id="team-manager-error"
                className="text-sm text-red-500"
                role="alert"
                aria-live="polite"
              >
                {errors.manager.message}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="px-6 w-full"
            >
              Close
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-6 w-full"
              disabled={!isValid}
            >
              Create
            </Button>
          </div>
        </form>
      </AlertDialogContent>

      <ConfirmTeamModal
        open={confirmModalOpen}
        onOpenChange={setConfirmModalOpen}
        onConfirm={handleConfirmCreate}
        teamData={
          pendingTeamData
            ? {
                name: pendingTeamData.name,
                code: pendingTeamData.code,
                entity: pendingTeamData.entity,
                manager: pendingTeamData.manager,
              }
            : undefined
        }
      />
    </AlertDialog>
  );
};
