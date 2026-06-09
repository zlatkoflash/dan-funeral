"use client";

import { Button, Col, Container, Modal, ModalBody, Row } from "react-bootstrap";
import icon_lock from '@/assets/images/icon-lock-white.svg';
import PlansVersion2 from "../PlansVersion2/PlansVersion2";
import TextInput from "@/components/forms/Input";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { dashboardSlice } from "@/redux/features/DashboardSlice";
import { useState } from "react";
import { useAuth } from "@/ContextProvider/AuthProviderWrap";
import { getApiData } from "@/utils/api";
import { IOtherService } from "./ServicesEditor";

export default function ModalAddService({
  onAfterAddService
}: {
  onAfterAddService: (newService: IOtherService) => void
}) {

  const { user } = useAuth();

  if (!user) return <></>

  const dispatch = useDispatch();
  const dashboardState = useSelector((state: RootState) => state.dashboard);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [name, setName] = useState<string>("");
  const [startingPrice, setStartingPrice] = useState<string>("");


  /*const addNewService = async () => {
    setLoading(true);
    setError("");

    const new_service: IOtherService = {
      title: name,
      price: Number(startingPrice),
      order: 666
    };

    const results = await getApiData<{
      ok: boolean,
      message: string,
      // service: IOtherService[]
    }>("/listings/ADD_OtherService", "POST", {
      listing_id: user?.defaultListing.id,
      new_service: new_service
    }, "authorize", "application/json");

    console.log("results After adding service:", results);

    if (!results.ok) {
      setError(results?.message || "Failed to add service");
    }
    else {
      setName("");
      setStartingPrice("");
      dispatch(dashboardSlice.actions.setModalShow_AddService(false));
      onAfterAddService(new_service)
    }

    setLoading(false);
  }*/
  const addNewService = () => {
    const new_service: IOtherService = {
      title: name,
      price: Number(startingPrice),
      order: 666
    };
    onAfterAddService(new_service);
    dispatch(dashboardSlice.actions.setModalShow_AddService(false));
    setName("");
    setStartingPrice("");
  }

  return <>
    <Modal
      show={dashboardState.modalShow_AddService}
      centered
      // backdrop="static" // User cannot click outside to close
      keyboard={false} // User cannot press Esc to close
      className="modal-z modal-upgrade-plan"
      onHide={() => {

        dispatch(dashboardSlice.actions.setModalShow_AddService(false));
      }}
    >

      <div className="header-buttons">
        {
          <button className="z-btn-close-modal" type="button" onClick={() => {

            dispatch(dashboardSlice.actions.setModalShow_AddService(false));
          }}></button>
        }
      </div>

      <ModalBody className="p-4">
        <div className="content-inner">


          <div className="heading-content">
            <h4>Add Services & Prices</h4>
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
              dispatch(dashboardSlice.actions.setModalShow_AddService(false));
            }}
          >
            Cancel
          </Button>
          <Button
            variant="success"
            className={loading ? "loading" : ""}
            onClick={() => {
              // addNewService()
              addNewService()

            }}
          >
            Add
          </Button>
        </div>
      </ModalBody>
    </Modal>
  </>
}