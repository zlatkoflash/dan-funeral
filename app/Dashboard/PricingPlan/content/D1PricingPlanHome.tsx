'use client'

import DashPlanStats from "@/components/dashboard/DashPlanStats";
import PlansAndPricing, { IPlansAndPricing } from "@/components/pricing/PlansAndPricing";
// import SubscriptionForm from "./StripeCheckoutSubscribtionForm";
import APlansAndPricingStripe from "@/components/pricing/APlansAndPricingStripe";
import { get_PlanStatsForActiveSubscribtion, useStripePlans } from "@/ContextProvider/StripePlansProvider";
import { formatDateStripeSubscribtion } from "@/utils/dates-time";
// import { Button } from "react-bootstrap"

export default function D1PricingPlanHome() {

  const { activeSubscription } = useStripePlans();

  /*const userPlanStats = [
    { label: "Plan Name", value: activeSubscription !== null ? activeSubscription?.planName : "-" },
    { label: "Plan Started", value: activeSubscription !== null ? formatDateStripeSubscribtion(activeSubscription?.startedAt) : "-" },
    { label: "Plan Expires", value: activeSubscription !== null ? formatDateStripeSubscribtion(activeSubscription?.startedAt + (activeSubscription?.interval === "month" ? 30 * 24 * 60 * 60 : 365 * 24 * 60 * 60)) : "-" },
  ];*/

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
      stats={get_PlanStatsForActiveSubscribtion(activeSubscription)}
      additionalElement={
        <div className={`badge-active-plan ${activeSubscription !== null && activeSubscription.status !== "active" ? "error-plan" : ""}`}>
          {activeSubscription !== null ? activeSubscription?.status : "-"}
        </div>
      }
    />

    {
      /*<PlansAndPricing className="dashboard-pricing" heading={{
      paragraph: "",
      show: true,
      title: "Pricing"
    }}
      plans={{
        month: [],
        year: []
      }}
    />*/
    }
    {
      /*<PlansAndPricing className="dashboard-pricing" {...plansAndPricing} />
    */
    }
    <APlansAndPricingStripe heading={{
      paragraph: "",
      show: false,
      title: "Pricing"
    }} />



  </>
}