import { Col, Container, Row } from "react-bootstrap";

import Image from "next/image";
import Link from "next/link";



import galleryImage1 from './../../assets/images/gallery-1.jpg';
import galleryImage2 from './../../assets/images/gallery-2.jpg';
import galleryImage3 from './../../assets/images/gallery-3.jpg';
import galleryImage4 from './../../assets/images/gallery-4.jpg';



export default function ProductDetailsGallery() {
  return <section className="product-details-gallery">
    <Container>
      <Row>
        <Col>
          <div className="gallery-grid">
            <div className="big-image">
              <Image src={galleryImage1} alt="Gallery Image" />
            </div>
            <div className="x2-images">
              <Image src={galleryImage2} alt="Gallery Image" />
              <Image src={galleryImage3} alt="Gallery Image" />
            </div>
            <div className="image-btn-view-all">
              <Image src={galleryImage4} alt="View All Gallery Image" />
              <Link href="#view-all">View all (81+)</Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
}