"use client";

import { Col, Container, Row } from "react-bootstrap";
import ZSwitcher, { IZSwitcher, IZSwitcherTypeCheck } from "../forms/ZSwitcher";
import { useState } from "react";
import PlansAndPricingX3Panels, { Plan } from "./PlansAndPricingX3Panels";
import { IHeadingTitleParagraph } from "../headings/HeadingTitleParagraph";

export interface IPlansAndPricing {
  className?: string,
  heading: IHeadingTitleParagraph,
  plans: {
    month: Plan[]
    year: Plan[]
  }
}
export default function PlansAndPricing(data: IPlansAndPricing) {

  const {
    className,
    heading,
    plans
  } = data;



  const [planPeriodType, set_planPeriodType] = useState<"month" | "year">("month");

  return <section className={`plans-and-pricing ${className}`}>
    <Container>
      <Row>
        <Col>

          <h2>{heading.title || "Plans & Pricing"}</h2>

          <ZSwitcher
            id="switcher-for-plans-and-pricing"
            checked={planPeriodType === "month" ? 'check-1' : "check-2"}
            onChange={(v: IZSwitcherTypeCheck) => {
              console.log("planPeriodType:", planPeriodType);
              set_planPeriodType(v === "check-1" ? "month" : "year");
            }}
          />

          <PlansAndPricingX3Panels planType={planPeriodType} plans={plans} />

        </Col>
      </Row>
    </Container>
  </section>
}