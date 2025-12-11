import DashPlanStats from "@/components/dashboard/DashPlanStats";
import PlansAndPricing from "@/components/pricing/PlansAndPricing";
// import { Button } from "react-bootstrap"

export default function D1PricingPlanHome() {

  const userPlanStats = [
    { label: "Plan Name", value: "Lite Plan (Free)" },
    { label: "Plan Started", value: "Sept 26, 2025" },
    { label: "Plan Expires", value: "Sept 26, 2026" },
  ];

  return <>
    <div className="pricing-dash-heading">
      <h4>Pricing Table</h4>
      <p>Purchase plan here.</p>
    </div>

    {/*<div className="dashboard-plan-stats">

      {
        userPlanStats.map((item, key: number) => {
          return <div className="plan-stats-item" key={`item-plan-stats-${key}`}>
            <h5>{item.label}</h5>
            <h4>{item.value}</h4>
          </div>
        })
      }
      <div className="badge-active-plan">
        Active
      </div>
    </div>*/}
    <DashPlanStats
      stats={userPlanStats}
      additionalElement={
        <div className="badge-active-plan">
          Active
        </div>
      }
    />

    <PlansAndPricing className="dashboard-pricing" heading={{
      paragraph: "",
      show: true,
      title: "Pricing"
    }}
      plans={{
        month: [],
        year: []
      }}
    />

  </>
}