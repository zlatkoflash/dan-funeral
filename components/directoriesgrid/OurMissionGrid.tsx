import { Col, Container, Row } from "react-bootstrap";
import HeadingTitleParagraph, { IHeadingTitleParagraph } from "../headings/HeadingTitleParagraph";
import Image from "next/image";

export interface IOurMissionGrid {
  heading: IHeadingTitleParagraph,
  missions: {
    image: any,
    title: string,
    paragraph: string,
  }[]
}

export default function OurMissionGrid(data: IOurMissionGrid) {
  return <section className="our-mission-grid">

    <Container>
      <Row>
        <Col>
          <HeadingTitleParagraph
            {...data.heading}
            type="our-mission"
            show={true}
          />

          <div className="the-grid">
            {
              data.missions.map((item, key: number) => {
                return <div className="mission-item" key={`mission-${key}`}>
                  <Image src={item.image} alt={item.title} width={500} height={500} />
                  <h4>{item.title}</h4>
                  <p>{item.paragraph}</p>
                </div>
              })
            }
          </div>

        </Col>
      </Row>
    </Container>

  </section>
}