import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import HeadingTitleParagraph, { IHeadingTitleParagraph } from "../headings/HeadingTitleParagraph";

import ourMission from './../../assets/images/footer-banner-bg.jpg';

export interface IFooterBanner {
  heading: IHeadingTitleParagraph,

  link: string,
  btnLinkText: string,

  background_image?: any
}

export default function FooterBanner(data: IFooterBanner) {
  return <section className="footer-banner">

    <Container>
      <Row>
        <Col>
          <div className="contaent-wrap">
            <div className="image">
              <Image src={data.background_image !== "" && data.background_image !== null && data.background_image !== false && data.background_image !== undefined ? data.background_image : ourMission} alt="Our Mission" width={1321} height={500} />
            </div>

            <div className="inner-content">
              <HeadingTitleParagraph
                {...data.heading}
                show={true}
              />

              <div className="buttons">
                <Link href={data.link !== "" ? data.link : "/list-your-business"} className="btn btn-success">{data.btnLinkText !== "" ? data.btnLinkText : "List Your Business"}</Link>
              </div>
            </div>

          </div>
        </Col>
      </Row>
    </Container>

  </section>
}