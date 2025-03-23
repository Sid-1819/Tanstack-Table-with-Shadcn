import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableData } from "../types/table-data-types";
import { Column } from "@tanstack/react-table";

interface FilterProps {
  column: Column<TableData, unknown> | undefined;
}
export function StatusFilter({ column }: FilterProps) {
  const filterValue = column?.getFilterValue() as string;

  // Extract unique statuses from data
  const uniqueStatuses = ["Active", "Inactive"];

  const handleFilterChange = (value: string) => {
    if (value === "all") {
      column?.setFilterValue(undefined);
    } else {
      column?.setFilterValue(value);
    }
  };

  return (
    <Select value={filterValue || "all"} onValueChange={handleFilterChange}>
      <SelectTrigger className="w-[180px] mx-2">
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Status</SelectItem>
        {uniqueStatuses.map((status) => (
          <SelectItem key={status} value={status}>
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
