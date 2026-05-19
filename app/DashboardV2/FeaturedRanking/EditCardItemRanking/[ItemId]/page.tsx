import DashboardFooter from "@/app/DashboardV2/DashboardComponents/Footer";
import DashboardHeader from "@/app/DashboardV2/DashboardComponents/Header";
import FeaturedRankContent from "@/app/DashboardV2/FeaturedRanking/components/FeaturedRankContent";
import HeaderBackFeaturedRanking from "@/app/DashboardV2/DashboardComponents/HeaderBackPlanFeaturedRanking";
import { getApiData } from "@/utils/api";
import { IRankData } from "@/utils/interfaceListing";

export default async function EditCardItemRanking(
  {
    params
  }
    :
    {
      params: { ItemId: string }
    }
) {

  const { ItemId } = await params;
  const initialRankData = await getApiData<{
    ok: boolean,
    item: IRankData
  }>("/listings/Ranking_GetItem", "POST", {
    ranking_id: ItemId
  }, "authorize", "application/json");

  console.log("ItemId:", ItemId);
  console.log("initialRankData:", initialRankData);

  return <>
    <DashboardHeader />

    <HeaderBackFeaturedRanking />

    <FeaturedRankContent leftPanelContentType="edit-ranking" initialRankData={initialRankData.item} />

    <DashboardFooter />
  </>;
}