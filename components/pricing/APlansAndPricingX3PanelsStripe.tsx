"use client";

// import { useAuth } from "@/ContextProvider/AuthProviderWrap";
import {
  // IStripeSubscription, 
  useStripePlans
} from "@/ContextProvider/StripePlansProvider";
import { Button } from "react-bootstrap";
import { redirect } from 'next/navigation';
// import { AddTheNewSubscribtionToTheCustomer, createSetupIntentAction, getActivePricingSubscription, getStripeCustomer, getStripePaymentMethods } from "@/utils/stripe";
import Link from "next/link";
import { useAuth } from "@/ContextProvider/AuthProviderWrap";


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

export default function APlansAndPricingX3PanelsStripe() {

  const {
    user
  } = useAuth();

  const {
    plans,
    plansPeriodType,

    showCreditCardForm,
    setShowCreditCardForm,

    changinPlanProcessing,
    setChanginPlanProcessing,

    newSelectedPlanId,
    setNewSelectedPlanId,

    actualCusomerId,
    setActualCusomerId,

    newSelectedPriceId,
    setNewSelectedPriceId,

    // activeSubscription,
    // setActiveSubscription,

    // set_plansPeriodType
  } = useStripePlans();

  /*const {
    user
  } = useAuth();*/



  console.log("plans:", plans);



  return <div className="pricing-grid-wrapper">
    <div
      className="pricing-grid"
    >

      {
        plans.map((plan) => {


          const priceId = plansPeriodType === "month" ? plan.monthly?.id as string : plan.yearly?.id as string;
          const isCurrentPlan = user !== null && user.plan.price_id === priceId;

          return <div className="pricing-card" key={plan.id}>

            {/* Header and Title */}
            <div className="card-header">
              <h2 className="card-title">{plan.name}</h2>
              <p className="card-subtitle">{plan.description}</p>
            </div>

            {/* Price Section */}
            <div className="card-price-section">
              <p className="card-price">
                <span className="dollar">$</span>
                {Number(plansPeriodType === "month" ? plan.monthly?.unit_amount as number / 100 : plan.yearly?.unit_amount as number / 100).toFixed(0)}
              </p>
              <span className="card-period">{plansPeriodType === 'month' ? "/month" : "/year"}</span>
              {
                // plan.metadata.save_20_percent_annual === "true"
                // plan.isAnnualDiscountAvailable 
                (plan.metadata.plan_type === "standard" || plan.metadata.plan_type === "premium") && plansPeriodType === "month"
                && (
                  <div className="discount-tag">
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
              user !== null &&
              /*
              (
              plan.metadata.plan_type === "basic"
              || (
                user.plan.plan_type === "premium"
                && plan.metadata.plan_type === "standard"
              )
            ) ? <></>
              :*/
              <div className="button-wrap">
                <Link href={`/Dashboard/PricingPlan/ReviewMembershipUpgrade/${plan.id}/${priceId}`} className={`btn ${
                  // priceId === activeSubscription?.priceId 
                  // user !== null && user.plan.price_id === priceId
                  isCurrentPlan
                    ? 'btn-light disabled' : 'btn-success'} btn-select-package  ${changinPlanProcessing && plan.id === newSelectedPlanId ? 'loading' : ''}`} onClick={() => {
                      setChanginPlanProcessing(true);
                    }}>
                  {
                    isCurrentPlan ? 'Your Current Plan' : user !== null ? `Switch to ${plan.name}` : "Get Started"
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