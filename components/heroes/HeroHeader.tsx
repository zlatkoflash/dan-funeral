import { Col, Container, Row } from "react-bootstrap";
import HeaderListingCards, { IHeaderListingCards } from "../headers/HeaderListingCards";
import FormSearch from "../forms/ReadyForms/FormSearch";
import Image from "next/image";

import herophoto from './../../assets/images/cover-example-2.jpg'


export interface IHeroHeader {
  showSearchForm: boolean,
  title: string,
  paragraph: string,
  herophoto: any,
  class?: string
  // type?: 'default' | 'without-search',
  headerListingCards: IHeaderListingCards
}

export default function HeroHeader(data: IHeroHeader) {

  console.log("data.herophoto:", data.herophoto);

  return <section className={`hero-header ${data.showSearchForm !== true ? "without-search" : ""} ${data.class}`}>

    <div className="image-background">
      <Image src={data.herophoto && data.herophoto !== "" && data.herophoto !== undefined ? data.herophoto : herophoto} alt={data.title} width={1920} height={1080} />
    </div>


    <HeaderListingCards {...data.headerListingCards} />

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