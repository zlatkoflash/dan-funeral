"use client";

import { Button, Modal, ModalBody } from "react-bootstrap";
import icon_lock from '@/assets/images/icon-lock-white.svg';
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useAppDispatch } from "@/redux/hooks";
import { shopSlice } from "@/redux/features/ShopSlice";
import { prettifySlug } from "@/utils/strings";
import { AttachThePaymentMethodToTheCustomerDefault, removeCardFromStripe } from "@/utils/stripe";
import { useState } from "react";
import { IS_StripePaymentMethod } from "@/utils/interfaceStripe";

export default function CardModalQuestionRemove() {

  const shopState = useSelector((state: RootState) => state.shop);
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { defaultCard } = shopState.creditCards;

  const ___DeleteCard = async () => {
    setError(null);
    setLoading(true);
    const results = await removeCardFromStripe(
      // shopState.stripeCustomer?.id as string,
      shopState.creditCards.modalForDeletingCard.card?.id as string
    );
    console.log("results after deleting a card:", results);

    if (results.success === true) {
      dispatch(shopSlice.actions.setModalForDeletingCard({
        show: false,
        card: shopState.creditCards.modalForDeletingCard.card,
      }));

      const newCardsList = shopState.creditCards.list.filter((card) => card.id !== shopState.creditCards.modalForDeletingCard.card?.id);
      dispatch(shopSlice.actions.setCardsList(
        newCardsList
      ));

      if (defaultCard && defaultCard.id === shopState.creditCards.modalForDeletingCard.card?.id && newCardsList.length > 0) {
        const addNewDEfaultCard = await AttachThePaymentMethodToTheCustomerDefault(
          shopState.stripeCustomer?.id as string,
          newCardsList[0].id,
        );
        console.log("addNewDEfaultCard:", addNewDEfaultCard);
        dispatch(shopSlice.actions.setDefaultCard(newCardsList[0]));
      }

    }
    else {
      setError(results.error as string || "Something went wrong, Try Again!");
    }
    setLoading(false);
  }


  return <>

    <Modal

      show={shopState.creditCards.modalForDeletingCard.show}
      centered
      // backdrop="static" // User cannot click outside to close
      keyboard={false} // User cannot press Esc to close
      className="modal-z modal-upgrade-plan"
      onHide={() => {
        /*dispatch(dashboardSlice.actions.setModalUpgradePlanShow({
          show: false,
          type: "unlock-leads-content"
        }));*/
        dispatch(shopSlice.actions.setModalForDeletingCard({
          show: false,
          card: shopState.creditCards.modalForDeletingCard.card,
        }));
      }}
    >

      <div className="header-buttons">
        {
          <button className="z-btn-close-modal" type="button" onClick={() => {


            dispatch(shopSlice.actions.setModalForDeletingCard({
              show: false,
              card: shopState.creditCards.modalForDeletingCard.card,
            }));
          }}></button>
        }
      </div>

      <ModalBody className="p-4">
        <div className="content-inner">
          <div className="icon">
            <img src={icon_lock.src} alt="icon_lock" />
          </div>
          <h4>Deleting a payment method</h4>
          <p>Removing a card may affect future automatic renewals. Are you sure you want to remove this card ( <strong>{
            prettifySlug(shopState.creditCards.modalForDeletingCard.card?.card?.brand as string)
          } **** **** **** {
              shopState.creditCards.modalForDeletingCard.card?.card?.last4
            }</strong> ) ?</p>

        </div>
        <div className="buttons-wrap">
          <Button
            variant="light"
            className={`${loading ? "loading" : ""}`}
            onClick={() => {
              dispatch(shopSlice.actions.setModalForDeletingCard({
                show: false,
                card: shopState.creditCards.modalForDeletingCard.card,
              }));
            }}
          >
            Cancel
          </Button>
          <Button
            variant="warning"
            className={`${loading ? "loading" : ""}`}
            onClick={() => {

              ___DeleteCard();

            }}
          >
            Delete Card
          </Button>
        </div>

        {
          error !== null && <div className="error-message">
            <p className="text-danger p-4">{error}</p>
          </div>
        }
      </ModalBody>
    </Modal >

  </>
}