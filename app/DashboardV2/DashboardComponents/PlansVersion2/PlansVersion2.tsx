"use client";

import { StripePlansProvider } from "@/ContextProvider/StripePlansProvider";
import PlansVersion2Content from "./PlansVersion2Content";
import { useEffect, useState } from "react";
import { getStripePlans, StripeProductWithPrices } from "@/utils/stripe";


export default function PlansVersion2() {

  // const [plansPeriodType, set_plansPeriodType] = useState<"month" | "year">("month");

  const [plans, set_plans] = useState<StripeProductWithPrices[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const plans = await getStripePlans();
      set_plans(plans);
    }
    fetchPlans();
  }, []);

  if (plans.length === 0) return <></>

  return (
    <>
      <StripePlansProvider
        plans={plans}
      >
        <PlansVersion2Content />
      </StripePlansProvider>
    </>
  )
}