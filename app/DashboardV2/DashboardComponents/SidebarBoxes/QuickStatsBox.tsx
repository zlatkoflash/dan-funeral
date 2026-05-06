import StatListItem from "@/components/lists/StatListItem";

export default function QuickStatsBox() {
  return (
    <>
      <section className="dashboard-sidebar-menu">
        <div className="box-cell-content">
          <div className="title">Quick Stats</div>
        </div>

        <div className="box-cell-content">
          <StatListItem
            content="Profile View (30d)"
            count={142}
            icon_type="eye"
          />
        </div>

        <div className="box-cell-content">
          <StatListItem
            content="Leads Received"
            count={3}
            icon_type="arrow_down"
          />
        </div>

        <div className="box-cell-content">
          <StatListItem
            content="Search Appearances"
            count={89}
            icon_type="search"
          />
        </div>

      </section>
    </>
  )
}