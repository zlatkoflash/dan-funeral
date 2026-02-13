'use client';

import { formatDateStripeSubscribtion } from '@/utils/dates-time';
import { StripeProductWithPrices } from '@/utils/stripe';
import Stripe from 'stripe';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthUser, useAuth } from './AuthProviderWrap';

/*export interface IStripeSubscription {
  id: string;
  customerId: string;
  status: string; // e.g., 'active', 'past_due', 'canceled', 'incomplete'
  priceId: string;
  productId: string;
  planName: string;
  currentPeriodEnd: number | null;
  endedAt: number | null;
  startedAt: number;
  canceledAt: number | null;
  interval: string;
  price: Stripe.Price;
}*/

export const get_PlanStatsForActiveSubscribtion = (
  // activeSubscription: IStripeSubscription | null
  loggedUser: AuthUser
) => {
  const plan = loggedUser.plan;
  return [
    { label: "Plan Name", value: plan.plan_name },
    { label: "Plan Started", value: formatDateStripeSubscribtion(plan.startedAt) },
    { label: "Plan Expires", value: formatDateStripeSubscribtion(plan.startedAt + (plan.interval === "month" ? 30 * 24 * 60 * 60 : 365 * 24 * 60 * 60)) },
  ]
}

interface StripeContextType {
  plans: StripeProductWithPrices[];
  plansPeriodType: "month" | "year";
  set_plansPeriodType: (type: "month" | "year") => void;

  stripePaymentMethods: Stripe.PaymentMethod[];
  setStripePaymentMethods: (methods: Stripe.PaymentMethod[]) => void;

  showCreditCardForm: boolean;
  setShowCreditCardForm: (show: boolean) => void;

  changinPlanProcessing: boolean;
  setChanginPlanProcessing: (processing: boolean) => void;

  newSelectedPlanId: string,
  setNewSelectedPlanId: (planId: string) => void,

  newSelectedPriceId: string,
  setNewSelectedPriceId: (priceId: string) => void,

  actualCusomerId: string,
  setActualCusomerId: (customerId: string) => void,

  // activeSubscription: IStripeSubscription | null,
  // setActiveSubscription: (subscription: IStripeSubscription | null) => void,

  getPaymentMethod: () => Stripe.PaymentMethod | null,
}

const StripeContext = createContext<StripeContextType | undefined>(undefined);


export function StripePlansProvider({
  children,
  plans,
  // activeSubscriptionInit,
  stripePaymentMethodsInit = [],
  actualCusomerIdInit = "",
}: {
  children: React.ReactNode;
  plans: StripeProductWithPrices[];
  // activeSubscriptionInit: IStripeSubscription | null;
  stripePaymentMethodsInit?: Stripe.PaymentMethod[];
  actualCusomerIdInit?: string;
}) {

  const { user } = useAuth();

  const [plansPeriodType, set_plansPeriodType] = useState<'month' | 'year'>(

    user !== null ? user.plan.interval as 'month' | 'year' : 'month'

  );
  const [showCreditCardForm, setShowCreditCardForm] = useState<boolean>(false);
  const [changinPlanProcessing, setChanginPlanProcessing] = useState<boolean>(false);
  const [newSelectedPlanId, setNewSelectedPlanId] = useState<string>('');
  const [newSelectedPriceId, setNewSelectedPriceId] = useState<string>('');
  const [actualCusomerId, setActualCusomerId] = useState<string>(
    actualCusomerIdInit
  );
  // const [activeSubscription, setActiveSubscription] = useState<IStripeSubscription | null>(activeSubscriptionInit);
  const [stripePaymentMethods, setStripePaymentMethods] = useState<Stripe.PaymentMethod[]>(
    stripePaymentMethodsInit
    // []
  );

  const getPaymentMethod = (): Stripe.PaymentMethod | null => {
    if (stripePaymentMethods.length === 0) return null;
    // the first payment method is the default one.
    return stripePaymentMethods[0];
    // stripePaymentMethods[0].card.
  }

  useEffect(() => {

  }, [user]);

  return (
    <StripeContext.Provider value={{
      plans, plansPeriodType, set_plansPeriodType, showCreditCardForm, setShowCreditCardForm, changinPlanProcessing, setChanginPlanProcessing, newSelectedPlanId, setNewSelectedPlanId, newSelectedPriceId, setNewSelectedPriceId, actualCusomerId, setActualCusomerId,
      // activeSubscription, setActiveSubscription, 
      stripePaymentMethods, setStripePaymentMethods, getPaymentMethod
    }}>
      {children}
    </StripeContext.Provider>
  );
}

export function useStripePlans() {
  const context = useContext(StripeContext);
  if (!context) {
    throw new Error('useStripePlans must be used within a StripePlansProvider');
  }
  return context;
}