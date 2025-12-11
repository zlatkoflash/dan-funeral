import { Col, Container, Row } from "react-bootstrap";
import HeadingTitleParagraph, { IHeadingTitleParagraph } from "../headings/HeadingTitleParagraph";
import Link from "next/link";
import Image from "next/image";

import bannerFinaSupprotIllustration from './../../assets/images/paradise-place.png';

export interface IBannerFindSupport {
  heading: IHeadingTitleParagraph,
  image: any,
  button: {
    link: string,
    label: string
  }
}

export default function BannerFindSupport(data: IBannerFindSupport) {

  console.log('data.heading', data.heading);

  return <section className="banner-find-support">
    <div className="illustration">
      <Image src={data.image || bannerFinaSupprotIllustration} alt={data.heading.title} width={1920} height={800} />
    </div>
    <Container>
      <Row>
        <Col>
          <HeadingTitleParagraph {...data.heading} show={true} />

          <div className="buttons-wrap">
            <Link href={data.button.link} className="btn btn-success">{data.button.label}</Link>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
}