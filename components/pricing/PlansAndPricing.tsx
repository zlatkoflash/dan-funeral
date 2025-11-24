"use client";

import { Col, Container, Row } from "react-bootstrap";
import ZSwitcher, { IZSwitcher, IZSwitcherTypeCheck } from "../forms/ZSwitcher";
import { useState } from "react";

export default function PlansAndPricing() {

  const [planPeriodType, set_planPeriodType] = useState<"monthly" | "yearly">("monthly");

  return <section className="plans-and-pricing">
    <Container>
      <Row>
        <Col>

          <h2>Plans & Pricing</h2>

          <ZSwitcher
            id="switcher-for-plans-and-pricing"
            checked={planPeriodType === "monthly" ? 'check-1' : "check-2"}
            onChange={(v: IZSwitcherTypeCheck) => {
              set_planPeriodType(v === "check-1" ? "monthly" : "yearly");
            }}
          />

        </Col>
      </Row>
    </Container>
  </section>
}