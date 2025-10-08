export const createModalHandlers = (
  setDeleteDialogOpen: (open: boolean) => void,
  setTeamToDelete: (id: string | null) => void,
  setNewTeamModalOpen: (open: boolean) => void,
  setEditTeamModalOpen: (open: boolean) => void,
  setTeamToEdit: (team: any) => void,
  setSuccessModalOpen: (open: boolean) => void,
  setDeletedTeamName: (name: string) => void,
  setSuccessModalType: (type: "delete" | "create" | "update") => void
) => {
  const handleEditClick = (team: any) => {
    setTeamToEdit(team);
    setEditTeamModalOpen(true);
  };

  const handleDeleteClick = (teamId: string) => {
    setTeamToDelete(teamId);
    setDeleteDialogOpen(true);
  };

  const handleCreateTeamClick = () => {
    setNewTeamModalOpen(true);
  };

  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false);
  };

  const getSuccessModalProps = (
    successModalType: "delete" | "create" | "update"
  ) => {
    const titleMap = {
      create: "Team Created",
      update: "Team Updated",
      delete: "Team Deleted",
    };

    const messageMap = {
      create: "You have created this team successfully.",
      update: "You have updated this team successfully.",
      delete: "You have deleted this team successfully.",
    };

    return {
      title: titleMap[successModalType],
      message: messageMap[successModalType],
    };
  };

  return {
    handleEditClick,
    handleDeleteClick,
    handleCreateTeamClick,
    handleSuccessModalClose,
    getSuccessModalProps,
  };
};
