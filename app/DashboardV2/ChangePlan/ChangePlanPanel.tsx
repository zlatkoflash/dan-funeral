"use client";

import { Col, Container, Row } from "react-bootstrap";
import CardsList from "./components/CardsList";
import FeaturesPaymentsSection from "./components/FeaturesPaymentsSection";
import BtnPaymentSections from "./components/BtnPaymentSections";
import { useState } from "react";
import AddingCardForm from "./components/AddingCardForm";
import CardsInfo from "./components/CardsInfo";

export default function ChangePlanPanel() {


  return <>
    <div className="dashboard-main-container">
      <Container>
        <Row>
          <Col>
            <div className="main-wrap-chnage-plan">
              <div className="cards-content-wrap">
                <CardsInfo />
              </div>
              <div className="payment-content-wrap">

                <BtnPaymentSections />

              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  </>
}