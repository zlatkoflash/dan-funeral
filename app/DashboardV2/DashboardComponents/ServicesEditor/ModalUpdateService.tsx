"use client";

import { Button, Col, Container, Modal, ModalBody, Row } from "react-bootstrap";
import icon_lock from '@/assets/images/icon-lock-white.svg';
import PlansVersion2 from "../PlansVersion2/PlansVersion2";
import TextInput from "@/components/forms/Input";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { dashboardSlice } from "@/redux/features/DashboardSlice";
import { useEffect, useState } from "react";
import { useAuth } from "@/ContextProvider/AuthProviderWrap";
import { getApiData } from "@/utils/api";
import { IOtherService } from "./ServicesEditor";

export default function ModalUpdateService({
  onAfterEditService,
  services
}: {
  onAfterEditService: (newService: IOtherService, index: number) => void,
  services: IOtherService[]
}) {

  const { user } = useAuth();

  if (!user) return <></>

  const dispatch = useDispatch();
  const dashboardState = useSelector((state: RootState) => state.dashboard);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [name, setName] = useState<string>("");
  const [startingPrice, setStartingPrice] = useState<string>("");


  const updateService = () => {
    const updatedService: IOtherService = {
      title: name,
      price: Number(startingPrice),
      order: 666
    };
    onAfterEditService(updatedService, dashboardState.modalShow_EditService.serviceIndex);
    dispatch(dashboardSlice.actions.setModalShow_EditService({ show: false, serviceIndex: -1 }));
    setName("");
    setStartingPrice("");
  }

  useEffect(() => {
    if (dashboardState.modalShow_EditService.show) {
      setName(services[dashboardState.modalShow_EditService.serviceIndex].title);
      setStartingPrice(services[dashboardState.modalShow_EditService.serviceIndex].price.toString());
    }
  }, [dashboardState.modalShow_EditService.show]);

  return <>
    <Modal
      show={dashboardState.modalShow_EditService.show}
      centered
      // backdrop="static" // User cannot click outside to close
      keyboard={false} // User cannot press Esc to close
      className="modal-z modal-upgrade-plan"
      onHide={() => {

        dispatch(dashboardSlice.actions.setModalShow_EditService({ show: false, serviceIndex: -1 }));
      }}
    >

      <div className="header-buttons">
        {
          <button className="z-btn-close-modal" type="button" onClick={() => {

            dispatch(dashboardSlice.actions.setModalShow_EditService({ show: false, serviceIndex: -1 }));
          }}></button>
        }
      </div>

      <ModalBody className="p-4">
        <div className="content-inner">


          <div className="heading-content">
            <h4>Update Service</h4>
          </div>

          <form onSubmit={() => { }} className="form-dashboard">
            <Container>
              <Row>
                <Col>
                  <TextInput
                    // label="Name"
                    id="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                    }}
                    type="text"
                    placeholder="Name"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <TextInput
                    // label="Starting Price"
                    id="starting-price"
                    value={startingPrice}
                    onChange={(e) => {
                      setStartingPrice(e.target.value)
                    }}
                    type="text"
                    placeholder="Eg. Starting Price: $1,000"
                  />
                </Col>
              </Row>
            </Container>
          </form>

        </div>
        {
          error !== "" ?
            <p className="text-error text-center">{error}</p>
            : null
        }
        <div className="buttons-wrap">
          <Button
            variant="light"
            type="button"
            className={loading ? "loading" : ""}
            onClick={() => {
              dispatch(dashboardSlice.actions.setModalShow_EditService({ show: false, serviceIndex: -1 }));
            }}
          >
            Cancel
          </Button>
          <Button
            variant="success"
            className={loading ? "loading" : ""}
            onClick={() => {
              // addNewService()
              updateService()

            }}
          >
            Update The Service
          </Button>
        </div>
      </ModalBody>
    </Modal>
  </>
}