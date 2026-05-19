import DashboardFooter from "@/app/DashboardV2/DashboardComponents/Footer";
import DashboardHeader from "@/app/DashboardV2/DashboardComponents/Header";
import HeaderBackPlan from "@/app/DashboardV2/DashboardComponents/HeaderBackPlan";
import ChangePlanPanel from "@/app/DashboardV2/ChangePlan/ChangePlanPanel";

export default function ChangePlan() {
  return <>
    <DashboardHeader />

    <HeaderBackPlan />

    <ChangePlanPanel />

    <DashboardFooter />
  </>
}