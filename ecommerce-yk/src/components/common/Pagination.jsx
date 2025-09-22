import React from "react";
import usePagination from "../../hooks/usePagination";

export const Pagination = ({ page, setPage, totalPages, className = "" }) => {
  const pages = usePagination({ current: page, totalPages });

  if (!totalPages || totalPages <= 1) return null;

  return (
    <div className={`flex items-center justify-center ${className}`.trim()}>
      <div className="flex items-center space-x-0.5 sm:space-x-1">
        {/* Prev */}
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className={`flex h-7 w-7 items-center justify-center rounded sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 ${
            page === 1 ? "cursor-not-allowed bg-gray-100 text-gray-400" : "bg-black text-white hover:bg-gray-800"
          }`}
          aria-label="Previous page"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4"
          >
            <polyline points="15,18 9,12 15,6"></polyline>
          </svg>
        </button>
        {pages.map((p, i) =>
          p === "..." ? (
            <span
              key={i}
              className="flex h-7 w-7 items-center justify-center text-xs text-gray-500 sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 lg:text-sm"
            >
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`h-7 min-w-[1.75rem] rounded px-1.5 text-xs font-medium sm:h-8 sm:min-w-[2rem] sm:px-2 md:h-9 md:min-w-[2.25rem] md:text-sm lg:h-10 lg:min-w-[2.5rem] lg:px-3 ${
                page === p ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {p}
            </button>
          )
        )}
        {/* Next */}
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page >= totalPages}
          className={`flex h-7 w-7 items-center justify-center rounded sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 ${
            page >= totalPages
              ? "cursor-not-allowed bg-gray-100 text-gray-400"
              : "bg-black text-white hover:bg-gray-800"
          }`}
          aria-label="Next page"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4"
          >
            <polyline points="9,18 15,12 9,6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
