import { useMemo } from "react";

/**
 * Hook to compute pagination pages with ellipsis
 * @param {number} current - current page
 * @param {number} totalPages - total pages
 * @param {number} maxVisible - max numeric buttons to show (including edges)
 */
export const usePagination = ({ current, totalPages, maxVisible = 5 }) => {
  return useMemo(() => {
    if (totalPages <= 1) return [1];
    const pages = [];

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1); // always first

    if (current <= 3) {
      for (let i = 2; i <= 4; i++) pages.push(i);
      pages.push("...", totalPages);
      return pages;
    }

    if (current >= totalPages - 2) {
      pages.push("...");
      for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    // middle
    pages.push("...");
    for (let i = current - 1; i <= current + 1; i++) pages.push(i);
    pages.push("...", totalPages);
    return pages;
  }, [current, totalPages, maxVisible]);
};

export default usePagination;
