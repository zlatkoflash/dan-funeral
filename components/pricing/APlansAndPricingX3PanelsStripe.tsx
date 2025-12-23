"use client";

// import { useAuth } from "@/ContextProvider/AuthProviderWrap";
import { IStripeSubscription, useStripePlans } from "@/ContextProvider/StripePlansProvider";
import { Button } from "react-bootstrap";
import { redirect } from 'next/navigation';
import { AddTheNewSubscribtionToTheCustomer, createSetupIntentAction, getActivePricingSubscription, getStripeCustomer, getStripePaymentMethods } from "@/utils/stripe";
import Link from "next/link";


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

    activeSubscription,
    setActiveSubscription,

    // set_plansPeriodType
  } = useStripePlans();

  /*const {
    user
  } = useAuth();*/





  return <div className="pricing-grid-wrapper">
    <div
      className="pricing-grid"
    >

      {
        plans.map((plan) => {


          const priceId = plansPeriodType === "monthly" ? plan.monthly?.id as string : plan.yearly?.id as string;

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
                {Number(plansPeriodType === "monthly" ? plan.monthly?.unit_amount as number / 100 : plan.yearly?.unit_amount as number / 100).toFixed(0)}
              </p>
              <span className="card-period">{plansPeriodType === 'monthly' ? "/month" : "/year"}</span>
              {
                plan.metadata.save_20_percent_annual === "true"
                // plan.isAnnualDiscountAvailable 
                && (
                  <div className="discount-tag">
                    Save 20% on annual
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
            <div className="button-wrap">

              {
                /*<Button
                type="button"
                onClick={() => {
                  console.log("activeSubscription:", activeSubscription);
                  __SelectThePlan(plan.id, priceId);

                }}
                variant={priceId !== activeSubscription?.priceId ? 'success' : 'light'}
                className={`btn-select-package ${priceId === activeSubscription?.priceId ? 'disabled' : ''} ${changinPlanProcessing && plan.id === newSelectedPlanId ? 'loading' : ''}`}
              >
                Get Started
              </Button>*/
              }
              <Link href={`/Dashboard/PricingPlan/ReviewMembershipUpgrade/${plan.id}/${priceId}`} className={`btn ${priceId === activeSubscription?.priceId ? 'btn-light' : 'btn-success'} btn-select-package ${priceId === activeSubscription?.priceId ? 'disabled' : ''} ${changinPlanProcessing && plan.id === newSelectedPlanId ? 'loading' : ''}`} onClick={() => {
                setChanginPlanProcessing(true);
              }}>
                Get Started
              </Link>
            </div>

          </div>
        })
      }

    </div>
  </div>
}