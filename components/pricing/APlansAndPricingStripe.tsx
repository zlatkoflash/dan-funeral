"use client";

import { Col, Container, Row } from "react-bootstrap";
import { IHeadingTitleParagraph } from "../headings/HeadingTitleParagraph";
import ZSwitcher, { IZSwitcherTypeCheck } from "../forms/ZSwitcher";
import { useState } from "react";
import APlansAndPricingX3PanelsStripe from "./APlansAndPricingX3PanelsStripe";
import { useStripePlans } from "@/ContextProvider/StripePlansProvider";
// import EnterPaymentMethodForm from "@/app/Dashboard/PricingPlan/content/StripeCheckoutSubscribtionForm";
import { useAuth } from "@/ContextProvider/AuthProviderWrap";

export default function APlansAndPricingStripe({
  heading
}: {
  heading: IHeadingTitleParagraph
}) {

  const { user } = useAuth();

  const {
    plans,
    plansPeriodType,
    set_plansPeriodType,
    showCreditCardForm
  } = useStripePlans();

  // const [planPeriodType, set_planPeriodType] = useState<"monthly" | "yearly">("monthly");

  return <div className="plans-and-pricing">
    <Container>
      <Row>
        <Col>
          {heading.show && <h2>{heading.title || "Plans & Pricing"}</h2>}

          <ZSwitcher
            id="switcher-for-plans-and-pricing-stripe"
            checked={plansPeriodType === "monthly" ? 'check-1' : "check-2"}
            onChange={(v: IZSwitcherTypeCheck) => {
              //  set_planPeriodType(v === "check-1" ? "monthly" : "yearly");
              if (v === 'check-1') set_plansPeriodType('monthly');
              else if (v === 'check-2') set_plansPeriodType('yearly');
            }}
          />

          <APlansAndPricingX3PanelsStripe />

          {
            //showCreditCardForm && <EnterPaymentMethodForm />
          }

        </Col>
      </Row>
    </Container>
  </div>
}