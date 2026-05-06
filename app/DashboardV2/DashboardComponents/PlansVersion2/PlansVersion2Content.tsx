import ZSwitcher, { IZSwitcherTypeCheck } from "@/components/forms/ZSwitcher";
import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import X3Panels from "./X3Panels";
import { useStripePlans } from "@/ContextProvider/StripePlansProvider";
import { useAuth } from "@/ContextProvider/AuthProviderWrap";


export default function PlansVersion2Content() {



  const { user } = useAuth();

  const {
    plans,
    plansPeriodType,
    set_plansPeriodType,
    showCreditCardForm
  } = useStripePlans();

  return (
    <>
      <div className="plans-and-pricing version-d2">
        <Container>
          <Row>
            <Col>

              <ZSwitcher
                id="switcher-for-plans-and-pricing-stripe"
                checked={plansPeriodType === "month" ? 'check-1' : "check-2"}
                onChange={(v: IZSwitcherTypeCheck) => {
                  //  set_planPeriodType(v === "check-1" ? "monthly" : "yearly");
                  if (v === 'check-1') set_plansPeriodType('month');
                  else if (v === 'check-2') set_plansPeriodType('year');
                }}
              />

              <X3Panels />

            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}