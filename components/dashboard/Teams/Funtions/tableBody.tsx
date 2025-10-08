import React from "react";
import {
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/Table/Table";
import { Checkbox } from "@/components/ui/Checkbox/Checkbox";
import { ActionsMenu } from "@/components/ui/ActionsMenu/ActionsMenu";
import { ManagerAvatar, toggleSelectRow } from "./components";

interface TableBodyProps {
  paged: any[];
  selectedRows: Set<string>;
  setSelectedRows: (selected: Set<string>) => void;
  onEdit: (teamId: string) => void;
  onDelete: (teamId: string) => void;
}

export const CustomTableBody: React.FC<TableBodyProps> = ({
  paged,
  selectedRows,
  setSelectedRows,
  onEdit,
  onDelete,
}) => {
  return (
    <TableBody>
      {paged.map((team) => (
        <TableRow key={team.id} className="hover:bg-gray-50">
          <TableCell>
            <Checkbox
              checked={selectedRows.has(team.id)}
              onCheckedChange={() => toggleSelectRow(team.id, selectedRows, setSelectedRows)}
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
              onEdit={() => onEdit(team.id)}
              onDelete={() => onDelete(team.id)}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};
