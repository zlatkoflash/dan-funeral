import { Col, Container, Row } from "react-bootstrap";
import ZBreadCrumbs, { IZBreadCrumbs } from "./ZBreadCrumbs";

export interface ISubHeaderOnlyBreadCrumbs {
  bread: IZBreadCrumbs
}

export default function SubHeaderOnlyBreadCrumbs(data: ISubHeaderOnlyBreadCrumbs) {
  return <section className="sub-header-bread-only">
    <Container>
      <Row>
        <Col>
          <ZBreadCrumbs {...data.bread} />
        </Col>
      </Row>
    </Container>
  </section>
}