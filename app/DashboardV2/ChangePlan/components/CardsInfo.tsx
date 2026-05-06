"use client";

import { useEffect, useState } from "react";
import CardsList from "./CardsList";
import FeaturesPaymentsSection from "./FeaturesPaymentsSection";
import AddingCardForm from "./AddingCardForm";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getDefaultPaymentMethod, getStripeCustomer, getStripePaymentMethods } from "@/utils/stripe";
import { useAuth } from "@/ContextProvider/AuthProviderWrap";
import { shopSlice } from "@/redux/features/ShopSlice";
import { I_StripeCustomer, IS_StripePaymentMethod } from "@/utils/interfaceStripe";

export default function CardsInfo() {


  const isAddingCard = useAppSelector((state) => state.shop.addingCard);

  return <>
    {
      !isAddingCard && <>
        <div className="heading">
          <h4>Card details</h4>
        </div>



        <HydratingCards />

        <CardsList />

        <hr className="card-hr" />

        <FeaturesPaymentsSection />
      </>
    }

    {
      isAddingCard && <AddingCardForm />
    }

  </>
}

function HydratingCards() {

  const { user } = useAuth();

  const dispatch = useAppDispatch();


  const __LoadThePaymentMethods = async () => {
    const stripeCustomer = await getStripeCustomer(user?.email as string) as I_StripeCustomer;
    console.log("stripeCustomer:", stripeCustomer);

    const defaultPaymentMethod = await getDefaultPaymentMethod(stripeCustomer?.id as string);
    console.log("defaultPaymentMethod:", defaultPaymentMethod);
    if (defaultPaymentMethod) {
      dispatch(shopSlice.actions.setDefaultCard(defaultPaymentMethod as IS_StripePaymentMethod));
    }

    const results = await getStripePaymentMethods(stripeCustomer?.id as string);
    console.log("results:", results);
    dispatch(shopSlice.actions.setCardsList(results as IS_StripePaymentMethod[]));
    dispatch(shopSlice.actions.setCardsAreLoading(false));
    dispatch(shopSlice.actions.setStripeCustomer(stripeCustomer));

  }

  useEffect(() => {
    __LoadThePaymentMethods()
  }, []);

  return <></>
}