"use client";

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { zsettings } from '@/settings/ZSettings';
import { useAuth } from '@/ContextProvider/AuthProviderWrap';
import {
  AddTheNewSubscribtionToTheCustomer, AttachThePaymentMethodToTheCustomerDefault, createSetupIntentAction,
  // getActivePricingSubscription, 
  getStripePaymentMethods
} from '@/utils/stripe';
import {
  // IStripeSubscription, 
  useStripePlans
} from '@/ContextProvider/StripePlansProvider';
import Stripe from 'stripe';

// Initialize Stripe outside of component to avoid recreation
const stripePromise = loadStripe(zsettings.stripe.pk);

const CheckoutForm = () => {

  const {
    user
  } = useAuth();

  const {
    actualCusomerId,
    setActualCusomerId,
    newSelectedPriceId,
    setNewSelectedPriceId,
    // setActiveSubscription,
    setStripePaymentMethods,
    stripePaymentMethods
  } = useStripePlans()

  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');



  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setMessage('');
    setErrorMessage('');

    console.log("actualCusomerId for creating payment method:", actualCusomerId);

    try {
      // 1. SET INTENT
      const intent = await createSetupIntentAction(actualCusomerId);
      console.log("intent:", intent);

      // 2. USE THE SECRET TO CONFIRM
      const { setupIntent, error: stripeError } = await stripe.confirmCardSetup(intent.clientSecret as string, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            email: user?.email,
            name: user?.full_name,
          },
        },
      });



      if (stripeError) {
        setErrorMessage(stripeError.message ?? 'An error occurred');
        console.log("Error creating payment method: ", stripeError);
      } else if (setupIntent?.status === 'succeeded') {
        setMessage('Success! Card saved.');

        // 3. FINAL STEP: Use setupIntent.payment_method to start the subscription
        console.log("Use this PM ID:", setupIntent.payment_method);

        // 4. attach the payment method to the customer default 
        const attachNewPaymentMethod = await AttachThePaymentMethodToTheCustomerDefault(actualCusomerId, setupIntent.payment_method as string);
        console.log("attachNewPaymentMethod:", attachNewPaymentMethod);


        // setStripePaymentMethods([...stripePaymentMethods, setupIntent.payment_method as Stripe.PaymentMethod]);
        // now we again load the payment methods so it will set the latest added, because latest added is the default one. If the client need list of payments he will need to provide design for to do that and i will.
        const stripePaymentMethods = await getStripePaymentMethods(actualCusomerId);
        setStripePaymentMethods(stripePaymentMethods);



        /*const resultAfterSubscribtion = await AddTheNewSubscribtionToTheCustomer(actualCusomerId, newSelectedPriceId);
        console.log("resultAfterSubscribtion:", resultAfterSubscribtion);
        const getNewActiveSubscription = await getActivePricingSubscription();
        setActiveSubscription(getNewActiveSubscription.subscription as IStripeSubscription);*/


      }

    } catch (err) {
      setErrorMessage('Error creating payment method, incorect card details.');
      console.log("Error creating payment method: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stripe-billing-card-method bg-white rounded-lg  max-w-md mt-5 ">
      <h3 className="">Enter Billing Method</h3>

      <div className="mb-4 p-3 border rounded-md bg-gray-50">
        <CardElement options={{
          hidePostalCode: true,
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': { color: '#aab7c4' },
            },
            invalid: { color: '#9e2146' },
          },
        }} />
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-100 btn btn-success"
      >
        {loading ? 'Processing...' : 'Save The Payment Method'}
      </button>

      {errorMessage && <p className="mt-4 text-sm text-center font-medium text-gray-700 text-danger">{errorMessage}</p>}
      {message && <p className="mt-4 text-sm text-center font-medium text-gray-700 text-success">{message}</p>}
    </form>
  );
};


// Main Export Wrapper
export default function EnterPaymentMethodForm() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}