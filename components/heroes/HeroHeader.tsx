import { Col, Container, Row } from "react-bootstrap";
import HeaderListingCards from "../headers/HeaderListingCards";
import FormSearch from "../forms/ReadyForms/FormSearch";
import Image from "next/image";




export interface IHeroHeader {
  showSearchForm: boolean,
  title: string,
  paragraph: string,
  heroPhoto: any
  // type?: 'default' | 'without-search'
}

export default function HeroHeader(data: IHeroHeader) {
  return <section className={`hero-header ${data.showSearchForm !== true ? "without-search" : ""}`}>

    <div className="image-background">
      <Image src={data.heroPhoto} alt={"Simply search for your business below."} />
    </div>


    <HeaderListingCards />

    <Container>
      <Row>
        <Col>

          <div className="centerd-content">
            <h1>{data.title}</h1>
            <p>{data.paragraph}</p>
            {
              data.showSearchForm === true ?
                <FormSearch /> :
                <></>
            }
          </div>

        </Col>
      </Row>
    </Container>
  </section>
}