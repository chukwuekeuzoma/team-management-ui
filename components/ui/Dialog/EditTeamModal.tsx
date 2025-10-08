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
import { Team } from "@/types/teams";

interface EditTeamModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: TeamFormData) => void;
  team: Team | null;
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

export const EditTeamModal: React.FC<EditTeamModalProps> = ({
  open,
  onOpenChange,
  onSubmit,
  team,
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
      entity: team?.entity || "Access Bank Nigeria",
      teamEmail: team?.teamEmail || "ngit@accessbankplc.com",
      name: team?.name || "",
      code: team?.code || "",
      description: team?.description || "",
      manager: team?.manager || "",
    },
  });

  // Reset form when team changes
  React.useEffect(() => {
    if (team) {
      reset({
        entity: team.entity,
        teamEmail: team.teamEmail,
        name: team.name,
        code: team.code,
        description: team.description,
        manager: team.manager,
      });
    }
  }, [team, reset]);

  const watchedValues = watch();

  const handleFormSubmit = (data: TeamFormData) => {
    setPendingTeamData(data);
    setConfirmModalOpen(true);
  };

  const handleConfirmUpdate = () => {
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
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <div className="flex items-center justify-between">
            <AlertDialogTitle className="text-xl font-semibold text-gray-900">
              Edit Team
            </AlertDialogTitle>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              Entity <span className="text-red-500">*</span>
            </label>
            <Select
              value={watchedValues.entity || ""}
              onValueChange={(value) =>
                setValue("entity", value, { shouldValidate: true })
              }
            >
              <SelectTrigger className="w-full">
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
              <p className="text-sm text-red-500">{errors.entity.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              Team Name <span className="text-red-500">*</span>
            </label>
            <Input
              {...register("name")}
              placeholder="Enter team name"
              className={cn(
                "w-full",
                errors.name && "border-red-500 focus-visible:ring-red-500"
              )}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              Code <span className="text-red-500">*</span>
            </label>
            <Input
              {...register("code")}
              placeholder="Enter team code here"
              className={cn(
                "w-full uppercase",
                errors.code && "border-red-500 focus-visible:ring-red-500"
              )}
              onChange={(e) => {
                e.target.value = e.target.value.toUpperCase();
                register("code").onChange(e);
              }}
            />
            <p className="text-xs text-gray-500">
              Min.: 3 and Max.: 10 characters
            </p>
            {errors.code && (
              <p className="text-sm text-red-500">{errors.code.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              Description <span className="text-red-500">*</span>
            </label>
            <Textarea
              {...register("description")}
              placeholder="Enter the description of this Team"
              className={cn(
                "w-full min-h-[80px]",
                errors.description &&
                  "border-red-500 focus-visible:ring-red-500"
              )}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              Team Email Address
            </label>
            <Input
              {...register("teamEmail")}
              type="email"
              placeholder="Enter team email address"
              className={cn(
                "w-full",
                errors.teamEmail && "border-red-500 focus-visible:ring-red-500"
              )}
            />
            <p className="text-xs text-gray-500">
              Everyone in this Team receives an email whenever a message is sent
              to this email address.
            </p>
            {errors.teamEmail && (
              <p className="text-sm text-red-500">{errors.teamEmail.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              Team Manager <span className="text-red-500">*</span>
            </label>
            <Select
              value={watchedValues.manager || ""}
              onValueChange={(value) =>
                setValue("manager", value, { shouldValidate: true })
              }
            >
              <SelectTrigger className="w-full">
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
              <p className="text-sm text-red-500">{errors.manager.message}</p>
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
              Update
            </Button>
          </div>
        </form>
      </AlertDialogContent>

      <ConfirmTeamModal
        open={confirmModalOpen}
        onOpenChange={setConfirmModalOpen}
        onConfirm={handleConfirmUpdate}
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
        mode="update"
      />
    </AlertDialog>
  );
};
