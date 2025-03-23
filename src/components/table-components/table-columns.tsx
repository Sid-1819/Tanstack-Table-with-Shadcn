import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { TableData } from "./types/table-data-types";

const columnHelper = createColumnHelper<TableData>();

export const tableColumns: ColumnDef<TableData, any>[] = [
  columnHelper.accessor("id", {
    id: "id",
    cell: (info) => <div>{info.getValue()}</div>,
    header: () => <span className="flex items-center">ID</span>,
    filterFn: "includesString",
    sortingFn: "datetime",
  }),
  columnHelper.accessor("name", {
    id: "name",
    cell: (info) => (
      <>
        <div className="flex items-center gap-2">{info.row.original.name}</div>
        <div className="text-gray-500">{info.row.original.email}</div>
      </>
    ),
    header: () => <span> Users</span>,
    filterFn: "equals",
    enableSorting: true,
  }),
  columnHelper.accessor("age", {
    id: "age",
    cell: (info) => <>{info.getValue()}</>,
    header: () => <span className="flex items-center">Age</span>,
    filterFn: "includesString",
    meta: { filterVariant: "select" },
  }),
  columnHelper.accessor("country", {
    id: "country",
    header: () => <span className="flex items-center">Country</span>,
    cell: (info) => <>{info.getValue()}</>,
    enableColumnFilter: true,
    enableHiding: false,
    meta: { isHidden: true },
  }),
  columnHelper.accessor("status", {
    id: "status",
    cell: (info) => <>{info.getValue()}</>,
    header: () => <span className="flex items-center">Status</span>,
    filterFn: "equalsString",
  }),
];
