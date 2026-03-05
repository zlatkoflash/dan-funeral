"use client"

import Image from "next/image";
import icon_master_card from "@/assets/images/icon-master-card.svg"
import Link from "next/link";
import EnterPaymentMethodForm from "@/app/Dashboard/PricingPlan/content/StripeCheckoutSubscribtionForm";
import { useStripePlans } from "@/ContextProvider/StripePlansProvider";
import { IStripeProduct } from "@/utils/stripe";

export default function MemberShipInfoBlock({ product }: { product: IStripeProduct }) {

  const {
    stripePaymentMethods,
    getPaymentMethod,
    showCreditCardForm,
    setShowCreditCardForm,
  } = useStripePlans();

  console.log("getPaymentMethod():", getPaymentMethod());

  return <div className="member-ship-info-block">

    <div className="info-heading">
      <h5>Today's payment</h5>
      <p>You’ll pay with your primary billing method.</p>
    </div>

    {
      // getPaymentMethod()?.card.
    }
    <div className="master-card">
      {
        getPaymentMethod() !== null && showCreditCardForm !== true &&
        <div className="card-number">
          {
            // <Image src={icon_master_card} alt="master-card" />
          }
          💳 {getPaymentMethod()?.card?.brand.toUpperCase()} ending in {getPaymentMethod()?.card?.last4
            // getPaymentMethod()?.card?
          }
        </div>

      }
      <Link className="back-button-for-sub-header-search" href={"/Dashboard/PricingPlan"} onClick={(e) => {
        e.preventDefault();
        setShowCreditCardForm(true);
      }}>← Change primary billing method</Link>
    </div>
    {
      (getPaymentMethod() === null || showCreditCardForm === true) && <>

        <EnterPaymentMethodForm />
        {
          getPaymentMethod() !== null && <div className="mt-2">

            <Link className="back-button-for-sub-header-search" href={"/Dashboard/PricingPlan"} onClick={(e) => {
              e.preventDefault();
              setShowCreditCardForm(false);
            }}>← Back</Link>
          </div>
        }
      </>
    }


    <hr />

    <div className="pricing-grid-wrapper">
      <h3 className="features-heading">What's included:</h3>
      <ul role="list" className="card-features-list">
        {
          /*<li className="feature-item"><span className="text-base ">Locations, 1</span></li>
          <li className="feature-item"><span className="text-base cutted">Additional Listings</span></li>*/
        }
        {
          product.marketing_features.map((feature, index) => {
            const TextFor = feature.name?.replace("[-]", "").replace("[b]", "");
            return <li key={`marketing_feature_${index}`} className="feature-item">
              <span className={`text-base ${feature.name?.indexOf("[b]") !== -1 ? "font-bold" : ""} ${feature.name?.indexOf("[-]") !== -1 ? "cutted" : ""}`}>
                {
                  //  TextFor
                }
                {
                  feature.name?.indexOf("[b]") !== -1 ?
                    <strong>{TextFor}</strong>
                    :
                    TextFor
                }
              </span></li>
          })
        }
      </ul>
    </div>

  </div>
}