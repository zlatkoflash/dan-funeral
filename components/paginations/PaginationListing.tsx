"use client";

import { executeSearchFiltersRedirect } from "@/utils/listing";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

interface PaginationProps {
  totalPages?: number;
  initialPage?: number;
  loading?: boolean;
}

export default function PaginationListing({
  totalPages = 10,
  initialPage = 1,
  loading = false,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const urlPage = searchParams.get("page");
    if (urlPage) setCurrentPage(Number(urlPage));
  }, [searchParams]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);

    executeSearchFiltersRedirect({
      paramsArray: [],
      router: router,
      currentParams: new URLSearchParams(window.location.search),
      pageIndex: page,
    });
  };

  // --- Logic for the strict Max 4 Numbers Window ---
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 4;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // If we are at the beginning (Pages 1 or 2)
      if (currentPage <= 2) {
        pages.push(1, 2, 3);
        pages.push("...");
        pages.push(totalPages);
      }
      // If we are at the end (Last two pages)
      else if (currentPage >= totalPages - 1) {
        pages.push(1);
        pages.push("...");
        pages.push(totalPages - 2, totalPages - 1, totalPages);
      }
      // Anywhere in the middle sliding area
      else {
        pages.push(1);
        if (currentPage > 3) pages.push("...");

        // Show the current page and one adjacent neighbor based on proximity
        if (currentPage === 3) {
          pages.push(2, 3, 4);
        } else if (currentPage === totalPages - 2) {
          pages.push(totalPages - 3, totalPages - 2, totalPages - 1);
        } else {
          pages.push(currentPage - 1, currentPage, currentPage + 1);
        }

        if (currentPage < totalPages - 2) pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  if (!mounted || totalPages <= 1) return null;

  return (
    <div className="pagination-listing d-flex flex-wrap justify-content-between align-items-center mt-4 gap-3">
      {/* Left Column: Numbered Pagination */}
      <nav aria-label="Page navigation">
        <ul className="pagination mb-0">
          {/* Previous Arrow */}
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || loading}
            >
              &laquo;
            </button>
          </li>

          {/* Smart Page Numbers */}
          {getPageNumbers().map((page, index) => (
            <li
              key={index}
              className={`page-item ${currentPage === page ? "active" : ""} ${page === "..." ? "disabled" : ""}`}
            >
              <button
                className="page-link"
                onClick={() =>
                  typeof page === "number" && handlePageChange(page)
                }
                disabled={loading || page === "..."}
              >
                {page}
              </button>
            </li>
          ))}

          {/* Next Arrow */}
          <li
            className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || loading}
            >
              &raquo;
            </button>
          </li>
        </ul>
      </nav>

      {/* Right Column: Big Next Button */}
      <div>
        <button
          className="btn btn-success px-4 d-flex align-items-center"
          disabled={currentPage === totalPages || loading}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          {loading ? (
            "Loading..."
          ) : (
            <>
              Next Page <span className="ms-2">→</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
