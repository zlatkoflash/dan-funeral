"use client";

import { executeSearchFiltersRedirect } from '@/utils/listing';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

interface PaginationProps {
  totalPages?: number;
  initialPage?: number;
  loading?: boolean;
}

export default function PaginationListing({
  totalPages = 10,
  initialPage = 1,
  loading = false
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
      pageIndex: page
    });
  };

  // --- Logic for the "Sliding Window" ---
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 10;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always show first page
      pages.push(1);

      let start = Math.max(2, currentPage - 2);
      let end = Math.min(totalPages - 1, currentPage + 2);

      // Adjust window to show more numbers if near the start or end
      if (currentPage <= 4) end = 7;
      if (currentPage >= totalPages - 3) start = totalPages - 6;

      if (start > 2) pages.push("...");

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) pages.push("...");

      // Always show last page
      pages.push(totalPages);
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
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
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
              className={`page-item ${currentPage === page ? 'active' : ''} ${page === '...' ? 'disabled' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => typeof page === 'number' && handlePageChange(page)}
                disabled={loading || page === '...'}
              >
                {page}
              </button>
            </li>
          ))}

          {/* Next Arrow */}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
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
          {loading ? 'Loading...' : <>Next Page <span className="ms-2">→</span></>}
        </button>
      </div>
    </div>
  );
}