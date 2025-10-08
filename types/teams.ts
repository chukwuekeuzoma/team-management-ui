export type TeamStatus = "Active" | "Inactive";

export interface Team {
  id: string;
  name: string;
  description: string;
  code: string;
  email: string;
  teamEmail: string;
  entity: string;
  manager: string;
  status: TeamStatus;
  createdAt: string;
  updatedAt?: string;
}
