"use client"

import ZButtonEdit from "@/components/forms/ZButtonEdit";
import { Button, Col, Container, Row } from "react-bootstrap";

import placeholder from "@/assets/images/placeholder.svg"
import Image from "next/image";
import AButtonUpdateCreateListing from "./AButtonUpdateCreateListing";
import icon_plus from "@/assets/images/icon-plus.svg"
import { useState } from "react";
import { IListing, useMyListing } from "../../../AddNewListing/MyListingProviderEditor";
import { UploadFile } from "@/utils/files";

export interface IL43UploadImages {
  featured_image: {
    file: File | null,
    preview: string,
    isNew?: boolean,
    id?: string
  },
  gallery: {
    // file: File | null,
    preview: string,
    // isNew?: boolean,
    // id?: string
  }[]
}

export default function L43UploadImages() {

  const {
    // listing,
    // setListing,
    setActiveMyListingSlug,

    LE4UploadImages,
    setLE4UploadImages
  } = useMyListing();

  console.log("LE4UploadImages:", LE4UploadImages);

  const [featuredImageURL, setFeaturedImageURL] = useState<string>(LE4UploadImages.featured_image.preview);
  const [uploadingGallery, setUploadingGallery] = useState<boolean>(false);

  /**
   * 
   * @param file The gallery must be uploaded one by one
   */
  const ___UploadTheFile = async (file: File) => {
    setUploadingGallery(true);
    const resultImage = await UploadFile(file, "gallery/");
    console.log("resultImage:", resultImage);
    setUploadingGallery(false);

    if (resultImage.status === true) {
      const temp_LE4UploadImages = { ...LE4UploadImages };
      temp_LE4UploadImages.gallery.push({
        // file: null,
        preview: resultImage.url,
        // isNew: true
      });
      setLE4UploadImages(temp_LE4UploadImages);

    }
  }

  return <form onSubmit={() => { }} className="form-dashboard">
    <Container>
      <Row>
        <Col>
          <h3 className="title text-start">Featured Image</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="change-upload-image-panel">
            <input id="featured-image" type="file" className="d-none" accept="image/jpeg, image/png, image/webp" onChange={(e) => {
              // setFeaturedImage(e.target.value);

              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                  const base64String = e.target?.result as string
                  /*const result = e.target?.result;
                  if (result) {
                    setFeaturedImage(result as string);
                  }*/
                  setFeaturedImageURL(base64String)
                  const temp_LE4UploadImages = { ...LE4UploadImages };
                  temp_LE4UploadImages.featured_image = {
                    file: file,
                    preview: base64String,
                    isNew: true
                  }
                  setLE4UploadImages(temp_LE4UploadImages)
                };
                reader.readAsDataURL(file);
              }

            }} />
            <div className="wrap-uploader-content">
              {
                (
                  featuredImageURL === "" || featuredImageURL === null || featuredImageURL === undefined
                ) && <>
                  <Image src={placeholder} alt="placeholder" />
                  <h3>Upload Image</h3>
                  <p>Image Size 1920 x 700</p>
                </>
              }
              {
                // in case there is image will go here
              }
            </div>


            {
              featuredImageURL !== "" && featuredImageURL !== null && featuredImageURL !== undefined && <Image className="preview" src={featuredImageURL} alt="Featured Image" width={1920} height={700} />
            }
            <ZButtonEdit className="small" onClick={() => {
              document.getElementById('featured-image')?.click();

            }} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3 className="title text-start">Listing Gallery</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <input
            id="gallery-images"
            type="file"
            accept="image/jpeg, image/png, image/webp"
            multiple // This allows selecting more than one file in the browser dialog
            className="d-none"
            onChange={(e) => {
              const files = e.target.files;
              if (files && files.length > 0) {
                // Convert FileList to an Array so we can loop
                const fileArray = Array.from(files);

                fileArray.forEach((file) => {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    const base64String = event.target?.result as string;

                    // Use the functional update to ensure we don't lose images when state updates quickly
                    // setListing();
                    /*const temp_LE4UploadImages = { ...LE4UploadImages };
                    temp_LE4UploadImages.gallery.push({
                      // file: file,
                      preview: base64String,
                      // isNew: true
                    });
                    setLE4UploadImages(temp_LE4UploadImages);*/
                    ___UploadTheFile(file);
                  };
                  reader.readAsDataURL(file);
                });
              }
            }}
          />
          <Button type="button" variant="success" className={`${uploadingGallery ? "loading" : ""}`} onClick={() => {
            document.getElementById('gallery-images')?.click();
          }}>
            <Image src={icon_plus} className="icon" alt="Plus Sign" />
            Add Gallery Images
          </Button>

          <div className="listing-editor-gallery-images">
            {
              LE4UploadImages.gallery.map((image, index) => {
                return <div className="listing-editor-gallery-image-item" key={`image-${index}`}>
                  <Image src={image.preview} alt="Gallery Image" width={1920} height={700} />
                  <ZButtonEdit className="small" type="delete" onClick={() => {
                    // const listingTemp = { ...listing };
                    const temp_LE4UploadImages = { ...LE4UploadImages };
                    temp_LE4UploadImages.gallery.splice(index, 1);
                    setLE4UploadImages(temp_LE4UploadImages);
                  }} />
                </div>
              })
            }
          </div>

        </Col>
      </Row>


      <AButtonUpdateCreateListing
        onContinue={() => {
          setActiveMyListingSlug("pricing");
        }}
        onSubmit={() => { }}
        savingPartType="media"
        inputsData={{
          data: {
            gallery: LE4UploadImages.gallery
          },
          file: LE4UploadImages.featured_image.isNew === true && LE4UploadImages.featured_image.file !== null && LE4UploadImages.featured_image.file !== undefined ? LE4UploadImages.featured_image.file : undefined
        }}
      />
    </Container>
  </form>
}