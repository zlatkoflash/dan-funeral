import { Button } from "react-bootstrap";
import SearchLocationsForm from "./SearchLocationsForm";
import plusIcon from "@/assets/images/icon-plus.svg";
import FeaturedRankingTable from "./FeaturedRankingTable";
import FeaturedRankingPagination from "./FeaturedRankingPagination";
import Link from "next/link";

export default function FeaturedRanking() {
  return (
    <section className="featured-ranking">
      <div className="heading">
        <div className="content">
          <h2>Featured Rankings</h2>
        </div>
        <div className="right-content">
          <div className="search-locations-wrap">
            <Link href="/DashboardV2/FeaturedRanking" className="btn btn-sm btn-success">
              <img src={plusIcon.src} alt="plusIcon" className="icon" />
              Add New Ranking
            </Link>
            <SearchLocationsForm />
          </div>
        </div>
      </div>

      <FeaturedRankingTable />
      <FeaturedRankingPagination />

    </section>
  )
}