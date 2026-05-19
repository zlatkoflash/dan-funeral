"use client";

import { Col, Container, Row } from "react-bootstrap";
import confirmation_stars from "@/assets/images/the-stars.png";
import icon_green_check from "@/assets/images/icon-circle-check-green.svg";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IStripeProduct } from "@/utils/stripe";
import { useAuth } from "@/ContextProvider/AuthProviderWrap";
import { prettifySlug } from "@/utils/strings";


export default function ConfirmationContentForRanking() {


  const {
    user
  } = useAuth();

  if (user === null) return <></>;

  return <>
    <div className="business-editor-wrap">

      <Container>
        <Row>
          <Col>
            <div className="business-editor-content">
              <div className="tab-pane-wrapper">
                <div className="panel-content-wrap">
                  <div className="confirmation-stars-panel">
                    <img src={confirmation_stars.src} className="the-stars" alt="confirmation Plan" />

                    <div className="check-circle">
                      <img src={icon_green_check.src} alt="icon green check" />
                    </div>

                    <div className="the-content">
                      <h1>Thank you</h1>
                      <p>Your Ranking Plan Subscription has been updated. A receipt has been sent to your email. Thank you for choosing us to help scale your business.</p>
                    </div>

                    <div className="buttons-footer">
                      <Link href="/DashboardV2" className="btn btn-success">Go to Home</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

    </div>
  </>
}