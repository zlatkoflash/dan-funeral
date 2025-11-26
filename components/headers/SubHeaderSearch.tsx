import { Col, Container, Row } from "react-bootstrap";
import FormSearch from "../forms/ReadyForms/FormSearch";
import Link from "next/link";


// import arrowRightGray from './../../assets/images/icon-arrow-right-gray.svg';
// import Image from "next/image";
import ZBreadCrumbs from "./ZBreadCrumbs";

export default function SubHeaderSearch() {
  return <section className="sub-header-search">
    <Container>
      <Row>
        <Col className="content-holder">
          <div className="left-content">
            <ZBreadCrumbs
              links={[
                {
                  label: "Home",
                  link: "/",
                },
                {
                  label: "Peaceful-memorial-funerals",
                  link: "",
                },
              ]}
            />
            <h1>Funeral Homes in Chicago</h1>
          </div>
          <div className="right-content">
            <FormSearch buttonSearchType="btn-text" />
          </div>
        </Col>
      </Row>
    </Container>
  </section>
}