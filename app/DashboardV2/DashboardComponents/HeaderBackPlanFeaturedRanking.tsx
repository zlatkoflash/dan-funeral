import Link from "next/link";
import array_back_gray from '@/assets/images/icon-arrow-back-gray.svg';
import { Col, Container, Row } from "react-bootstrap";

export default function HeaderBackFeaturedRanking() {
  return <>
    <section className="header-back">
      <Container>
        <Row>
          <Col>
            <div className="content">
              <div className="left-content">
                <Link href="/DashboardV2/PricingPlan" className="dashv2-back-btn">
                  <img src={array_back_gray.src} alt="array_back_gray" />
                  Featured Rankings
                </Link>
              </div>
              <div className="right-content"></div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  </>
}