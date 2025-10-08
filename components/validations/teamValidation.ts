import * as yup from "yup";

export const teamSchema = yup.object({
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

export type TeamFormData = yup.InferType<typeof teamSchema>;
