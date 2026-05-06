import { Col, Container, Row } from "react-bootstrap";

export default function DashboardFooter() {
  return (
    <>
      <footer className="dashboard-footer">
        <Container>
          <Row>
            <Col>
              <div className="copyright-text-footer-dashboard">Copyright © 2026 Gentle Road. All rights reserved</div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  )
}