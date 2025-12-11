import { Col, Container, Row } from "react-bootstrap";
import HeadingTitleParagraph, { IHeadingTitleParagraph } from "../headings/HeadingTitleParagraph";
import Image from "next/image";


import illustration from './../../assets/images/man-walking.jpg';

export interface IBannerMoment {
  heading: IHeadingTitleParagraph,
  illustration: any,
  momentbigtitle: string,
  paragraph: string
}

export default function BannerMoment(data: IBannerMoment) {
  return <section className="banner-moment">
    <Container>
      <Row>
        <Col>

          <HeadingTitleParagraph
            {...data.heading}
            show={true}
          />

          <div className="content-wrap">
            <div className="illustration">
              <Image src={data.illustration || illustration} alt={data.heading.title} width={1920} height={800} />
            </div>
            <div className="content-white-holder">
              <h4>{data.momentbigtitle}</h4>
              <p>{data.paragraph}</p>
            </div>
          </div>

        </Col>
      </Row>
    </Container>
  </section>
}