import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";


import bgForPricingTable from './../../assets/images/bgForPricingTable.jpg';

export default function FeaturedPlacement() {
  return <section className="featured-placement">
    <Container>
      <Row>
        <Col>

          <div className="heading-content">
            <h3>Featured Placement</h3>
            <h4>(<span>Purchased Quarterly</span>)</h4>
          </div>

          <div className="pricing-table">

            <div className="image-background">
              <Image src={bgForPricingTable} alt="Pricing Table" />
            </div>

            <div className="pricing-table-wrap">
              <div className="data-row header-row">
                <div className="header-cell">Placement Type</div>
                <div className="header-cell">Benefit</div>
                <div className="header-cell cell-price">Price (Monthly)</div>
              </div>

              <div className="data-row">
                <div className="data-cell">Featured Placement (Rank 1)</div>
                <div className="data-cell">Top-most position for a chosen City or Category search.</div>
                <div className="data-cell cell-price">$100</div>
              </div>

              <div className="data-row">
                <div className="data-cell">Featured Placement (Rank 2)</div>
                <div className="data-cell">Second position for a chosen City or Category search.</div>
                <div className="data-cell cell-price">$63</div>
              </div>

              <div className="data-row">
                <div className="data-cell">Featured Placement (Rank 3)</div>
                <div className="data-cell">Third position for a chosen City or Category search.</div>
                <div className="data-cell cell-price">$30</div>
              </div>
            </div>

          </div>

        </Col>
      </Row>
    </Container>
  </section>
}