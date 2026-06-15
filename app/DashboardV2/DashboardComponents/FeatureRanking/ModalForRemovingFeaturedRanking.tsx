import { Button, Modal, ModalBody } from "react-bootstrap";
import icon_lock from '@/assets/images/icon-lock-white.svg';
import { IRankData } from "@/utils/interfaceListing";

export default function ModalForRemovingFeaturedRanking({ show, setShow, confirmRemoving, rankData }: { show: boolean, setShow: (show: boolean) => void, confirmRemoving: () => void, rankData: IRankData }) {
  return (
    <>
      <Modal
        show={show}
        centered
        // backdrop="static" // User cannot click outside to close
        keyboard={false} // User cannot press Esc to close
        className="modal-z modal-upgrade-plan"
        onHide={() => {
          /*dispatch(dashboardSlice.actions.setModalUpgradePlanShow({
            show: false,
            type: "unlock-leads-content"
          }));*/
          setShow(false)
        }}
      >

        <div className="header-buttons">
          {
            <button className="z-btn-close-modal" type="button" onClick={() => {
              /*dispatch(dashboardSlice.actions.setModalUpgradePlanShow({
                show: false,
                type: "unlock-leads-content"
              }));*/
              setShow(false)
            }}></button>
          }
        </div>

        <ModalBody className="p-4">
          <div className="content-inner">
            {
              /*<div className="icon">
              <img src={icon_lock.src} alt="icon_lock" />
            </div>*/
            }
            <>
              <h4>Removing Featured Ranking Item</h4>
              <p>Your Rank now is #{rankData.rank_position}</p>

              <p>Type Of Ranking: <i>{rankData.type}</i></p>
              <p>Ranking Title: <i>{rankData.title}</i></p>
              <p>Ranking Description: <i>{rankData.description}</i></p>

              <p>After removing you will need to subscribe again to get your rank back.</p>
              <p> Are you sure you want to remove this featured ranking item?</p>
            </>

          </div>
          <div className="buttons-wrap">
            <Button
              variant="light"
              onClick={() => {

                setShow(false);

              }}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {

                setShow(false);
                confirmRemoving();

              }}
            >
              Remove This Featured Ranking
            </Button>
          </div>
        </ModalBody >
      </Modal >
    </>
  )
}