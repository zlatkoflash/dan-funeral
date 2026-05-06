"use client";

import { Button, Col, Container, Modal, ModalBody, Row } from "react-bootstrap";
import icon_lock from '@/assets/images/icon-lock-white.svg';
import PlansVersion2 from "../PlansVersion2/PlansVersion2";
import TextInput from "@/components/forms/Input";
import { useDispatch, useSelector } from "react-redux";
import { dashboardSlice } from "@/redux/features/DashboardSlice";
import { useAppDispatch } from "@/redux/hooks";
import { RootState } from "@/redux/store";

import icon_down from '@/assets/images/icon-arrow-green-down.svg';
import icon_up from '@/assets/images/icon-arrow-green-up.svg';
import { IFAQBusiness } from "../../EditBusiness/components/editors/BusinessFAQsEditor";


export default function ModalFAQsReorder(
  {
    faqs,
    onCancel,
    onUpdateOrder
  }
    :
    {
      faqs: IFAQBusiness[];
      onCancel: () => void;
      onUpdateOrder: (faq: IFAQBusiness, index: number, direction: 'up' | 'down') => void;

    }
) {

  const dispatch = useAppDispatch();
  const dashboardState = useSelector((state: RootState) => state.dashboard);


  return <>
    <Modal
      show={dashboardState.modalShow_FAQsReorder}
      centered
      // backdrop="static" // User cannot click outside to close
      keyboard={false} // User cannot press Esc to close
      className="modal-z modal-upgrade-plan faq-add"
      onHide={() => {
        /*dispatch(dashboardSlice.actions.setModalUpgradePlanShow({
          show: false,
          type: "unlock-leads-content"
        }));*/
        dispatch(dashboardSlice.actions.setModalShow_FAQsReorder(false));
      }}
    >

      <div className="header-buttons">
        {
          <button className="z-btn-close-modal" type="button" onClick={() => {
            /*dispatch(dashboardSlice.actions.setModalUpgradePlanShow({
              show: false,
              type: "unlock-leads-content"
            }));*/
            dispatch(dashboardSlice.actions.setModalShow_FAQsReorder(false));
          }}></button>
        }
      </div>

      <ModalBody className="p-4">
        <div className="content-inner">

          <div className="heading-content">
            <h4>Frequently asked question Reorder  </h4>
          </div>

          <div className="services-editor text-input-wrap">
            <div className="services-list">
              {
                faqs.map((faq, index) => (
                  <div key={index} className="service-item faq-item">
                    <div className="content-left">
                      <h4>{faq.title}</h4>
                      <div className="answer" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                    </div>
                    <div className="actions">
                      <Button variant="light" type="button" className="btn-circle-icon" onClick={(e) => {
                        e.stopPropagation();
                        onUpdateOrder(faq, index, 'up');
                      }}>
                        <img src={icon_up.src} alt="up" />
                      </Button>
                      <Button variant="light" type="button" className="btn-circle-icon" onClick={(e) => {
                        e.stopPropagation();
                        onUpdateOrder(faq, index, 'down');
                      }}>
                        <img src={icon_down.src} alt="down" />
                      </Button>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>

        </div>
        <div className="buttons-wrap">
          <Button
            variant="light"
            type="button"
            onClick={() => {
              dispatch(dashboardSlice.actions.setModalShow_FAQsReorder(false));
            }}
          >
            Done
          </Button>
          {/* <Button
            variant="success"
            onClick={() => { }}
          >
            Update The Order
          </Button> */}
        </div>
      </ModalBody>
    </Modal>
  </>
}