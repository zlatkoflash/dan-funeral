import { ReactNode } from "react";
import { Col, Container, Row } from "react-bootstrap";


export interface ISidebarContent {
  sidebarContent: ReactNode,
  content: ReactNode
}

export default function SidebarContent(
  data: ISidebarContent
) {
  return <section className="sidebar-content">
    <Container>
      <Row>
        <Col className="content-wrap">
          <div className="sidebar-column">
            {data.sidebarContent}
          </div>
          <div className="content-column">
            {data.content}
          </div>
        </Col>
      </Row>
    </Container>
  </section>
}