"use client";

import { Button } from "react-bootstrap";
import PromoCodeComponent from "./PromoCodeComponent";
import { IStripeSubscription, useStripePlans } from "@/ContextProvider/StripePlansProvider";
import { getformattedPrice } from "@/utils/prices";
import Stripe from "stripe";
import { AddTheNewSubscribtionToTheCustomer, getActivePricingSubscription, IStripePrice, IStripeProduct } from "@/utils/stripe";
import { useState } from "react";
import Link from "next/link";

export default function MemberShipPaymentBlock({ product, price }: { product: IStripeProduct, price: IStripePrice }) {

  console.log(product, price);

  const {
    activeSubscription,
    // actualCusomerId,
    // newSelectedPlanId,
    // newSelectedPriceId,
    setActiveSubscription,
    actualCusomerId,
    changinPlanProcessing,
    setChanginPlanProcessing,
  } = useStripePlans();

  const [PaymentSubscritionCompleted, setPaymentSubscritionCompleted] = useState(false);

  console.log("activeSubscription:", activeSubscription);
  // activeSubscription.

  return <div className="member-ship-payment-block">

    {
      activeSubscription && !isNaN(Number(activeSubscription.price?.unit_amount)) && (
        <div className="payment-block-price-item">
          <div className="label">Current plan</div>
          <div className="price">{activeSubscription.planName}  ({getformattedPrice(activeSubscription.price.unit_amount as number / 100)})</div>
        </div>
      )
    }
    {
      activeSubscription === null && (
        <div className="payment-block-price-item">
          <div className="label">Current plan</div>
          <div className="price">-</div>
        </div>
      )
    }

    <div className="payment-block-price-item">
      <div className="label">New plan</div>
      <div className="price">{product.name} ({getformattedPrice(price.unit_amount as number / 100)} per {price.recurring?.interval})</div>
    </div>


    <div className="payment-block-price-item">
      <div className="label">Promo code</div>
    </div>

    <PromoCodeComponent />


    <hr />

    <div className="subtotal-line">
      <div className="label">Subtotal</div>
      <div className="price">{getformattedPrice(price.unit_amount as number / 100)} / {price.recurring?.interval}</div>
    </div>

    <div className="subtotal-line">
      <div className="label">Estimated taxes</div>
      <div className="price">$0.00 / {price.recurring?.interval}</div>
    </div>

    <div className="subtotal-line final-line">
      <div className="label">Estimated total</div>
      <div className="price">{getformattedPrice(price.unit_amount as number / 100)} / {price.recurring?.interval}</div>
    </div>


    {
      !PaymentSubscritionCompleted && <Button type="button" variant="success" className={` btn-pay-now ${changinPlanProcessing ? 'loading' : ''}`} onClick={async () => {

        setChanginPlanProcessing(true);
        const resultAfterSubscribtion = await AddTheNewSubscribtionToTheCustomer(
          actualCusomerId,
          price.id,
          product,
          price
        );
        console.log("resultAfterSubscribtion:", resultAfterSubscribtion);
        const getNewActiveSubscription = await getActivePricingSubscription();
        setActiveSubscription(getNewActiveSubscription.subscription as IStripeSubscription);

        setChanginPlanProcessing(false);
        setPaymentSubscritionCompleted(true);



      }}>Pay now</Button>
    }

    {
      PaymentSubscritionCompleted && <>
        <hr />
        <div className="payment-completed-message text-success text-center mb-3">
          <h3>✅ Subscription Confirmed</h3>
          <p>You've successfully subscribed! Your dashboard is now updated with your new features. Thank you for choosing Gentleroad.</p>
        </div>
        <Link href="/Dashboard" className="btn btn-success">Redirect To Dashboard Home Page</Link>
      </>
    }


  </div>
}