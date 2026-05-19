import HeaderBackFeaturedRanking from "@/app/DashboardV2/DashboardComponents/HeaderBackPlanFeaturedRanking";
import DashboardFooter from "@/app/DashboardV2/DashboardComponents/Footer";
import DashboardHeader from "@/app/DashboardV2/DashboardComponents/Header";
import { Col, Container, Row } from "react-bootstrap";
import BtnPaymentSectionsSubscribeRanks from "@/app/DashboardV2/ChangePlan/components/BtnPaymentSectionsSubscribeRanks";
import CardsInfo from "../../ChangePlan/components/CardsInfo";

export default function PageRankingSubscription() {
  return <>
    <DashboardHeader />

    <HeaderBackFeaturedRanking />

    <div className="dashboard-main-container">
      <Container>
        <Row>
          <Col>
            <div className="main-wrap-chnage-plan">
              <div className="cards-content-wrap">
                <CardsInfo />
              </div>
              <div className="payment-content-wrap">

                <BtnPaymentSectionsSubscribeRanks />

              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>


    <DashboardFooter />
  </>
}