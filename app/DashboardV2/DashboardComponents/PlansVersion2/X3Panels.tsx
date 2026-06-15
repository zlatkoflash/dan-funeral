"use client";

// import { useAuth } from "@/ContextProvider/AuthProviderWrap";
import {
  // IStripeSubscription, 
  useStripePlans
} from "@/ContextProvider/StripePlansProvider";
// import { AddTheNewSubscribtionToTheCustomer, createSetupIntentAction, getActivePricingSubscription, getStripeCustomer, getStripePaymentMethods } from "@/utils/stripe";
import Link from "next/link";
import { useAuth } from "@/ContextProvider/AuthProviderWrap";
import { IStripeProduct } from "@/utils/interfaceStripe";
import { prettifySlug, slugify } from "@/utils/strings";
import { useAppDispatch } from "@/redux/hooks";
import { dashboardSlice } from "@/redux/features/DashboardSlice";
import { useRouter } from "next/navigation";


// Reusable component for the feature list item
const FeatureItem: React.FC<{ text: string, isHighlighted: boolean, cutted?: boolean, bold?: boolean }> = ({ text, isHighlighted, cutted, bold }) => (
  <li className="feature-item">
    {
      /*<CheckCircle2
      className={`icon ${isHighlighted ? 'highlighted' : 'base'}`}
    />*/

    }

    <span className={`${isHighlighted ? 'text-highlighted' : 'text-base'} ${cutted === true ? 'cutted' : ''}`}>
      {
        bold ? <strong>{text}</strong> : text
      }
    </span>
  </li>
);

export default function X3Panels(
  { plansPeriodType }: {
    plansPeriodType: "monthly" | "yearly";
  }
) {

  const {
    user
  } = useAuth();

  console.log("Logged user:", user);
  // user?.defaultListing.planType==="basic"

  const {
    plans,
    // plansPeriodType,


    changinPlanProcessing,
    setChanginPlanProcessing,

    newSelectedPlanId,

  } = useStripePlans();


  const dispatch = useAppDispatch();
  const router = useRouter();


  console.log("plans:", plans);

  const showUpgradePlanButton = (planType: string) => {

    return true;

    /*if (user === null) return true;
    if (user.defaultListing.planType === "basic") return true;
    if (user.defaultListing.planType === "standard" && planType === "premium") return true;
    if (user.defaultListing.planType === "standard" && planType === "standard") return true;
    if (user.defaultListing.planType === "premium" && planType === "premium") return true;

    return false;*/
  }



  return <div className="pricing-grid-wrapper">
    <div
      className="pricing-grid"
    >

      {
        plans.map((planFor: unknown, index: number) => {

          const plan: IStripeProduct = planFor as IStripeProduct;

          console.log("plan:", plan);

          const priceId = plansPeriodType === "monthly" ? plan.monthly?.id as string : plan.yearly?.id as string;
          /*const isCurrentPlan =

            (
              user !== null && user.plan.price_id === priceId
            )
            ||
            (
              user !== null && user.defaultListing.planType === plan.metadata.plan_type
            )
            ;*/
          let isCurrentPlan = user?.defaultListing.plan_subscribtion_details.product_price_id === priceId;
          if (user?.defaultListing.planType === "basic" && plan.metadata.plan_type === "basic") {
            isCurrentPlan = true;
          }

          return <div className={`pricing-card ${index === 1 ? 'featured' : ''}`} key={plan.id}>

            {
              index === 1 && <div className="discount-tag popular">Popular</div>
            }

            {/* Header and Title */}
            <div className="card-header">
              <h2 className="card-title">{plan.name}</h2>
              <p className="card-subtitle">{plan.description}</p>
            </div>

            {/* Price Section */}
            <div className="card-price-section">
              <p className="card-price">
                <span className="dollar">$</span>
                {Number(plansPeriodType === "monthly" ? plan.monthly?.unit_amount as number / 100 : plan.yearly?.unit_amount as number / 100).toFixed(0)}
              </p>
              <span className="card-period">{plansPeriodType === 'monthly' ? "/month" : "/year"}</span>
              {
                // plan.metadata.save_20_percent_annual === "true"
                // plan.isAnnualDiscountAvailable 
                (plan.metadata.plan_type === "standard" || plan.metadata.plan_type === "premium") && plansPeriodType === "monthly"
                && (
                  <div className="discount-tag success">
                    {/*Save 20% on annual*/}
                    {
                      `Save $${

                      // Math.round((34 / 100) * 12 * (plan?.monthly?.unit_amount as number / 100))
                      plan.metadata.plan_type === "premium" ? 130 : 80

                      } with Annual`
                    }
                  </div>
                )}
            </div>

            {/* Features List */}
            <div className="flex-grow">
              <h3 className="features-heading">What's included:</h3>
              <ul role="list" className="card-features-list">
                {
                  plan.marketing_features.map((feature, index) => (
                    <FeatureItem
                      key={`${plan.id}-${index}`}
                      text={feature.name?.replace('[b]', '').replace('[-]', '') as string}
                      isHighlighted={false}
                      cutted={feature.name?.indexOf('[-]') !== -1}
                      bold={feature.name?.indexOf('[b]') !== -1}
                    />
                  ))
                }
              </ul>
            </div>

            {/* Action Button */}
            {
              // when user is logged no need for the button for the plan type basic, also when is premium no need for standard button
              (user !== null && showUpgradePlanButton(plan.metadata.plan_type)) &&


              <div className="button-wrap">
                <Link
                  // href={`/Dashboard/PricingPlan/ReviewMembershipUpgrade/${plan.id}/${priceId}`} 
                  href={`/DashboardV2/ChangePlan/${slugify(plan.name)}/${plansPeriodType === "monthly" ? "monthly" : "yearly"}`}
                  className={`btn btn-sm ${
                    // priceId === activeSubscription?.priceId 
                    // user !== null && user.plan.price_id === priceId
                    isCurrentPlan
                      ? 'btn-light disabled' : 'btn-warning'} btn-select-package  ${changinPlanProcessing && plan.id === newSelectedPlanId ? 'loading' : ''}`} onClick={(e) => {
                        // setChanginPlanProcessing(true);

                        e.preventDefault();


                        console.log("is working");

                        dispatch(dashboardSlice.actions.setModalPlansShow(false))
                        dispatch(dashboardSlice.actions.setModalShow_ProfileDetails({
                          show: false,
                          type: "my-profile"
                        }))

                        router.push(`/DashboardV2/ChangePlan/${slugify(plan.name)}/${plansPeriodType === "monthly" ? "monthly" : "yearly"}`)

                      }}>
                  {
                    // isCurrentPlan ? 'Your Current Plan' : user !== null ? `Switch to ${plan.name}` : "Get Started"
                  }
                  {
                    user !== null ?
                      (
                        isCurrentPlan ? 'Current Plan' : `Switch to ${plan.name}`
                      )
                      :
                      (
                        "Get Started"
                      )
                  }
                </Link>
              </div>
            }


          </div>
        })
      }

    </div>
  </div>
}