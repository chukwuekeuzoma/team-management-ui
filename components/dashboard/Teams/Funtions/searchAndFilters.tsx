import React from "react";
import { Search } from "@/components/ui/Search/Search";
import { Button } from "@/components/ui/Button/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select/Select";
import { Plus } from "lucide-react";

interface SearchAndFiltersProps {
  query: string;
  setQuery: (query: string) => void;
  setPage: (page: number) => void;
  entityFilter: string;
  setEntityFilter: (filter: string) => void;
  entities: string[];
  onCreateTeam: () => void;
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  query,
  setQuery,
  setPage,
  entityFilter,
  setEntityFilter,
  entities,
  onCreateTeam,
}) => {
  return (
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
        onClick={onCreateTeam}
      >
        <Plus className="h-4 w-4 mr-2" />
        Create New Team
      </Button>
    </div>
  );
};
