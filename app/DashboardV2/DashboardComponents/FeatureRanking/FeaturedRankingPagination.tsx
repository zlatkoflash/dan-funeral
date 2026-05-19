import Link from "next/link";

interface FeaturedRankingPaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}


export default function FeaturedRankingPagination({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
}: FeaturedRankingPaginationProps) {
  // 1. Calculate pagination parameters
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Guard against 0 items or out of bounds
  if (totalPages <= 1) {
    if (totalItems === 0) return null;
  }

  const startEntry = (currentPage - 1) * itemsPerPage + 1;
  const endEntry = Math.min(currentPage * itemsPerPage, totalItems);

  // 2. Generate the array of page numbers to render
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="featured-ranking-pagination">
      {/* Dynamic range label */}
      <div className="left-content">
        Showing {startEntry} to {endEntry} of {totalItems} entries
      </div>

      <div className="pagination-wrap">
        <ul className="pagination">
          {/* Previous Button */}
          <li className={currentPage === 1 ? 'disabled' : ''}>
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) onPageChange(currentPage - 1);
              }}
            >
              Previous
            </Link>
          </li>

          {/* Page Numbers */}
          {pageNumbers.map((page) => (
            <li key={page} className={currentPage === page ? 'active' : ''}>
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page);
                }}
              >
                {page}
              </Link>
            </li>
          ))}

          {/* Next Button */}
          <li className={currentPage === totalPages ? 'disabled' : ''}>
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) onPageChange(currentPage + 1);
              }}
            >
              Next
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}