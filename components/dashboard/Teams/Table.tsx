"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useTeamsStore } from "@/stores/useTeamsStore";
import { Team } from "@/types/teams";
import {
  Table as TableComponent,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table/Table";
import { Checkbox } from "@/components/ui/Checkbox/Checkbox";
import { Spinner } from "@/components/ui/Spinner/Spinner";
import {
  DeleteTeamDialog,
  SuccessModal,
  NewTeamModal,
  EditTeamModal,
} from "@/components/ui/Dialog";

// Import extracted utilities
import {
  useClientPagination,
  filterAndSortTeams,
  getUniqueEntities,
  getNextSortDirection,
  createTeamHandlers,
  toggleSelectAll,
  createModalHandlers,
  CustomTableBody,
  PaginationControls,
  SearchAndFilters,
  type SortKey,
  type SortDir,
} from "./Funtions";

const Table = () => {
  const { teams, fetchTeams, loading, deleteTeam, updateTeam, createTeam } =
    useTeamsStore();
  const [query, setQuery] = useState("");
  const [entityFilter, setEntityFilter] = useState("Access Bank Nigeria");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState<string | null>(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [deletedTeamName, setDeletedTeamName] = useState<string>("");
  const [newTeamModalOpen, setNewTeamModalOpen] = useState(false);
  const [editTeamModalOpen, setEditTeamModalOpen] = useState(false);
  const [teamToEdit, setTeamToEdit] = useState<Team | null>(null);
  const [successModalType, setSuccessModalType] = useState<
    "delete" | "create" | "update"
  >("delete");

  useEffect(() => {
    fetchTeams().catch(() => {});
  }, [fetchTeams]);

  const entities = useMemo(() => getUniqueEntities(teams), [teams]);
  const filtered = useMemo(
    () => filterAndSortTeams(teams, query, entityFilter, sortKey, sortDir),
    [teams, query, entityFilter, sortKey, sortDir]
  );
  const { paged, total } = useClientPagination(filtered, page, pageSize);
  const totalPages = Math.ceil(total / pageSize);

  // Create team handlers
  const { handleEdit, confirmDelete, handleCreateTeam, handleUpdateTeam } =
    createTeamHandlers(teams, { deleteTeam, createTeam, updateTeam });

  // Create modal handlers
  const {
    handleEditClick: modalEditClick,
    handleDeleteClick: modalDeleteClick,
    handleCreateTeamClick,
    handleSuccessModalClose,
    getSuccessModalProps,
  } = createModalHandlers(
    setDeleteDialogOpen,
    setTeamToDelete,
    setNewTeamModalOpen,
    setEditTeamModalOpen,
    setTeamToEdit,
    setSuccessModalOpen,
    setDeletedTeamName,
    setSuccessModalType
  );

  const toggleSort = (key: SortKey) => {
    const { sortKey: newSortKey, sortDir: newSortDir } = getNextSortDirection(
      sortKey,
      sortDir,
      key
    );
    setSortKey(newSortKey);
    setSortDir(newSortDir);
  };

  const handleEditClick = (teamId: string) => {
    const team = handleEdit(teamId);
    if (team) {
      modalEditClick(team);
    }
  };

  const handleDeleteClick = (teamId: string) => {
    modalDeleteClick(teamId);
  };

  const handleConfirmDelete = () => {
    confirmDelete(
      teamToDelete,
      setDeleteDialogOpen,
      setDeletedTeamName,
      setSuccessModalType,
      setSuccessModalOpen,
      setTeamToDelete
    );
  };

  const handleCreateTeamSubmit = (data: any) => {
    handleCreateTeam(
      data,
      setNewTeamModalOpen,
      setDeletedTeamName,
      setSuccessModalType,
      setSuccessModalOpen
    );
  };

  const handleUpdateTeamSubmit = (data: any) => {
    handleUpdateTeam(
      data,
      teamToEdit,
      setEditTeamModalOpen,
      setDeletedTeamName,
      setSuccessModalType,
      setSuccessModalOpen,
      setTeamToEdit
    );
  };

  const successModalProps = getSuccessModalProps(successModalType);

  if (loading) {
    return (
      <div className="p-6 bg-white min-h-screen">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Teams</h1>
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3">
            <Spinner className="h-6 w-6" />
            <span className="text-gray-600">Loading teams...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Teams</h1>
      <SearchAndFilters
        query={query}
        setQuery={setQuery}
        setPage={setPage}
        entityFilter={entityFilter}
        setEntityFilter={setEntityFilter}
        entities={entities}
        onCreateTeam={handleCreateTeamClick}
      />

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <TableComponent role="table" aria-label="Teams table">
          <TableHeader className="bg-blue-600">
            <TableRow className="border-0 hover:bg-blue-600">
              <TableHead className="text-white font-medium">
                <Checkbox
                  checked={
                    selectedRows.size === paged.length && paged.length > 0
                  }
                  onCheckedChange={() =>
                    toggleSelectAll(selectedRows, paged, setSelectedRows)
                  }
                  aria-label="Select all teams"
                />
              </TableHead>
              <TableHead
                className="text-white font-medium cursor-pointer hover:bg-blue-700"
                onClick={() => toggleSort("name")}
              >
                Team Name
              </TableHead>
              <TableHead
                className="text-white font-medium cursor-pointer hover:bg-blue-700"
                onClick={() => toggleSort("code")}
              >
                Code
              </TableHead>
              <TableHead className="text-white font-medium">
                Description
              </TableHead>
              <TableHead className="text-white font-medium">
                Team Email
              </TableHead>
              <TableHead
                className="text-white font-medium cursor-pointer hover:bg-blue-700"
                onClick={() => toggleSort("entity")}
              >
                Entity
              </TableHead>
              <TableHead
                className="text-white font-medium cursor-pointer hover:bg-blue-700"
                onClick={() => toggleSort("manager")}
              >
                Manager
              </TableHead>
              <TableHead className="text-white font-medium w-12">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <CustomTableBody
            paged={paged}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        </TableComponent>
      </div>

      <PaginationControls
        page={page}
        totalPages={totalPages}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
      />

      <DeleteTeamDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        teamName={
          teamToDelete
            ? teams.find((t) => t.id === teamToDelete)?.name
            : undefined
        }
      />

      <SuccessModal
        open={successModalOpen}
        onOpenChange={setSuccessModalOpen}
        title={successModalProps.title}
        message={successModalProps.message}
        buttonText="Done"
        onDone={handleSuccessModalClose}
      />

      <NewTeamModal
        open={newTeamModalOpen}
        onOpenChange={setNewTeamModalOpen}
        onSubmit={handleCreateTeamSubmit}
      />

      <EditTeamModal
        open={editTeamModalOpen}
        onOpenChange={setEditTeamModalOpen}
        onSubmit={handleUpdateTeamSubmit}
        team={teamToEdit}
      />
    </div>
  );
};

export default Table;
