"use client";

import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { zsettings } from '@/settings/ZSettings';
import { Button, Col, Container, Row } from 'react-bootstrap';
import TextInput, { GLOBAL_STRIPE_OPTIONS } from '@/components/forms/Input';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { AttachThePaymentMethodToTheCustomerDefault, createSetupIntentAction, getStripePaymentMethods } from '@/utils/stripe';
import { useAuth } from '@/ContextProvider/AuthProviderWrap';
import { IS_StripePaymentMethod } from '@/utils/interfaceStripe';
import { shopSlice } from '@/redux/features/ShopSlice';

// Initialize Stripe outside of the component to avoid re-loading on every render
const stripePromise = loadStripe(zsettings.stripe.pk);


function AddingCardFormInputs() {


  const { user } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);

  const stripeCustomer = useAppSelector((state) => state.shop.stripeCustomer);

  const stripe = useStripe();
  const elements = useElements();

  const dispatch = useAppDispatch();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const addCard = async () => {
    // const addCardResult = await Add
    if (!stripe || !elements) return;
    setLoading(true);
    setErrorMessage(null);

    try {
      // 1. create setup intent
      const intent = await createSetupIntentAction(stripeCustomer?.id as string);

      // 2. USE THE SECRET TO CONFIRM
      const { setupIntent, error: stripeError } = await stripe.confirmCardSetup(intent.clientSecret as string, {
        payment_method: {
          card: elements.getElement(CardNumberElement)!,
          billing_details: {
            email: user?.email,
            name: user?.full_name,
            // first_name: firstName,
            // last_name: lastName,
            address: {
              line1: addressLine1,
              line2: addressLine2,
              city: city,
              postal_code: postalCode,
            },
          },
        },
      });

      console.log("setupIntent:", setupIntent);
      console.log("stripeError:", stripeError);

      if (stripeError) {
        setErrorMessage(stripeError.message as string);
      } else {
        setErrorMessage(null);
        // here we need to update the default card

        const makeDefaultPayment = await AttachThePaymentMethodToTheCustomerDefault(stripeCustomer?.id as string, setupIntent?.payment_method as string);
        console.log("makeDefaultPayment:", makeDefaultPayment);

        const cards = await getStripePaymentMethods(stripeCustomer?.id as string) as IS_StripePaymentMethod[];
        console.log("cards:", cards);

        const defaultCard = cards.find((card: IS_StripePaymentMethod) => card.id === setupIntent?.payment_method);
        console.log("defaultCard:", defaultCard);

        if (defaultCard) {
          dispatch(shopSlice.actions.setDefaultCard(defaultCard));
          dispatch(shopSlice.actions.setAddingCard(false));
          dispatch(shopSlice.actions.setCardsList(cards));
        }

      }

    } catch (error) {
      console.log("error:", error);
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }


  return <>
    <div className="heading">
      <h4>Add your card details</h4>
    </div>

    <form onSubmit={() => { }} className="form-dashboard">
      <Container>
        <Row>
          <Col md={6}>
            <TextInput
              type="text"
              label="First Name"
              placeholder="First name"
              id='first-name'
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </Col>
          <Col md={6}>
            <TextInput
              type="text"
              label="Last Name"
              placeholder="Last name"
              id='last-name'
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <TextInput
              type="text"
              label="Address Line 1"
              placeholder="Address Line 1"
              id='address-line-1'
              value={addressLine1}
              onChange={(e) => {
                setAddressLine1(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <TextInput
              type="text"
              label="City"
              placeholder="City"
              id='city'
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
          </Col>
          <Col md={6}>
            <TextInput
              type="text"
              label="Postal Code"
              placeholder="Postal Code"
              id='postal-code'
              value={postalCode}
              onChange={(e) => {
                setPostalCode(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>

            <TextInput
              type="stripe-element"
              label="Card Number"
              placeholder="Card Number"
              id='card-number'
              value={""}
              onChange={() => { }}
              stripeElement={<CardNumberElement options={{
                ...GLOBAL_STRIPE_OPTIONS
              }} />}

            />
          </Col>
        </Row>
        <Row>
          <Col>

            <TextInput
              type="stripe-element"
              label="Expiry Date"
              placeholder="Card Expiry"
              id='card-expiry'
              value={""}
              onChange={() => { }}
              stripeElement={<CardExpiryElement options={{
                ...GLOBAL_STRIPE_OPTIONS
              }} />}

            />

          </Col>
          <Col>

            <TextInput
              type="stripe-element"
              label="CVC"
              placeholder="CVC"
              id='card-cvc'
              value={""}
              onChange={() => { }}
              stripeElement={<CardCvcElement options={{
                ...GLOBAL_STRIPE_OPTIONS
              }} />}

            />
          </Col>
        </Row>
        <Row className='row-buttons'>
          <Col>
            <Button variant='light' type='button' className={loading ? 'loading' : ''} disabled={loading} onClick={() => {
              dispatch(shopSlice.actions.setAddingCard(false));
            }}>Back</Button>
            <Button variant='success' type='button' className={loading ? 'loading' : ''} disabled={loading} onClick={() => {
              addCard();
            }}>Add The Card</Button>
          </Col>
        </Row>

        {errorMessage && (
          <Row className="error-message">
            <Col>
              <p className="text-danger">{errorMessage}</p>
            </Col>
          </Row>
        )}

      </Container>
    </form>


  </>
}


export default function AddingCardForm() {
  return <>
    <Elements stripe={stripePromise}>
      <AddingCardFormInputs />
    </Elements>
  </>
}