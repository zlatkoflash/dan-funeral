import { Col, Container, Row } from "react-bootstrap";
import DashboardSidebar from "./DashboardSidebar";

export default function DashboardMainContainer({ children }: { children: React.ReactNode }) {
  return <section className="dashboard-main-container">
    <Container>
      <Row>
        <Col className="content-wrap">
          <DashboardSidebar />
          <div className="content-admin">{children}</div>
        </Col>
      </Row>
    </Container>
  </section>
}