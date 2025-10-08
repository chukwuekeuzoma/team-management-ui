import { Team } from "@/types/teams";

export interface CreateTeamData {
  name: string;
  code: string;
  description: string;
  email: string;
  teamEmail: string;
  entity: string;
  manager: string;
  status: Team["status"];
}

export interface UpdateTeamData {
  name: string;
  code: string;
  description: string;
  teamEmail: string;
  entity: string;
  manager: string;
  status: Team["status"];
}

export interface TeamHandlers {
  deleteTeam: (id: string) => Promise<void>;
  createTeam: (data: CreateTeamData) => Promise<Team>;
  updateTeam: (id: string, data: UpdateTeamData) => Promise<Team>;
}

export const createTeamHandlers = (teams: Team[], handlers: TeamHandlers) => {
  const handleEdit = (teamId: string) => {
    const team = teams.find((t) => t.id === teamId);
    return team;
  };

  const confirmDelete = async (
    teamToDelete: string | null,
    setDeleteDialogOpen: (open: boolean) => void,
    setSuccessModalType: (type: "delete" | "create" | "update") => void,
    setSuccessModalOpen: (open: boolean) => void,
    setTeamToDelete: (id: string | null) => void,
  ) => {
    if (teamToDelete) {
      try {
        const team = teams.find((t) => t.id === teamToDelete);
        await handlers.deleteTeam(teamToDelete);
        setDeleteDialogOpen(false);
        setSuccessModalType("delete");
        setSuccessModalOpen(true);
        setTeamToDelete(null);
      } catch (error) {
        console.error("Failed to delete team:", error);
      }
    }
  };

  const handleCreateTeam = async (
    data: CreateTeamData,
    setNewTeamModalOpen: (open: boolean) => void,
    setSuccessModalType: (type: "delete" | "create" | "update") => void,
    setSuccessModalOpen: (open: boolean) => void,
  ) => {
    try {
      await handlers.createTeam(data);
      setNewTeamModalOpen(false);
      setSuccessModalType("create");
      setSuccessModalOpen(true);
    } catch (error) {
      console.error("Failed to create team:", error);
    }
  };

  const handleUpdateTeam = async (
    data: CreateTeamData,
    teamToEdit: Team | null,
    setEditTeamModalOpen: (open: boolean) => void,
    setSuccessModalType: (type: "delete" | "create" | "update") => void,
    setSuccessModalOpen: (open: boolean) => void,
    setTeamToEdit: (team: Team | null) => void,
  ) => {
    if (!teamToEdit) return;

    try {
      const updatedTeamData = {
        name: data.name,
        code: data.code,
        description: data.description,
        email: data.email,
        teamEmail: data.teamEmail,
        entity: data.entity,
        manager: data.manager,
        status: data.status,
      };

      await handlers.updateTeam(teamToEdit.id, updatedTeamData);
      setEditTeamModalOpen(false);
      setSuccessModalType("update");
      setSuccessModalOpen(true);
      setTeamToEdit(null);
    } catch (error) {
      console.error("Failed to update team:", error);
    }
  };

  return {
    handleEdit,
    confirmDelete,
    handleCreateTeam,
    handleUpdateTeam,
  };
};
