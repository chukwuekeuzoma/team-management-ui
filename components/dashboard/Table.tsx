"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useTeamsStore } from "@/stores/useTeamsStore";
import { Team } from "@/types/teams";
import { Search } from "@/components/ui/Search/Search";
import { Button } from "@/components/ui/Button/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select/Select";
import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table/Table";
import { Checkbox } from "@/components/ui/Checkbox/Checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/Avatar/Avatar";
import { Spinner } from "@/components/ui/Spinner/Spinner";
import { ActionsMenu } from "@/components/ui/ActionsMenu/ActionsMenu";
import {
  DeleteTeamDialog,
  SuccessModal,
  NewTeamModal,
  EditTeamModal,
} from "@/components/ui/Dialog";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

type SortKey = keyof Pick<
  Team,
  "name" | "code" | "manager" | "status" | "entity"
>;
type SortDir = "asc" | "desc" | null;

const useClientPagination = <T,>(
  items: T[],
  page: number,
  pageSize: number
) => {
  const total = items.length;
  const start = (page - 1) * pageSize;
  const paged = items.slice(start, start + pageSize);
  return { paged, total, start, pageSize };
};

const ManagerAvatar = ({ name }: { name: string }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-8 w-8">
        <AvatarFallback className="bg-blue-500 text-white text-xs">
          {initials}
        </AvatarFallback>
      </Avatar>
      <span className="text-sm">{name}</span>
    </div>
  );
};

const Table = () => {
  const { teams, fetchTeams, loading, deleteTeam, updateTeam, createTeam } =
    useTeamsStore();
  const [query, setQuery] = useState("");
  const [entityFilter, setEntityFilter] = useState("All");
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

  const entities = useMemo(() => {
    const uniqueEntities = Array.from(new Set(teams.map((t) => t.entity)));
    return ["All", ...uniqueEntities];
  }, [teams]);

  const filtered = useMemo(() => {
    let out = teams;
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      out = out.filter(
        (t) =>
          t.name.toLowerCase().includes(q) || t.code.toLowerCase().includes(q)
      );
    }
    if (entityFilter !== "All") {
      out = out.filter((t) => t.entity === entityFilter);
    }

    if (sortDir) {
      out = [...out].sort((a: any, b: any) => {
        const av = String(a[sortKey] ?? "").toLowerCase();
        const bv = String(b[sortKey] ?? "").toLowerCase();
        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
    }
    return out;
  }, [teams, query, entityFilter, sortKey, sortDir]);

  const { paged, total } = useClientPagination(filtered, page, pageSize);
  const totalPages = Math.ceil(total / pageSize);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(
        sortDir === "asc" ? "desc" : sortDir === "desc" ? null : "asc"
      );
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const toggleSelectAll = () => {
    if (selectedRows.size === paged.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paged.map((t) => t.id)));
    }
  };

  const toggleSelectRow = (id: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const generatePageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(totalPages, page + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handleEdit = (teamId: string) => {
    const team = teams.find((t) => t.id === teamId);
    if (team) {
      setTeamToEdit(team);
      setEditTeamModalOpen(true);
    }
  };

  const handleDelete = (teamId: string) => {
    setTeamToDelete(teamId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (teamToDelete) {
      try {
        const team = teams.find((t) => t.id === teamToDelete);
        await deleteTeam(teamToDelete);
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

  const handleCreateTeam = async (data: any) => {
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

      await createTeam(newTeamData);
      setNewTeamModalOpen(false);
      setDeletedTeamName(data.name);
      setSuccessModalType("create");
      setSuccessModalOpen(true);
    } catch (error) {
      console.error("Failed to create team:", error);
    }
  };

  const handleUpdateTeam = async (data: any) => {
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

      await updateTeam(teamToEdit.id, updatedTeamData);
      setEditTeamModalOpen(false);
      setDeletedTeamName(data.name);
      setSuccessModalType("update");
      setSuccessModalOpen(true);
      setTeamToEdit(null);
    } catch (error) {
      console.error("Failed to update team:", error);
    }
  };

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
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1">
          <Search
            placeholder="Search by team name or code"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            className="w-full"
          />
        </div>

        <Select
          value={entityFilter}
          onValueChange={(value) => {
            setEntityFilter(value);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Entity" />
          </SelectTrigger>
          <SelectContent>
            {entities.map((entity) => (
              <SelectItem key={entity} value={entity}>
                {entity}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="More Filters" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active Only</SelectItem>
            <SelectItem value="inactive">Inactive Only</SelectItem>
          </SelectContent>
        </Select>

        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setNewTeamModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Team
        </Button>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <TableComponent>
          <TableHeader className="bg-blue-600">
            <TableRow className="border-0 hover:bg-blue-600">
              <TableHead className="text-white font-medium">
                <Checkbox
                  checked={
                    selectedRows.size === paged.length && paged.length > 0
                  }
                  onCheckedChange={toggleSelectAll}
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
          <TableBody>
            {paged.map((team) => (
              <TableRow key={team.id} className="hover:bg-gray-50">
                <TableCell>
                  <Checkbox
                    checked={selectedRows.has(team.id)}
                    onCheckedChange={() => toggleSelectRow(team.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{team.name}</TableCell>
                <TableCell className="text-gray-600">{team.code}</TableCell>
                <TableCell className="text-gray-600 max-w-xs truncate">
                  {team.description}
                </TableCell>
                <TableCell className="text-gray-600">
                  {team.teamEmail}
                </TableCell>
                <TableCell className="text-gray-600">{team.entity}</TableCell>
                <TableCell>
                  <ManagerAvatar name={team.manager} />
                </TableCell>
                <TableCell>
                  <ActionsMenu
                    onEdit={() => handleEdit(team.id)}
                    onDelete={() => handleDelete(team.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableComponent>
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Page Size</span>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => {
              setPageSize(Number(value));
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[80px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {generatePageNumbers().map((pageNum) => (
            <Button
              key={pageNum}
              variant={pageNum === page ? "default" : "outline"}
              size="sm"
              onClick={() => setPage(pageNum)}
              className={
                pageNum === page ? "bg-blue-600 hover:bg-blue-700" : ""
              }
            >
              {pageNum}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Go to page</span>
            <input
              type="number"
              min="1"
              max={totalPages}
              value={page}
              onChange={(e) => {
                const newPage = Number(e.target.value);
                if (newPage >= 1 && newPage <= totalPages) {
                  setPage(newPage);
                }
              }}
              className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
            />
          </div>
        </div>
      </div>

      <DeleteTeamDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        teamName={
          teamToDelete
            ? teams.find((t) => t.id === teamToDelete)?.name
            : undefined
        }
      />

      <SuccessModal
        open={successModalOpen}
        onOpenChange={setSuccessModalOpen}
        title={
          successModalType === "create"
            ? "Team Created"
            : successModalType === "update"
            ? "Team Updated"
            : "Team Deleted"
        }
        message={
          successModalType === "create"
            ? "You have created this team successfully."
            : successModalType === "update"
            ? "You have updated this team successfully."
            : `You have deleted this team successfully.`
        }
        buttonText="Done"
        onDone={() => setSuccessModalOpen(false)}
      />

      <NewTeamModal
        open={newTeamModalOpen}
        onOpenChange={setNewTeamModalOpen}
        onSubmit={handleCreateTeam}
      />

      <EditTeamModal
        open={editTeamModalOpen}
        onOpenChange={setEditTeamModalOpen}
        onSubmit={handleUpdateTeam}
        team={teamToEdit}
      />
    </div>
  );
};

export default Table;
