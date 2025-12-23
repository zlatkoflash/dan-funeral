import { Col, Container, Row } from "react-bootstrap";
import FormSearch from "../forms/ReadyForms/FormSearch";
// import Link from "next/link";


// import arrowRightGray from './../../assets/images/icon-arrow-right-gray.svg';
// import Image from "next/image";
import ZBreadCrumbs from "./ZBreadCrumbs";
import Link from "next/link";

export interface ISubHeaderSearch {
  breads: { label: string, link: string }[] | null;
  title: string;
  right_content: React.ReactNode;
  back_button?: { label: string, link: string };
}

export default function SubHeaderSearch(props: ISubHeaderSearch) {
  return <section className="sub-header-search">
    <Container>
      <Row>
        <Col className="content-holder">
          <div className="left-content">
            {
              props.breads !== null && <ZBreadCrumbs
                links={props.breads.length !== 0 ? props.breads : [
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
            }

            {props.title !== "" && <h1>{props.title}</h1>}
            {
              props.back_button !== undefined && <Link className="back-button-for-sub-header-search" href={props.back_button.link}>
                {props.back_button.label}
              </Link>
            }
          </div>
          <div className="right-content">
            {
              props.right_content
            }
            {/*<FormSearch buttonSearchType="btn-text" />*/}
          </div>
        </Col>
      </Row>

    </Container>
  </section>
}