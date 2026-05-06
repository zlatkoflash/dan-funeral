import DashboardFooter from "@/app/DashboardV2/DashboardComponents/Footer";
import DashboardHeader from "@/app/DashboardV2/DashboardComponents/Header";
import HeaderBack from "@/app/DashboardV2/DashboardComponents/HeaderBack";
import { Col, Container, Row } from "react-bootstrap";
import PlansVersion2 from "../DashboardComponents/PlansVersion2/PlansVersion2";

export default function PricingPlan() {
  return <>
    <DashboardHeader />

    <HeaderBack />

    <div className="business-editor-wrap">
      <Container>
        <Row>
          <Col>
            <div className="tab-pane-wrapper-">
              <PlansVersion2 />
            </div>
          </Col>
        </Row>
      </Container>
    </div>

    <DashboardFooter />
  </>
}