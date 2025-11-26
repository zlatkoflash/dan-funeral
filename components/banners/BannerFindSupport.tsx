import { Col, Container, Row } from "react-bootstrap";
import HeadingTitleParagraph, { IHeadingTitleParagraph } from "../headings/HeadingTitleParagraph";
import Link from "next/link";
import Image from "next/image";

export interface IBannerFindSupport {
  heading: IHeadingTitleParagraph,
  image: any,
  button: {
    link: string,
    label: string
  }
}

export default function BannerFindSupport(data: IBannerFindSupport) {
  return <section className="banner-find-support">
    <div className="illustration">
      <Image src={data.image} alt={data.heading.title} />
    </div>
    <Container>
      <Row>
        <Col>
          <HeadingTitleParagraph {...data.heading} />

          <div className="buttons-wrap">
            <Link href={data.button.link} className="btn btn-success">{data.button.label}</Link>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
}