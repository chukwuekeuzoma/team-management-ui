import { Team } from "@/types/teams";

export interface TeamHandlers {
  deleteTeam: (id: string) => Promise<void>;
  createTeam: (data: any) => Promise<any>;
  updateTeam: (id: string, data: any) => Promise<any>;
}

export const createTeamHandlers = (
  teams: Team[],
  handlers: TeamHandlers
) => {
  const handleEdit = (teamId: string) => {
    const team = teams.find((t) => t.id === teamId);
    return team;
  };

  const confirmDelete = async (
    teamToDelete: string | null,
    setDeleteDialogOpen: (open: boolean) => void,
    setDeletedTeamName: (name: string) => void,
    setSuccessModalType: (type: "delete" | "create" | "update") => void,
    setSuccessModalOpen: (open: boolean) => void,
    setTeamToDelete: (id: string | null) => void
  ) => {
    if (teamToDelete) {
      try {
        const team = teams.find((t) => t.id === teamToDelete);
        await handlers.deleteTeam(teamToDelete);
        setDeleteDialogOpen(false);
        setDeletedTeamName(team?.name || "team");
        setSuccessModalType("delete");
        setSuccessModalOpen(true);
        setTeamToDelete(null);
      } catch (error) {
        console.error("Failed to delete team:", error);
      }
    }
  };

  const handleCreateTeam = async (
    data: any,
    setNewTeamModalOpen: (open: boolean) => void,
    setDeletedTeamName: (name: string) => void,
    setSuccessModalType: (type: "delete" | "create" | "update") => void,
    setSuccessModalOpen: (open: boolean) => void
  ) => {
    try {
      const newTeamData = {
        name: data.name,
        code: data.code,
        description: data.description,
        email: `${data.name.toLowerCase().replace(/\s+/g, ".")}@example.com`,
        teamEmail: data.teamEmail,
        entity: data.entity,
        manager: data.manager,
        status: "Active" as const,
      };

      await handlers.createTeam(newTeamData);
      setNewTeamModalOpen(false);
      setDeletedTeamName(data.name);
      setSuccessModalType("create");
      setSuccessModalOpen(true);
    } catch (error) {
      console.error("Failed to create team:", error);
    }
  };

  const handleUpdateTeam = async (
    data: any,
    teamToEdit: Team | null,
    setEditTeamModalOpen: (open: boolean) => void,
    setDeletedTeamName: (name: string) => void,
    setSuccessModalType: (type: "delete" | "create" | "update") => void,
    setSuccessModalOpen: (open: boolean) => void,
    setTeamToEdit: (team: Team | null) => void
  ) => {
    if (!teamToEdit) return;

    try {
      const updatedTeamData = {
        name: data.name,
        code: data.code,
        description: data.description,
        teamEmail: data.teamEmail,
        entity: data.entity,
        manager: data.manager,
        status: teamToEdit.status, // Keep existing status
      };

      await handlers.updateTeam(teamToEdit.id, updatedTeamData);
      setEditTeamModalOpen(false);
      setDeletedTeamName(data.name);
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
