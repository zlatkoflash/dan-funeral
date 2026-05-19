"use client";

import { Col, Container, Row } from "react-bootstrap";
import CardsList from "./components/CardsList";
import FeaturesPaymentsSection from "./components/FeaturesPaymentsSection";
import BtnPaymentSections from "./components/BtnPaymentSections";
import { useEffect, useState } from "react";
import AddingCardForm from "./components/AddingCardForm";
import CardsInfo from "./components/CardsInfo";
import { useAuth } from "@/ContextProvider/AuthProviderWrap";
import { IStripeProduct } from "@/utils/interfaceStripe";
import { getStripePlans } from "@/utils/stripe";
import { useParams } from "next/navigation";
import { slugify } from "@/utils/strings";
import BtnPaymentSectionsForPlan from "./components/BtnPaymentSectionsForPlan";

export default function ChangePlanPanel() {

  const { user } = useAuth();

  if (user === null) return <></>;

  const params = useParams<{ PlanSlug: string; PeriodSlug: string }>();

  // Extract slugs based on your folder naming [product_id] and [price_id]
  const PlanSlug = params.PlanSlug as string;
  const PeriodSlug = params.PeriodSlug as string;
  console.log("PlanSlug", PlanSlug);
  console.log("PeriodSlug", PeriodSlug);

  const [plans, set_plans] = useState<IStripeProduct[]>([]);
  const [planForCard, set_planForCard] = useState<{
    plan: IStripeProduct;
    period: "daily" | "weekly" | "monthly" | "yearly";
  } | null>(null);
  const fetchPlans = async () => {
    const plans: any[] = await getStripePlans();
    console.log("plans:", plans);
    set_plans(plans as IStripeProduct[]);
    // const currentPlan: IStripeProduct

    const actualyPlan: IStripeProduct | null = plans.find((plan: IStripeProduct) => slugify(plan.name) === PlanSlug) as IStripeProduct;
    console.log("actualyPlan", actualyPlan);
    set_planForCard({
      plan: actualyPlan,
      period: PeriodSlug as "daily" | "weekly" | "monthly" | "yearly",
    });
  }

  useEffect(() => {


    fetchPlans();

  }, []);

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

                {/* <BtnPaymentSections plansSubscribtions={
                  planForCard === null ? [] : [planForCard]
                } /> */}

                <BtnPaymentSectionsForPlan plansSubscribtions={
                  planForCard === null ? [] : [planForCard]
                } />

              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  </>
}