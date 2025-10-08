import React from "react";
import { Button } from "@/components/ui/Button/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select/Select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { generatePageNumbers } from "./paginationUtils";

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  pageSize: number;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  page,
  totalPages,
  pageSize,
  setPage,
  setPageSize,
}) => {
  return (
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

        {generatePageNumbers(page, totalPages).map((pageNum) => (
          <Button
            key={pageNum}
            variant={pageNum === page ? "default" : "outline"}
            size="sm"
            onClick={() => setPage(pageNum)}
            className={pageNum === page ? "bg-blue-600 hover:bg-blue-700" : ""}
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
  );
};
