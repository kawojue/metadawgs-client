import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MetaType } from "@/lib/type";

interface DarkPaginationProps {
    meta: MetaType;
    onPageChange?: (page: number) => void;
}

const DarkPagination = ({ meta, onPageChange }: DarkPaginationProps) => {
    const getPageNumbers = () => {
        const pageNumbers: (number | "ellipsis")[] = [];
        const maxVisiblePages = 7;

        if (meta.totalPages <= maxVisiblePages) {
            // Show all pages if total is small
            for (let i = 1; i <= meta.totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Always show first page
            pageNumbers.push(1);

            const leftSiblingIndex = Math.max(meta.currentPage - 2, 2);
            const rightSiblingIndex = Math.min(
                meta.currentPage + 2,
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

            // Always show last page
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

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex items-center justify-center gap-2 p-4 bg-black">
            {/* Previous Button */}
            <button
                onClick={() => handlePageChange(meta.currentPage - 1)}
                disabled={!meta.hasPrev}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                    meta.hasPrev
                        ? "text-white cursor-pointer"
                        : "cursor-not-allowed opacity-50"
                }`}
                aria-label="Previous page"
            >
                <ChevronLeft size={16} />
            </button>

            {/* Page Numbers */}
            {pageNumbers.map((pageNumber, index) =>
                pageNumber === "ellipsis" ? (
                    <div
                        key={`ellipsis-${index}`}
                        className="w-10 h-10 flex items-center justify-center text-gray-500"
                    >
                        ...
                    </div>
                ) : (
                    <button
                        key={`page-${pageNumber}`}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`w-10 h-10 rounded-full flex items-center cursor-pointer justify-center text-sm font-medium transition-all duration-200 ${
                            pageNumber === meta.currentPage
                                ? "bg-[#FFBE00] text-black shadow-lg"
                                : "bg-[#F5F5F51A] hover:opacity-80 text-white"
                        }`}
                        aria-label={`Page ${pageNumber}`}
                        aria-current={
                            pageNumber === meta.currentPage ? "page" : undefined
                        }
                    >
                        {pageNumber}
                    </button>
                )
            )}

            {/* Next Button */}
            <button
                onClick={() => handlePageChange(meta.currentPage + 1)}
                disabled={!meta.hasNext}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                    meta.hasNext
                        ? "text-white cursor-pointer"
                        : "cursor-not-allowed opacity-50"
                }`}
                aria-label="Next page"
            >
                <ChevronRight size={16} />
            </button>
        </div>
    );
};

export default DarkPagination;
