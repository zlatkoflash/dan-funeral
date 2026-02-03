/*import DashboardMainContainer from "@/components/dashboard/DashboardMainContainer";
import FooterLanding from "@/components/footers/FooterLanding";
import HeaderListingCards from "@/components/headers/HeaderListingCards";
import SubHeaderSearch from "@/components/headers/SubHeaderSearch";*/
// import DashboardContent from "./content/DashboardContent";
import C1DashboardHome from "./content/C1DashboardHome";
import AdminContentWrap from "./content/AdminContentWrap";
import { DashboardProvider } from "./DashboardProvider";
import { getApiData } from "@/utils/api";
import FormSearch from "@/components/forms/ReadyForms/FormSearch";
import {
  // getActivePricingSubscription, 
  getStripePlans

} from "@/utils/stripe";
import {
  // IStripeSubscription, 
  StripePlansProvider
} from "@/ContextProvider/StripePlansProvider";

export default async function DashboardHomePage() {

  const stripePlans = await getStripePlans();
  console.log("stripePlans:", stripePlans);

  // const activePricingSubscription = await getActivePricingSubscription();
  // console.log("activePricingSubscription:", activePricingSubscription);


  return <>

    <StripePlansProvider plans={stripePlans}
    // activeSubscriptionInit={activePricingSubscription.exists ? activePricingSubscription.subscription as IStripeSubscription : null}
    >
      <AdminContentWrap subHeadSearchSettings={{
        breads: [
          {
            label: "Home",
            link: "/",
          },
          {
            label: "Dashboard",
            link: "",
          },
        ],
        title: "Dashboard",
        right_content: <FormSearch buttonSearchType="btn-text" />
      }}>
        <C1DashboardHome />
      </AdminContentWrap>
    </StripePlansProvider>
  </>
}