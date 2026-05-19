import DashboardFooter from "@/app/DashboardV2/DashboardComponents/Footer";
import DashboardHeader from "@/app/DashboardV2/DashboardComponents/Header";
import HeaderBackPlan from "@/app/DashboardV2/DashboardComponents/HeaderBackPlan";
import ConfirmationContent from "./ConfirmationContent";

export default function Confirmation() {
  return <>
    <DashboardHeader />

    <HeaderBackPlan />

    <ConfirmationContent />

    <DashboardFooter />
  </>
}