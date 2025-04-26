"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// MetaType interface as provided
interface MetaType {
  size: number;
  hasNext: boolean;
  hasPrev: boolean;
  totalPages: number;
  currentPage: number;
  offset: number;
  totalItems: number;
  nextPage: string | null;
  previousPage: string | null;
}

interface ShadcnPaginationProps {
  meta: MetaType;
  onPageChange?: (page: number) => void;
  baseUrl?: string;
}

const ShadcnPagination = ({
  meta,
  onPageChange,
  baseUrl = "",
}: ShadcnPaginationProps) => {
  // Calculate which page numbers to show
  const getPageNumbers = () => {
    const pageNumbers: (number | "ellipsis")[] = [];
    const maxVisiblePages = 5;

    // Always show first page
    pageNumbers.push(1);

    if (meta.totalPages <= maxVisiblePages) {
      // If we have 5 or fewer pages, show all of them
      for (let i = 2; i <= meta.totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Complex pagination with ellipsis
      const leftSiblingIndex = Math.max(meta.currentPage - 1, 2);
      const rightSiblingIndex = Math.min(
        meta.currentPage + 1,
        meta.totalPages - 1
      );

      // Add ellipsis indicators or page numbers
      if (leftSiblingIndex > 2) {
        pageNumbers.push("ellipsis");
      }

      // Add page numbers around current page
      for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
        pageNumbers.push(i);
      }

      if (rightSiblingIndex < meta.totalPages - 1) {
        pageNumbers.push("ellipsis");
      }

      // Always show last page
      if (meta.totalPages > 1) {
        pageNumbers.push(meta.totalPages);
      }
    }

    return pageNumbers;
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page !== meta.currentPage && page >= 1 && page <= meta.totalPages) {
      if (onPageChange) {
        onPageChange(page);
      }
    }
  };

  // Get URL for a specific page
  const getPageUrl = (page: number) => {
    if (baseUrl) {
      // If baseUrl is provided, use it to construct page URLs
      return `${baseUrl}?page=${page}`;
    }
    // Return # if no baseUrl is provided
    return "#";
  };

  // Get the page numbers to render
  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col items-center w-full">
      <Pagination>
        <PaginationContent>
          {/* Previous Page Button */}
          <PaginationItem>
            <PaginationPrevious
              href={
                meta.hasPrev
                  ? meta.previousPage || getPageUrl(meta.currentPage - 1)
                  : "#"
              }
              onClick={(e) => {
                if (!meta.hasPrev) {
                  e.preventDefault();
                  return;
                }
                if (onPageChange) {
                  e.preventDefault();
                  handlePageChange(meta.currentPage - 1);
                }
              }}
              className={!meta.hasPrev ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {/* Page Numbers */}
          {pageNumbers.map((pageNumber, index) =>
            pageNumber === "ellipsis" ? (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={`page-${pageNumber}`}>
                <PaginationLink
                  href={getPageUrl(pageNumber)}
                  isActive={pageNumber === meta.currentPage}
                  onClick={(e) => {
                    if (onPageChange) {
                      e.preventDefault();
                      handlePageChange(pageNumber);
                    }
                  }}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          {/* Next Page Button */}
          <PaginationItem>
            <PaginationNext
              href={
                meta.hasNext
                  ? meta.nextPage || getPageUrl(meta.currentPage + 1)
                  : "#"
              }
              onClick={(e) => {
                if (!meta.hasNext) {
                  e.preventDefault();
                  return;
                }
                if (onPageChange) {
                  e.preventDefault();
                  handlePageChange(meta.currentPage + 1);
                }
              }}
              className={!meta.hasNext ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* Pagination information */}
      {/* <div className="text-sm text-muted-foreground mt-2">
        Page {meta.currentPage} of {meta.totalPages} • Showing {meta.size} items
        • Total {meta.totalItems} items
      </div> */}
    </div>
  );
};

export default ShadcnPagination;
