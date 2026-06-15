

import { Button, Col, Container, Row } from "react-bootstrap";
import Image from 'next/image';

import paradisePhoto from './../../assets/images/hero-transparent.png';

// import Link from "next/link";
// import TextInput from "../forms/Input";
// import { useState } from "react";
import FormSearch from "../forms/ReadyForms/FormSearch";
import HeaderListingCards, { IHeaderListingCards } from "./../headers/HeaderListingCards";
// import { IMenuHeaderItem } from "@/app/PagesInterfaces";

export interface IHomeHeroBigImage {
  // menuItems: IMenuHeaderItem[]
  headerProps: IHeaderListingCards
  title: string
  paragraph: string
  background_image: string
}

export default function HomeHeroBigImage(data: IHomeHeroBigImage) {

  const {
    headerProps,
    title,
    paragraph,
    background_image
  } = data;

  return <section className="home-hero-big-image">


    <Container>
      <Row>
        <Col>
          <div className="relative-container">
            <div className="bg-hero">
              <Image src={background_image ? background_image : paradisePhoto} alt={title} width={1290} height={1300} />
            </div>

            {/*<Link href={"/"} className="link-logo">
              <Image src={theLogo} alt="Gentle Road" />
            </Link>*/}

            <div className="header-wrap">
              <HeaderListingCards {...headerProps} />
            </div>

            <div className="content">
              {/*<h1 className="heading-xl">Guiding Families with Compassion and Clarity</h1>
              <p className="body-xl">Find trusted funeral and memorial services — all in one peaceful place.</p>*/}
              <h1 className="heading-xl" dangerouslySetInnerHTML={{ __html: title }} />
              <p className="body-xl">{paragraph}</p>

              <FormSearch />
            </div>

          </div>



        </Col>
      </Row>
    </Container>
  </section>
}