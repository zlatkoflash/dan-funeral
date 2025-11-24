

import { Button, Col, Container, Row } from "react-bootstrap";
import Image from 'next/image';

import paradisePhoto from './../../assets/images/hero-transparent.png';
import theLogo from './../../assets/images/logo-new-h84.png';

import Link from "next/link";
// import TextInput from "../forms/Input";
// import { useState } from "react";
import FormSearch from "../forms/ReadyForms/FormSearch";


export default function HomeHeroBigImage() {


  return <section className="home-hero-big-image">
    <Container>
      <Row>
        <Col>
          <div className="relative-container">
            <div className="bg-hero">
              <Image src={paradisePhoto} alt="Guiding Families with Compassion and Clarity" />
            </div>

            <Link href={"/"} className="link-logo">
              <Image src={theLogo} alt="Gentle Road" />
            </Link>

            <div className="content">
              <h1 className="heading-xl">Guiding Families with Compassion and Clarity</h1>
              <p className="body-xl">Find trusted funeral and memorial services — all in one peaceful place.</p>

              <FormSearch />
            </div>

          </div>



        </Col>
      </Row>
    </Container>
  </section>
}