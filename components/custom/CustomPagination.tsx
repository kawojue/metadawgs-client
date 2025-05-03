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
import { MetaType } from "@/lib/type";

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
  const getPageNumbers = () => {
    const pageNumbers: (number | "ellipsis")[] = [];
    const maxVisiblePages = 5;

    pageNumbers.push(1);

    if (meta.totalPages <= maxVisiblePages) {
      for (let i = 2; i <= meta.totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const leftSiblingIndex = Math.max(meta.currentPage - 1, 2);
      const rightSiblingIndex = Math.min(
        meta.currentPage + 1,
        meta.totalPages - 1
      );

      if (leftSiblingIndex > 2) {
        pageNumbers.push("ellipsis");
      }

      for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
        pageNumbers.push(i);
      }

      if (rightSiblingIndex < meta.totalPages - 1) {
        pageNumbers.push("ellipsis");
      }

      if (meta.totalPages > 1) {
        pageNumbers.push(meta.totalPages);
      }
    }

    return pageNumbers;
  };

  const handlePageChange = (page: number) => {
    if (page !== meta.currentPage && page >= 1 && page <= meta.totalPages) {
      if (onPageChange) {
        onPageChange(page);
      }
    }
  };

  const getPageUrl = (page: number) => {
    if (baseUrl) {
      return `${baseUrl}?page=${page}`;
    }
    return "#";
  };

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
                  ? getPageUrl(meta.previousPage || meta.currentPage - 1)
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
              aria-disabled={!meta.hasPrev}
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
                  ? getPageUrl(meta.nextPage || meta.currentPage + 1)
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
              aria-disabled={!meta.hasNext}
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
