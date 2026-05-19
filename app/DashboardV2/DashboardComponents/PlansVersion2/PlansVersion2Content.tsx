"use client";

import ZSwitcher, { IZSwitcherTypeCheck } from "@/components/forms/ZSwitcher";
import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import X3Panels from "./X3Panels";
import { useStripePlans } from "@/ContextProvider/StripePlansProvider";
import { useAuth } from "@/ContextProvider/AuthProviderWrap";


export default function PlansVersion2Content() {



  const { user } = useAuth();

  const {
    // plans,
    // plansPeriodType,
    // set_plansPeriodType,
    // showCreditCardForm
  } = useStripePlans();


  const [planPeriodType, set_plansPeriodType] = useState<"monthly" | "yearly">(user?.defaultListing.plan_subscribtion_details.plan_period as "monthly" | "yearly");

  return (
    <>
      <div className="plans-and-pricing version-d2">
        <Container>
          <Row>
            <Col>

              <ZSwitcher
                id="switcher-for-plans-and-pricing-stripe"
                checked={planPeriodType === "yearly" ? 'check-2' : "check-1"}
                onChange={(v: IZSwitcherTypeCheck) => {
                  //  set_planPeriodType(v === "check-1" ? "monthly" : "yearly");
                  if (v === 'check-1') set_plansPeriodType('monthly');
                  else if (v === 'check-2') set_plansPeriodType('yearly');
                }}
              />

              <X3Panels plansPeriodType={planPeriodType} />

            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}