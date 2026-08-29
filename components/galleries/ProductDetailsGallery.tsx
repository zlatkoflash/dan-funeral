"use client";

import { Col, Container, Row } from "react-bootstrap";

import Image from "next/image";
import Link from "next/link";

import galleryImage1 from "./../../assets/images/gallery-1.jpg";
import galleryImage2 from "./../../assets/images/gallery-2.jpg";
import galleryImage3 from "./../../assets/images/gallery-3.jpg";
import galleryImage4 from "./../../assets/images/gallery-4.jpg";
import { useMyListing } from "@/app/Dashboard/MyListing/AddNewListing/MyListingProviderEditor";
import GalleryLightBox from "./GalleryLightBox";
import { useState } from "react";

export default function ProductDetailsGallery() {
  const { listing } = useMyListing();
  const [showTheLightBox, set_showTheLightBox] = useState(false);

  const gallery_images = listing.media_gallery_photos;
  console.log("gallery_images:::", gallery_images);

  return (
    <>
      <section className="product-details-gallery">
        <Container>
          <Row>
            <Col>
              <div className="gallery-grid">
                <div className="big-image">
                  <Image
                    src={gallery_images[0]?.url || galleryImage1}
                    width={1920}
                    height={1000}
                    alt={listing.about.title}
                  />
                </div>
                <div className="x2-images">
                  <Image
                    src={gallery_images[1]?.url || galleryImage2}
                    alt={listing.about.title}
                    width={1920}
                    height={1000}
                  />
                  <Image
                    src={gallery_images[2]?.url || galleryImage3}
                    alt={listing.about.title}
                    width={1920}
                    height={1000}
                  />
                </div>
                <div className="image-btn-view-all">
                  <Image
                    src={gallery_images[3]?.url || galleryImage4}
                    alt="View All Gallery Image"
                    width={1920}
                    height={1000}
                  />
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      set_showTheLightBox(true);
                      console.log("showTheLightBox:", showTheLightBox);
                    }}
                    href="#view-all"
                  >
                    View all ({gallery_images.length}+)
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/*<GalleryLightBox
      showTheThumbs={false}
      showFromOutside={showTheLightBox}
      setShowFromOutside={set_showTheLightBox}
      images={

        // listing?.media.gallery

        listing?.media?.gallery?.length > 0
          ? [listing.media.gallery.at(-1), ...listing.media.gallery.slice(0, -1)]
          : []

            .map((item: any) => ({ url: item.preview, alt: item.title })) || []} />*/}

      <GalleryLightBox
        showTheThumbs={false}
        showFromOutside={showTheLightBox}
        setShowFromOutside={set_showTheLightBox}
        images={
          // listing?.media.gallery
          (gallery_images?.length
            ? [gallery_images.at(-1), ...gallery_images.slice(0, -1)]
            : []
          ).map((item: any) => ({
            url: item.url,
            alt: `Gallery for ${listing.identity_and_narrative.business_name}`,
          }))
        }
      />
    </>
  );
}
