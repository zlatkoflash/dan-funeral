"use client";

import { dashboardSlice } from "@/redux/features/DashboardSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button, Modal, ModalBody } from "react-bootstrap";
// import { useAppSelector } from "@/redux/hooks";
import icon_lock from '@/assets/images/icon-lock-white.svg';
import { useAuth } from "@/ContextProvider/AuthProviderWrap";
import { capitalizeFirstLetter } from "@/utils/strings";

export default function ModalUpgradeThePlan() {

  const {
    user
  } = useAuth();

  if (user === null) return <></>

  const dashboardState = useAppSelector((state) => state.dashboard);
  // const 


  const handleManualRedirect = () => {
    dispatch(dashboardSlice.actions.setModalPlansShow(true));

    dispatch(dashboardSlice.actions.setModalUpgradePlanShow({
      show: false,
      type: "unlock-leads-content"
    }));
  };

  const dispatch = useAppDispatch();
  // const label = "Continue Now";

  return (
    <>
      <Modal
        show={dashboardState.modalUpgradePlan.show}
        centered
        // backdrop="static" // User cannot click outside to close
        keyboard={false} // User cannot press Esc to close
        className="modal-z modal-upgrade-plan"
        onHide={() => {
          dispatch(dashboardSlice.actions.setModalUpgradePlanShow({
            show: false,
            type: "unlock-leads-content"
          }));
        }}
      >

        <div className="header-buttons">
          {
            <button className="z-btn-close-modal" type="button" onClick={() => {
              dispatch(dashboardSlice.actions.setModalUpgradePlanShow({
                show: false,
                type: "unlock-leads-content"
              }));
            }}></button>
          }
        </div>

        <ModalBody className="p-4">
          <div className="content-inner">
            <div className="icon">
              <img src={icon_lock.src} alt="icon_lock" />
            </div>
            {
              dashboardState.modalUpgradePlan.type === "unlock-leads-content" && <><h4>Unlock Your Leads</h4>
                <p>Someone is reaching out. Upgrade to view their contact information and have future leads routed directly to your inbox.</p></>
            }
            {
              dashboardState.modalUpgradePlan.type === "photos-count-reached-content" && <><h4>Photo Limit Reached</h4>
                <p>{capitalizeFirstLetter(user.defaultListing.planType)} allows {
                  user.defaultListing.counts.photos} photos. Upgrade to showcase more of your facility and help families feel at home before they visit.</p></>
            }
            {
              dashboardState.modalUpgradePlan.type === "videos-upload-available-after-basic" && <><h4>Video Uploads Available After Basic</h4>
                <p>You're doing great! Once you upgrade to a paid plan, you'll be able to upload videos to your listing.</p></>
            }
            {
              dashboardState.modalUpgradePlan.type === "videos-count-reached-content-for-standard" && <><h4>Video Count Reached</h4>
                <p>Standard plans allow up to {user.defaultListing.counts.videos} videos. Upgrade to share even more of your facility and help families feel at home before they visit.</p></>
            }

          </div>
          <div className="buttons-wrap">
            <Button
              variant="light"
              onClick={handleManualRedirect}
            >
              Maybe later
            </Button>
            <Button
              variant="warning"
              onClick={handleManualRedirect}
            >
              Upgrade & Unlock - Learn More
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  )
}