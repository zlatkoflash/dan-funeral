import AdminContentWrap from "@/app/Dashboard/content/AdminContentWrap";
import {
  // IStripeSubscription, 
  StripePlansProvider
} from "@/ContextProvider/StripePlansProvider";
import D1PricingPlanHome from "../../../content/D1PricingPlanHome";
import {
  // getActivePricingSubscription, 
  getPriceById, getProductById, getStripeCustomer, getStripePaymentMethods, getStripePlans, IStripePrice, IStripeProduct
} from "@/utils/stripe";
import { getApiData } from "@/utils/api";
import MemberShipInfoBlock from "./content/MemberShipInfoBlock";
import MemberShipPaymentBlock from "./content/MemberShipPaymentBlock";
import { AuthUser } from "@/ContextProvider/AuthProviderWrap";
import Stripe from "stripe";
// import { useAuth } from "@/ContextProvider/AuthProviderWrap";

export default async function ReviewMembershipUpgrade({ params }: { params: { PlanId: string, PriceId: string } }) {

  // const { user } = useAuth();
  /**
   * The Solution: "Request Memoization"
You should call your authentication function (the same one you used in layout.tsx) directly inside your page.tsx.

Don't worry about performance: Next.js uses a feature called Request Memoization. If you call getLoggedUserData() in the layout and then again in the page, WordPress is only hit once. Next.js remembers the result for the duration of that specific page load.
   */
  const loggedUserData = await getApiData<{
    ok: Boolean,
    user: AuthUser
  }>("/user/getLoggedUser", "POST", {}, "authorize");
  console.log("loggedUserData:", loggedUserData);

  const { PlanId, PriceId } = await params;
  console.log("PlanId:", PlanId);
  console.log("PriceId:", PriceId);

  // const { user } = useAuth();
  const plansAndPricingForTheUser = await getApiData<{ ok: boolean, plans: any, userActivePlan: string }>("/pricing-and-plans/get-for-user", "POST", {}, 'authorize');
  console.log("plansAndPricingForTheUser dashboard pricing and plans:", plansAndPricingForTheUser);



  const stripePlans = await getStripePlans();
  console.log("stripePlans:", stripePlans);

  // const activePricingSubscription = await getActivePricingSubscription();
  // console.log("activePricingSubscription:", activePricingSubscription);

  const productStripe = await getProductById(PlanId);
  console.log("productStripe:", productStripe);

  const priceStripe = await getPriceById(PriceId);
  console.log("priceStripe:", priceStripe);


  const customerStripe = await getStripeCustomer(loggedUserData.user.email);
  console.log("customerStripe:", customerStripe);

  let stripePaymentMethods: Stripe.PaymentMethod[] = [];
  if (customerStripe) {
    stripePaymentMethods = await getStripePaymentMethods(customerStripe.id);
  }
  console.log("stripePaymentMethods:", stripePaymentMethods);

  const product = { ...productStripe } as IStripeProduct;
  console.log("product:", product);

  const price = { ...priceStripe } as IStripePrice;
  console.log("price:", price);

  // return null;




  return <>

    <StripePlansProvider
      plans={stripePlans}
      // activeSubscriptionInit={activePricingSubscription.exists ? activePricingSubscription.subscription as IStripeSubscription : null}
      stripePaymentMethodsInit={stripePaymentMethods}
      actualCusomerIdInit={customerStripe?.id as string}
    >
      <AdminContentWrap subHeadSearchSettings={{
        breads: null,
        title: "Review membership upgrade",
        right_content: <></>,
        back_button: {
          label: "← Back to price plans",
          link: "/Dashboard/PricingPlan",
        }
      }} haveSidebar={false}>

        <div className="wrap-review-membership-upgrade">
          {
            !product || !price ? (
              <div className="w-100 d-flex align-items-center justify-content-center">
                <div className="text-danger">
                  ❌ Product or price not found
                </div>
              </div>
            ) : (
              <>
                <MemberShipInfoBlock product={product} />
                <MemberShipPaymentBlock product={product} price={price} />
              </>
            )
          }
        </div>

      </AdminContentWrap>
    </StripePlansProvider>

  </>
}