"use client";

import { Button } from "react-bootstrap";
import SearchLocationsForm from "./SearchLocationsForm";
import plusIcon from "@/assets/images/icon-plus.svg";
import FeaturedRankingTable from "./FeaturedRankingTable";
import FeaturedRankingPagination from "./FeaturedRankingPagination";
import Link from "next/link";
import { useAuth } from "@/ContextProvider/AuthProviderWrap";
import { useEffect, useMemo, useState } from "react";
import { getApiData } from "@/utils/api";
import { IRankData } from "@/utils/interfaceListing";

export default function FeaturedRanking() {

  const { user } = useAuth();

  if (!user) {
    return <></>;
  }


  const [ranks, setRanks] = useState<IRankData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const LoadRanksData = async () => {
    setLoading(true);
    const resultsData = await getApiData<{
      ok: boolean,
      ranks: IRankData[]
    }>("/listings/GetRanksData", "POST", {
      listing_id: user.defaultListing.id
    }, "authorize", "application/json");

    console.log("resultsData:", resultsData);
    // resultsData.data[0].
    if (resultsData.ok) {
      setRanks(resultsData.ranks);
    }
    else {
      // here we have error loading
    }
    setLoading(false);
  }

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  // const totalItems = 100; // Replace with actual count from your API response

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Fetch new data for the page
    // FetchTheListingsByFilters(user.defaultListing.id, page, itemsPerPage, currentServiceId);
  };

  const itemsForThePageToDisplay = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return ranks.slice(startIndex, endIndex);
  }, [currentPage, itemsPerPage, ranks]);

  useEffect(() => {

    LoadRanksData();

  }, []);

  if (ranks.length === 0) {
    return <></>
  }

  return (
    <section className="featured-ranking">
      <div className="heading">
        <div className="content">
          <h2>Featured Rankings</h2>
        </div>
        <div className="right-content">
          <div className="search-locations-wrap">
            <Link href="/DashboardV2/FeaturedRanking/AddNewRanking" className="btn btn-sm btn-success">
              <img src={plusIcon.src} alt="plusIcon" className="icon" />
              Add New Ranking
            </Link>
            {
              // do not remove this is searching input that need to be set if client insist about it
              // <SearchLocationsForm />
            }
          </div>
        </div>
      </div>

      <FeaturedRankingTable
        dataRankings={itemsForThePageToDisplay}

        onRemoveRank={(rank) => {
          // RemoveTheRanksData(ranking);
          // setRanks((prev) => prev.filter((r) => r.id !== rank.id));

          const newRank = { ...rank, subscribtion_status: "removed" }
          const rankIndex = ranks.findIndex((r) => r.id === rank.id);
          if (rankIndex !== -1) {
            const newRanks = [...ranks];
            newRanks[rankIndex] = newRank;
            setRanks(newRanks);
          }

        }}
      />
      <FeaturedRankingPagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={ranks.length}
        onPageChange={handlePageChange}
      />

    </section>
  )
}