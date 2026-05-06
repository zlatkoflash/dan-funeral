"use client";

import { Button } from "react-bootstrap";
import icon_delete from '@/assets/images/icon-delete-green.svg';
import icon_mastercard from '@/assets/images/icon-master-card-v2.svg';
import { useState } from "react";
import AddingCardForm from "./AddingCardForm";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { shopSlice } from "@/redux/features/ShopSlice";
import { IS_StripePaymentMethod } from "@/utils/interfaceStripe";
import { prettifySlug } from "@/utils/strings";
import CardModalQuestionRemove from "./CardModalQuestionRemove";
import { AttachThePaymentMethodToTheCustomerDefault } from "@/utils/stripe";

export default function CardsList() {


  const dispatch = useAppDispatch();

  const cards = useAppSelector((state) => state.shop.creditCards.list);
  const cardsAreLoading = useAppSelector((state) => state.shop.creditCards.areLoading);
  const defaultCard = useAppSelector((state) => state.shop.creditCards.defaultCard);
  const stripeCustomer = useAppSelector((state) => state.shop.stripeCustomer);

  const [loading, setLoading] = useState<boolean>(false);
  const [lastClickedCard, setLastClickedCard] = useState<string | null>(null);

  return <>
    <div className="cards-wrap">

      {
        cardsAreLoading && <div className="loading-the-cards">
          <div className="card">
            <div className="card-content">
              <div className="card-header-left">
                <div className="card-header-left-content">
                  <p>Loading cards...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      }



      {
        !cardsAreLoading &&
        <>
          {
            cards.map((card: IS_StripePaymentMethod, index: number) => {
              return <div className={`card ${defaultCard !== null && defaultCard?.id === card.id ? 'default-card' : ''}`} key={index}>
                <div className="card-content">
                  <div className="card-header-left">
                    <div className="card-header-left-icon">
                      <img src={icon_mastercard.src} alt="card-icon" />
                    </div>
                    <div className="card-header-left-content">
                      <p>
                        {prettifySlug(card.card.brand)} ending in {card.card.last4}
                        {
                          defaultCard !== null && defaultCard?.id === card.id && <span className="default-card">Default Card</span>
                        }
                      </p>

                    </div>
                  </div>
                  <div className="card-header-right">

                    {
                      defaultCard !== null && defaultCard?.id === card.id ?
                        null : <Button type="button" variant="light" className={`btn-circle-icon now-for-text ${loading && lastClickedCard === card.id ? "loading" : ""}`} onClick={async () => {
                          setLoading(true);
                          setLastClickedCard(card.id);
                          const attachPaymentMethodResult = await AttachThePaymentMethodToTheCustomerDefault(
                            stripeCustomer?.id as string,
                            card.id,
                          );
                          console.log("attachPaymentMethodResult:", attachPaymentMethodResult);

                          dispatch(shopSlice.actions.setDefaultCard(card));
                          setLoading(false);
                        }}>
                          Set Default
                        </Button>
                    }

                    <Button type="button" variant="light" className="btn-circle-icon" onClick={() => {

                      dispatch(shopSlice.actions.setModalForDeletingCard({
                        show: true,
                        card: card,
                      }));

                    }}>
                      <img src={icon_delete.src} alt="icon-delete" />
                    </Button>

                  </div>
                </div>
              </div>
            })
          }
        </>
      }

      <div className="card">
        <div className="card-content">
          <div className="card-header-left">
            <div className="card-header-left-content">
              {
                !cardsAreLoading && cards.length == 0 && <p>No Credit Cards Listed</p>
              }
              <p>Add a card to manage your Gentle Road subscriptions.</p>
            </div>
          </div>
          <div className="card-header-right">
            <Button type="button" variant="success" className="add-new-card-btn w-100" onClick={() => {
              // setIsAddingCard(true)
              dispatch(shopSlice.actions.setAddingCard(true));
            }}>+ Add Payment Method</Button>
          </div>
        </div>
      </div>

    </div>


    <CardModalQuestionRemove />

  </>
}