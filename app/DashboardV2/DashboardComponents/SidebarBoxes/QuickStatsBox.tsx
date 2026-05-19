"use client";

import StatListItem from "@/components/lists/StatListItem";
import { useAuth } from "@/ContextProvider/AuthProviderWrap";

export default function QuickStatsBox() {

  const {
    user
  } = useAuth();

  return (
    <>
      <section className="dashboard-sidebar-menu">
        <div className="box-cell-content">
          <div className="title">Quick Stats</div>
        </div>

        <div className="box-cell-content">
          <StatListItem
            content="Profile View (30d)"
            count={user?.defaultListing.quick_stats.count_profile_views as number}
            icon_type="eye"
          />
        </div>

        <div className="box-cell-content">
          <StatListItem
            content="Leads Received"
            count={user?.defaultListing.quick_stats.count_leads as number}
            icon_type="arrow_down"
          />
        </div>

        <div className="box-cell-content">
          <StatListItem
            content="Search Appearances"
            count={user?.defaultListing.quick_stats.count_search_appearances as number}
            icon_type="search"
          />
        </div>

      </section>
    </>
  )
}