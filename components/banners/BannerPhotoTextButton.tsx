import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";

import bannerPhoto from './../../assets/images/banner-photo-1.jpg';
import Image from "next/image";



export interface IBannerPhotoTextButton {
  paragraph: string,
  buttonText: string,
  buttonLink: string,
  bigTitle?: string
}

export default function BannerPhotoTextButton(
  /*{
    paragraph = "Every provider on Gentle Road is verified for professionalism, empathy, and service quality so you can focus on what truly matters.",
    buttonText = "List Your Business",
    buttonLink = ""
  }*/
  data: IBannerPhotoTextButton
) {
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
                {
                  data.bigTitle !== undefined ?
                    <h3>{data.bigTitle}</h3>
                    :
                    <></>
                }
                <p className="body-2xl">{data.paragraph}</p>
                <div className="buttons-wrap">
                  <Link href={data.buttonLink} className="btn btn-success">{data.buttonText}</Link>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
}