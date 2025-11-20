"use client"

import { Button, Col, Container, Row } from "react-bootstrap";
import Image from 'next/image';

import paradisePhoto from './../../assets/images/hero-transparent.png';
import theLogo from './../../assets/images/logo.png';

import Link from "next/link";
import TextInput from "../forms/Input";
import { useState } from "react";


export default function HomeHeroBigImage() {

  const [searchText, set_searchText] = useState<string>("");

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
              <form action="" className="search-form">
                <TextInput
                  type="text"
                  id="search-input"
                  label=""
                  inputClassName="heading-xs"
                  placeholder="Enter City or Zip Code"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    set_searchText(e.target.value)
                  }}
                  value={searchText}
                />

                <Button variant="success" className="btn-search" />

              </form>
            </div>

          </div>



        </Col>
      </Row>
    </Container>
  </section>
}