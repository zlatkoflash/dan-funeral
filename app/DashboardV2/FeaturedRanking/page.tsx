import DashboardFooter from "@/app/DashboardV2/DashboardComponents/Footer";
import DashboardHeader from "@/app/DashboardV2/DashboardComponents/Header";
import HeaderBack from "@/app/DashboardV2/DashboardComponents/HeaderBack";
import FeaturedRankContent from "./components/FeaturedRankContent";

export default function FeaturedRanking() {
  return <>
    <DashboardHeader />

    <HeaderBack />

    <FeaturedRankContent />

    <DashboardFooter />
  </>;
}