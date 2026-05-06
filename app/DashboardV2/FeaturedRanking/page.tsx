import DashboardFooter from "../DashboardComponents/Footer";
import DashboardHeader from "../DashboardComponents/Header";
import HeaderBackFeaturedRanking from "../DashboardComponents/HeaderBackPlanFeaturedRanking";
import FeaturedRankContent from "./components/FeaturedRankContent";

export default function FeaturedRanking() {
  return <>
    <DashboardHeader />

    <HeaderBackFeaturedRanking />

    <FeaturedRankContent />

    <DashboardFooter />
  </>;
}