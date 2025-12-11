/*import DashboardMainContainer from "@/components/dashboard/DashboardMainContainer";
import FooterLanding from "@/components/footers/FooterLanding";
import HeaderListingCards from "@/components/headers/HeaderListingCards";
import SubHeaderSearch from "@/components/headers/SubHeaderSearch";*/
// import DashboardContent from "./content/DashboardContent";
import C1DashboardHome from "./content/C1DashboardHome";
import AdminContentWrap from "./content/AdminContentWrap";
import { DashboardProvider } from "./DashboardProvider";
import { getApiData } from "@/utils/api";

export default async function DashboardHomePage() {


  const DashboardData = await getApiData("/dashboardGetBasicData", "POST", {}, "authorize");
  console.log("DashboardData:", DashboardData);


  return <>
    {/*<HeaderListingCards />
    <SubHeaderSearch />

    <DashboardMainContainer>
      <C1DashboardHome />
    </DashboardMainContainer>

    <FooterLanding />*/}
    <DashboardProvider menuHeaderItems={[]} menuFooterItems={[]}>
      <AdminContentWrap>
        <C1DashboardHome />
      </AdminContentWrap>
    </DashboardProvider>
  </>
}