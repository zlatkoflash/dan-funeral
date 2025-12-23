import { Col, Container, Row } from "react-bootstrap";
import DashboardSidebar from "./DashboardSidebar";

export default function DashboardMainContainer({ children, haveSidebar = true }: { children: React.ReactNode, haveSidebar?: boolean }) {
  return <section className="dashboard-main-container">
    <Container>
      <Row>
        <Col className="content-wrap">
          {haveSidebar && <DashboardSidebar />}
          <div className={`content-admin ${haveSidebar ? "" : "content-admin-full-width"}`}>{children}</div>
        </Col>
      </Row>
    </Container>
  </section>
}