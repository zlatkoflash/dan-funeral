"use client";

import { StripePlansProvider } from "@/ContextProvider/StripePlansProvider";
import PlansVersion2Content from "./PlansVersion2Content";
import { useEffect, useState } from "react";
import { getStripePlans, StripeProductWithPrices } from "@/utils/stripe";

export default function PlansVersion2({
  plansOut,
}: {
  plansOut?: StripeProductWithPrices[];
}) {
  const [plans, set_plans] = useState<StripeProductWithPrices[]>(
    plansOut ? plansOut : [],
  );

  useEffect(() => {
    if (plansOut) {
      // set_plans(plansOut);
      return;
    }
    const fetchPlans = async () => {
      const plans = await getStripePlans();
      console.log("Loading The plans........========");
      set_plans(plans);
    };
    fetchPlans();
  }, []);

  if (plans.length === 0) return <></>;

  return (
    <>
      <StripePlansProvider plans={plans}>
        <PlansVersion2Content />
      </StripePlansProvider>
    </>
  );
}
