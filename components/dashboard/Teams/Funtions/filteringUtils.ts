import { Team } from "@/types/teams";

type SortKey = keyof Pick<
  Team,
  "name" | "code" | "manager" | "status" | "entity"
>;
type SortDir = "asc" | "desc" | null;

export type { SortKey, SortDir };

export const getUniqueEntities = (teams: Team[]) => {
  const uniqueEntities = Array.from(new Set(teams.map((t) => t.entity)));
  return ["All", ...uniqueEntities];
};

export const filterAndSortTeams = (
  teams: Team[],
  query: string,
  entityFilter: string,
  sortKey: SortKey,
  sortDir: SortDir,
) => {
  let filtered = teams;

  // Filter by search query
  if (query.trim()) {
    const q = query.trim().toLowerCase();
    filtered = filtered.filter(
      (t) =>
        t.name.toLowerCase().includes(q) || t.code.toLowerCase().includes(q),
    );
  }

  // Filter by entity
  if (entityFilter !== "All") {
    filtered = filtered.filter((t) => t.entity === entityFilter);
  }

  // Sort if sort direction is set
  if (sortDir) {
    filtered = [...filtered].sort((a: Team, b: Team) => {
      const av = String(a[sortKey] ?? "").toLowerCase();
      const bv = String(b[sortKey] ?? "").toLowerCase();
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }

  return filtered;
};

export const getNextSortDirection = (
  currentSortKey: SortKey,
  currentSortDir: SortDir,
  newSortKey: SortKey,
): { sortKey: SortKey; sortDir: SortDir } => {
  if (currentSortKey === newSortKey) {
    return {
      sortKey: newSortKey,
      sortDir:
        currentSortDir === "asc"
          ? "desc"
          : currentSortDir === "desc"
            ? null
            : "asc",
    };
  } else {
    return {
      sortKey: newSortKey,
      sortDir: "asc",
    };
  }
};
