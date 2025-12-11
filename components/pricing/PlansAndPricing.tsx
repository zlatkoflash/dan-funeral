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

  const [planPeriodType, set_planPeriodType] = useState<"monthly" | "yearly">("monthly");

  return <section className={`plans-and-pricing ${className}`}>
    <Container>
      <Row>
        <Col>

          <h2>{heading.title || "Plans & Pricing"}</h2>

          <ZSwitcher
            id="switcher-for-plans-and-pricing"
            checked={planPeriodType === "monthly" ? 'check-1' : "check-2"}
            onChange={(v: IZSwitcherTypeCheck) => {
              set_planPeriodType(v === "check-1" ? "monthly" : "yearly");
            }}
          />

          <PlansAndPricingX3Panels planType={planPeriodType} plans={plans} />

        </Col>
      </Row>
    </Container>
  </section>
}