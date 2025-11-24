import { ReactNode } from "react";
import { Col, Container, Row } from "react-bootstrap";


export interface ISidebarContent {
  sidebarContent: ReactNode,
  content: ReactNode
}

export default function ProductContentSidebar(
  data: ISidebarContent
) {
  return <section className="sidebar-content sc-product-details">
    <Container>
      <Row>
        <Col className="content-wrap">
          <div className="content-column">
            {data.content}
          </div>
          <div className="sidebar-column">
            {data.sidebarContent}
          </div>
        </Col>
      </Row>
    </Container>
  </section>
}