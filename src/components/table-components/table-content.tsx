import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { ArrowUp, ArrowDown } from "lucide-react";
import React, { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { TableData, TableDataProps } from "./types/table-data-types";
import { tableColumns } from "./table-columns";
import { TablePagination } from "./table-pagination";
import CountryFilter from "./filters/filter-1";
import { StatusFilter } from "./filters/status-filter";

const TanstackTable: React.FC<TableDataProps> = ({ data }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // Use our createReportColumns function to get the appropriate columns
  const columns: ColumnDef<TableData, never>[] = tableColumns;

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      pagination,
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    manualPagination: false,
  });
  if (!data || data.length === 0) {
    return <div>Loading...</div>;
  }

  console.log("Table Data:", data);
  const countryColumn = table.getColumn("country");
  const statusColumn = table.getColumn("status");
  return (
    <div className="w-full flex flex-col ">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
        {/* Filters Section */}
        <div className="flex gap-4">
          <CountryFilter column={countryColumn} data={data} />
          <StatusFilter column={statusColumn} />
        </div>

        {/* Search Section */}
        <Input
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search"
          className="w-full sm:w-1/3 md:w-1/4"
        />
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <Table className="min-w-full divide-y">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-muted-foreground/60 uppercase tracking-wider"
                  >
                    {header.column.getCanSort() ? (
                      <div
                        className="cursor-pointer select-none flex items-center"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        <span className="ml-2">
                          {header.column.getIsSorted() ? (
                            header.column.getIsSorted() === "asc" ? (
                              <ArrowUp size={14} />
                            ) : (
                              <ArrowDown size={14} />
                            )
                          ) : (
                            <div className="w-4" />
                          )}
                        </span>
                      </div>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="divide-y">
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="px-6 py-2 whitespace-nowrap text-sm"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination table={table} />
      </div>
    </div>
  );
};

export default TanstackTable;
