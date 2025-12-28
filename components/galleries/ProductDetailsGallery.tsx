"use client"

import { Col, Container, Row } from "react-bootstrap";

import Image from "next/image";
import Link from "next/link";



import galleryImage1 from './../../assets/images/gallery-1.jpg';
import galleryImage2 from './../../assets/images/gallery-2.jpg';
import galleryImage3 from './../../assets/images/gallery-3.jpg';
import galleryImage4 from './../../assets/images/gallery-4.jpg';
import { useMyListing } from "@/app/Dashboard/MyListing/AddNewListing/MyListingProviderEditor";



export default function ProductDetailsGallery() {

  const { listing } = useMyListing();

  return <section className="product-details-gallery">
    <Container>
      <Row>
        <Col>
          <div className="gallery-grid">
            <div className="big-image">
              <Image src={listing?.media.gallery[0]?.preview || galleryImage1} width={1920} height={1000} alt={listing.about.title} />
            </div>
            <div className="x2-images">
              <Image src={listing?.media.gallery[1]?.preview || galleryImage2} alt={listing.about.title} width={1920} height={1000} />
              <Image src={listing?.media.gallery[2]?.preview || galleryImage3} alt={listing.about.title} width={1920} height={1000} />
            </div>
            <div className="image-btn-view-all">
              <Image src={listing?.media.gallery[3]?.preview || galleryImage4} alt="View All Gallery Image" width={1920} height={1000} />
              <Link href="#view-all">View all ({listing?.media.gallery.length}+)</Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
}