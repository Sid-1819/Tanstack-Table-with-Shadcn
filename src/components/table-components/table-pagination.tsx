import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table } from "@tanstack/react-table";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { TableData } from "./types/table-data-types";

interface TablePaginationProps {
  table: Table<TableData>;
}

export const TablePagination: React.FC<TablePaginationProps> = ({ table }) => {
  const { pageIndex } = table.getState().pagination;

  // Generate an array of page numbers to display
  const generatePaginationItems = () => {
    // Default showing first, last, and pages around current
    const pages = [];
    const currentPage = pageIndex + 1; // Convert to 1-indexed for display
    const totalPages = table.getPageCount();

    // Always show first page
    pages.push(1);

    // If we're not near the beginning, show ellipsis
    if (currentPage > 3) {
      pages.push(-1); // -1 represents ellipsis
    }

    // Show pages around current page
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (i > 1 && i < totalPages) {
        pages.push(i);
      }
    }

    // If we're not near the end, show ellipsis
    if (currentPage < totalPages - 2) {
      pages.push(-2); // -2 represents ellipsis
    }

    // Always show last page if more than 1 page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const paginationItems = generatePaginationItems();

  return (
    <div className="flex justify-between p-2">
      {/* Page Info and Rows Selector */}
      <div className="flex items-center">
        <div className="text-sm text-gray-500 px-4 w-full">
          Page {pageIndex + 1} of {table.getPageCount()}
        </div>
        <Select
          value={String(table.getState().pagination.pageSize)}
          onValueChange={(value) => table.setPageSize(Number(value))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Rows" />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={String(pageSize)}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
  
      {/* Pagination Controls - Aligned Right */}
      <div className="flex justify-end w-full">
        <Pagination className="flex items-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationLink onClick={() => table.firstPage()}>
                <ChevronsLeft />
              </PaginationLink>
            </PaginationItem>
  
            <PaginationItem>
              <PaginationPrevious onClick={() => table.previousPage()} />
            </PaginationItem>
  
            {paginationItems.map((page, i) => {
              if (page < 0) {
                return (
                  <PaginationItem key={`ellipsis-${i}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={pageIndex + 1 === page}
                    onClick={() => table.setPageIndex(page - 1)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
  
            <PaginationItem>
              <PaginationNext onClick={() => table.nextPage()} />
            </PaginationItem>
  
            <PaginationItem>
              <PaginationLink onClick={() => table.lastPage()}>
                <ChevronsRight />
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
  
};
