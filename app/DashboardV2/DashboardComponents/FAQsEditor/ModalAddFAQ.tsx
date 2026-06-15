"use client";

import { Button, Col, Container, Modal, ModalBody, Row } from "react-bootstrap";
import icon_lock from '@/assets/images/icon-lock-white.svg';
import PlansVersion2 from "../PlansVersion2/PlansVersion2";
import TextInput from "@/components/forms/Input";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { dashboardSlice } from "@/redux/features/DashboardSlice";
import { useAppDispatch } from "@/redux/hooks";
import { IFAQBusiness } from "../../EditBusiness/components/editors/BusinessFAQsEditor";
import { useEffect, useState } from "react";

export default function ModalAddFAQ(
  {
    onAddFAQ,
    onCancel
  }
    :
    {
      onAddFAQ: (faq: IFAQBusiness) => void;
      onCancel: () => void;
    }
) {

  const dispatch = useAppDispatch();
  const dashboardState = useSelector((state: RootState) => state.dashboard);


  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");


  useEffect(() => {
    setQuestion("");
    setAnswer("");
  }, [dashboardState.modalShow_AddFAQ]);

  return <>
    <Modal
      show={dashboardState.modalShow_AddFAQ}
      centered
      // backdrop="static" // User cannot click outside to close
      keyboard={false} // User cannot press Esc to close
      className="modal-z modal-upgrade-plan faq-add"
      onHide={() => {
        /*dispatch(dashboardSlice.actions.setModalUpgradePlanShow({
          show: false,
          type: "unlock-leads-content"
        }));*/
        dispatch(dashboardSlice.actions.setModalShow_AddFAQ(false));
      }}
    >

      <div className="header-buttons">
        {
          <button className="z-btn-close-modal" type="button" onClick={() => {
            /*dispatch(dashboardSlice.actions.setModalUpgradePlanShow({
              show: false,
              type: "unlock-leads-content"
            }));*/
            dispatch(dashboardSlice.actions.setModalShow_AddFAQ(false));
          }}></button>
        }
      </div>

      <ModalBody className="p-4">
        <div className="content-inner">

          <div className="heading-content">
            <h4>Add Frequently Asked Question </h4>
          </div>

          <form onSubmit={() => { }} className="form-dashboard">
            <Container>
              <Row>
                <Col>
                  <TextInput
                    // label="Name"
                    id="question"
                    value={question}
                    onChange={(e: any) => setQuestion(e.target.value)}
                    type="text"
                    placeholder="E.g Do you offer pre planning?"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <TextInput
                    // label="Starting Price"
                    id="answer"
                    value={answer}
                    onChange={(text: string) => setAnswer(text)}
                    type="rich-text-editor"
                    placeholder="Answer"
                  />
                </Col>
              </Row>
            </Container>
          </form>

        </div>
        <div className="buttons-wrap">
          <Button
            variant="light"
            type="button"
            onClick={() => {
              dispatch(dashboardSlice.actions.setModalShow_AddFAQ(false));
              onCancel();
            }}
          >
            Cancel
          </Button>
          <Button
            variant="success"
            type="button"
            onClick={() => {
              const faq: IFAQBusiness = {
                title: question,
                answer: answer,
                order: 0
              };
              onAddFAQ(faq);
              dispatch(dashboardSlice.actions.setModalShow_AddFAQ(false));
            }}
          >
            Add
          </Button>
        </div>
      </ModalBody>
    </Modal>
  </>
}