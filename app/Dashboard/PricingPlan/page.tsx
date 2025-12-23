
import { getActivePricingSubscription, getStripePlans } from "@/utils/stripe";
import AdminContentWrap from "../content/AdminContentWrap";
import D1PricingPlanHome from "./content/D1PricingPlanHome";
import { getApiData } from "@/utils/api";
// import { zsettings } from "@/settings/ZSettings";
import { IStripeSubscription, StripePlansProvider } from "@/ContextProvider/StripePlansProvider";
import FormSearch from "@/components/forms/ReadyForms/FormSearch";
// import { useAuth } from "@/ContextProvider/AuthProviderWrap";

export default async function DashboardPricingPlan() {

  // const { user } = useAuth();
  const plansAndPricingForTheUser = await getApiData<{ ok: boolean, plans: any, userActivePlan: string }>("/pricing-and-plans/get-for-user", "POST", {}, 'authorize');
  console.log("plansAndPricingForTheUser dashboard pricing and plans:", plansAndPricingForTheUser);



  const stripePlans = await getStripePlans();
  console.log("stripePlans:", stripePlans);

  const activePricingSubscription = await getActivePricingSubscription();
  console.log("activePricingSubscription:", activePricingSubscription);


  return <>

    <StripePlansProvider
      plans={stripePlans} activeSubscriptionInit={activePricingSubscription.exists ? activePricingSubscription.subscription as IStripeSubscription : null}>
      <AdminContentWrap subHeadSearchSettings={{
        breads: [
          {
            label: "Home",
            link: "/",
          },
          {
            label: "Dashboard",
            link: "/Dashboard",
          },
          {
            label: "Pricing Plan",
            link: "",
          },
        ],
        title: "Pricing Plan",
        right_content: <FormSearch buttonSearchType="btn-text" />
      }}>
        {
          // <C1DashboardHome />
        }
        <D1PricingPlanHome

        /*plansAndPricing={{
          heading: {
            title: "Pricing",
            paragraph: "",
            show: true
          },
          plans: plansAndPricingForTheUser.plans
        }}*/
        />
      </AdminContentWrap>
    </StripePlansProvider>

  </>
}