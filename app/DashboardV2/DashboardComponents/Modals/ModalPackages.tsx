"use client";

import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import icon_lock from "@/assets/images/icon-lock-white.svg";
import PlansVersion2 from "../PlansVersion2/PlansVersion2";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { dashboardSlice } from "@/redux/features/DashboardSlice";
import { useAuth } from "@/ContextProvider/AuthProviderWrap";
import { capitalizeFirstLetter } from "@/utils/strings";
import { getStripePlans, StripeProductWithPrices } from "@/utils/stripe";

export const ModalPackages = () => {
  // const [showModal, setShowModal] = useState(true);
  const dispatch = useAppDispatch();
  const showModal = useAppSelector((state) => state.dashboard.modalPlansShow);
  const { user } = useAuth();

  const [plans, set_plans] = useState<StripeProductWithPrices[]>([]);

  useEffect(() => {
    console.log("++++Modal for plans is loaded++++");
    const fetchPlans = async () => {
      const plans = await getStripePlans();
      console.log("Loading The plans from modal........========");
      set_plans(plans);
    };
    fetchPlans();
  }, []);
  if (user === null) return <></>;

  return (
    <>
      <Modal
        show={showModal}
        onHide={() => dispatch(dashboardSlice.actions.setModalPlansShow(false))}
        centered
        className="modal-packages modal-upgrade-plan modal-z"
      >
        <div className="header-buttons">
          {
            <button
              className="z-btn-close-modal"
              type="button"
              onClick={() => {
                /*dispatch(dashboardSlice.actions.setModalUpgradePlanShow({
              show: false,
              type: "unlock-leads-content"
            }));*/
                dispatch(dashboardSlice.actions.setModalPlansShow(false));
              }}
            ></button>
          }
        </div>
        <Modal.Body className="p-4">
          <div className="content-inner">
            <div className="icon">
              <img src={icon_lock.src} alt="icon_lock" />
            </div>
            <h4>Slot Limit Reached</h4>
            <p>
              Your{" "}
              <strong>
                {capitalizeFirstLetter(user?.defaultListing.planType)}
              </strong>{" "}
              plan includes {user?.defaultListing.counts.slots}{" "}
              {user?.defaultListing.counts.slots > 1 ? "slots" : "slot"}.
              Locations and categories draw from the same shared pool.
            </p>
          </div>

          <PlansVersion2 plansOut={plans} />
        </Modal.Body>
      </Modal>
    </>
  );
};
