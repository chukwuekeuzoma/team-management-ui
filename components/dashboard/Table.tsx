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
  const { teams, fetchTeams, loading, deleteTeam } = useTeamsStore();
  const [query, setQuery] = useState("");
  const [entityFilter, setEntityFilter] = useState("All");
  const [pageSize, setPageSize] = useState(100);
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

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

        <Button className="bg-blue-600 hover:bg-blue-700">
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
    </div>
  );
};

export default Table;
