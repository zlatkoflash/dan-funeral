import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";

import bannerPhoto from './../../assets/images/banner-photo-1.jpg';
import Image from "next/image";



export interface IBannerPhotoTextButton {
  paragraph: string,
  buttontext: string,
  buttonlink: string,
  bigtitle?: string,
  big_title?: string,
  background_photo: string
}

export default function BannerPhotoTextButton(

  data: IBannerPhotoTextButton
) {

  console.log("BannerPhotoTextButton:", data);

  return <section className="banner-photo-text-button">
    <Container>
      <Row>
        <Col>
          <div className="content-holder">
            <div className="background-image">
              <Image src={data.background_photo !== '' && data.background_photo ? data.background_photo : bannerPhoto} alt="List Your Business" width={1200} height={400} />
            </div>
            <div className="white-wrap">
              <div className="content-wrap">
                {
                  data.bigtitle !== undefined ?
                    <h3>{data.bigtitle}</h3>
                    :
                    <></>
                }
                {
                  data.big_title !== undefined ?
                    <h3>{data.big_title}</h3>
                    :
                    <></>
                }
                {
                  data.paragraph && (<p className="body-2xl">{data.paragraph}</p>)
                }

                <div className="buttons-wrap">
                  <Link href={data.buttonlink !== "" ? data.buttonlink : "/ListYourBusiness"} className="btn btn-success">{
                    data.buttontext !== '' && data.buttontext ? data.buttontext : 'List Your Business'
                  }</Link>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
}