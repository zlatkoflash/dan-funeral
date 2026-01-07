"use client";

import { executeSearchFiltersRedirect } from '@/utils/listing';
import { useRouter } from 'next/navigation';
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

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const params = new URLSearchParams(window.location.search);
    const urlPage = params.get("page");
    if (urlPage) setCurrentPage(Number(urlPage));
  }, []);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);

    /*const params = new URLSearchParams(window.location.search);
    params.set("page", page.toString());
    window.history.pushState({}, "", `?${params.toString()}`);*/
    executeSearchFiltersRedirect({
      paramsArray: [
        // { paramName: "page", paramValue: page.toString() }
      ],
      router: router,
      currentParams: new URLSearchParams(window.location.search),
      pageIndex: page
    });
  };

  if (!mounted) return <div style={{ height: '40px' }}></div>;

  return (
    <div className="pagination-listing d-flex justify-content-between align-items-center mt-4">
      {/* Left Column: Numbered Pagination */}
      <nav aria-label="Page navigation">
        <ul className="pagination mb-0">
          {/* Previous Arrow */}
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>

          {/* Simple Page Numbers (Logic can be expanded for many pages) */}
          {[...Array(totalPages)].map((_, index) => {
            const pageNum = index + 1;
            return (
              <li key={pageNum} className={`page-item ${currentPage === pageNum ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(pageNum)}>
                  {pageNum}
                </button>
              </li>
            );
          })}

          {/* Next Arrow */}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button
              className={`page-link ${loading ? 'loading' : ''}`}
              onClick={() => handlePageChange(currentPage + 1)}
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Right Column: Big Next Button */}
      <div>
        <button
          className="btn btn-success px-4"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next Page <span className="ms-1">→</span>
        </button>
      </div>
    </div>
  );
}