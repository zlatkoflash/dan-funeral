import AdminContentWrap from "../content/AdminContentWrap";
import D1PricingPlanHome from "./content/D1PricingPlanHome";

export default async function DashboardPricingPlan() {
  return <>

    <AdminContentWrap>
      {
        // <C1DashboardHome />
      }
      <D1PricingPlanHome />
    </AdminContentWrap>

  </>
}