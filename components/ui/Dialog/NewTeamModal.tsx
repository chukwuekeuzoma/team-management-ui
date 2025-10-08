"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./AlertDialog";
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

// Validation schema
const teamSchema = yup.object({
  entity: yup.string().required("Entity is required"),
  name: yup
    .string()
    .required("Team name is required")
    .min(2, "Team name must be at least 2 characters")
    .max(100, "Team name must be less than 100 characters"),
  code: yup
    .string()
    .required("Team code is required")
    .min(3, "Code must be at least 3 characters")
    .max(5, "Code must be at most 5 characters")
    .matches(
      /^[A-Z0-9]+$/,
      "Code must contain only uppercase letters and numbers"
    ),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),
  teamEmail: yup
    .string()
    .email("Please enter a valid email address")
    .required("Team email is required"),
  manager: yup.string().required("Team manager is required"),
});

type TeamFormData = yup.InferType<typeof teamSchema>;

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
    onSubmit(data);
    reset();
    onOpenChange(false);
  };

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <div className="flex items-center justify-between">
            <AlertDialogTitle className="text-xl font-semibold text-gray-900">
              New Team
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
              Min.: 3 and Max.: 5 characters
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

          {/* Team Manager Field */}
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
              Create
            </Button>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
