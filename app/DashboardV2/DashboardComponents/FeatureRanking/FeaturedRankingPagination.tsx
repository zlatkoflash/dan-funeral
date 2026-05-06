import Link from "next/link";


export default function FeaturedRankingPagination() {
  return (
    <>
      <div className="featured-ranking-pagination">
        <div className="left-content">
          Showing 1 to 3 of 16 entries
        </div>
        <div className="pagination-wrap">
          <ul className="pagination">
            <li>
              <Link href="#">Previous</Link>
            </li>
            <li className="active">
              <Link href="#">1</Link>
            </li>
            <li>
              <Link href="#">2</Link>
            </li>
            <li>
              <Link href="#">3</Link>
            </li>
            <li>
              <Link href="#">Next</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}