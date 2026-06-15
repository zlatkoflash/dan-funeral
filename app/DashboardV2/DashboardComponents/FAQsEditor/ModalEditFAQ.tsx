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

export default function ModalEditFAQ(
  {
    onEditFAQ,
    onCancel,
    // faqIndex,
    faqsBusiness
  }
    :
    {
      onEditFAQ: (faq: IFAQBusiness, index: number) => void;
      onCancel: () => void;
      // faqIndex: number;
      faqsBusiness: IFAQBusiness[];
    }
) {

  const dispatch = useAppDispatch();
  const dashboardState = useSelector((state: RootState) => state.dashboard);

  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  useEffect(() => {
    if (dashboardState.modalShow_EditFAQ.show) {
      const faqItem = faqsBusiness[dashboardState.modalShow_EditFAQ.faqIndex];
      if (faqItem) {
        setQuestion(faqItem.title);
        setAnswer(faqItem.answer);
      }
    }
  }, [dashboardState.modalShow_EditFAQ.show]);


  return <>
    <Modal
      show={dashboardState.modalShow_EditFAQ.show
      }
      centered
      // backdrop="static" // User cannot click outside to close
      keyboard={false} // User cannot press Esc to close
      className="modal-z modal-upgrade-plan faq-add"
      onHide={() => {
        /*dispatch(dashboardSlice.actions.setModalUpgradePlanShow({
          show: false,
          type: "unlock-leads-content"
        }));*/
        dispatch(dashboardSlice.actions.setModalShow_EditFAQ({
          show: false,
          faqIndex: -1
        }));
      }}
    >

      <div className="header-buttons">
        {
          <button className="z-btn-close-modal" type="button" onClick={() => {
            /*dispatch(dashboardSlice.actions.setModalUpgradePlanShow({
              show: false,
              type: "unlock-leads-content"
            }));*/
            dispatch(dashboardSlice.actions.setModalShow_EditFAQ({
              show: false,
              faqIndex: -1
            }));
          }}></button>
        }
      </div>

      <ModalBody className="p-4">
        <div className="content-inner">

          <div className="heading-content">
            <h4>Update Frequently Asked Question</h4>
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
              dispatch(dashboardSlice.actions.setModalShow_EditFAQ({
                show: false,
                faqIndex: -1
              }));
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
              onEditFAQ(faq, dashboardState.modalShow_EditFAQ.faqIndex);
              dispatch(dashboardSlice.actions.setModalShow_EditFAQ({
                show: false,
                faqIndex: -1
              }));
            }}
          >
            Update FAQ Item
          </Button>
        </div>
      </ModalBody>
    </Modal>
  </>
}