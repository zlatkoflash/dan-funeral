import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";

import bannerPhoto from './../../assets/images/banner-photo-1.jpg';
import Image from "next/image";


export default function BannerPhotoTextButton() {
  return <section className="banner-photo-text-button">
    <Container>
      <Row>
        <Col>
          <div className="content-holder">
            <div className="background-image">
              <Image src={bannerPhoto} alt="List Your Business" />
            </div>
            <div className="white-wrap">
              <div className="content-wrap">
                <p className="body-2xl">Every provider on Gentle Road is verified for professionalism, empathy, and service quality so you can focus on what truly matters.</p>
                <div className="buttons-wrap">
                  <Link href="" className="btn btn-success">List Your Business</Link>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
}