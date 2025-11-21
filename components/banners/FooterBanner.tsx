import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";

import ourMission from './../../assets/images/footer-banner-bg.jpg';
import HeadingTitleParagraph, { IHeadingTitleParagraph } from "../headings/HeadingTitleParagraph";
import Link from "next/link";

export interface IFooterBanner {
  heading: IHeadingTitleParagraph,

  link: string,
  btnLinkText: string
}

export default function FooterBanner(data: IFooterBanner) {
  return <section className="footer-banner">

    <Container>
      <Row>
        <Col>
          <div className="contaent-wrap">
            <div className="image">
              <Image src={ourMission} alt="Our Mission" />
            </div>

            <div className="inner-content">
              <HeadingTitleParagraph
                {...data.heading}
              />

              <div className="buttons">
                <Link href={data.link} className="btn btn-success">{data.btnLinkText}</Link>
              </div>
            </div>

          </div>
        </Col>
      </Row>
    </Container>

  </section>
}