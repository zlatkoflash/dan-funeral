import DashboardFooter from "@/app/DashboardV2/DashboardComponents/Footer";
import DashboardHeader from "@/app/DashboardV2/DashboardComponents/Header";
import HeaderBackFeaturedRanking from "@/app/DashboardV2/DashboardComponents/HeaderBackPlanFeaturedRanking";
import FeaturedRankContent from "@/app/DashboardV2/FeaturedRanking/components/FeaturedRankContent";

export default function AddNewRankingPage() {
  return <>
    <DashboardHeader />

    <HeaderBackFeaturedRanking />

    <FeaturedRankContent leftPanelContentType="add-ranking" />

    <DashboardFooter />
  </>;
}