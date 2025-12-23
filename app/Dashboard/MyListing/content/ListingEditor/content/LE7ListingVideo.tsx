import { Col, Container, Row } from "react-bootstrap";
import AButtonUpdateCreateListing from "./AButtonUpdateCreateListing";
import TextInput from "@/components/forms/Input";
import { useState } from "react";
import { useMyListing } from "../../../AddNewListing/MyListingProviderEditor";

export default function LE7ListingVideo() {

  const { listing, setListing, setActiveMyListingSlug } = useMyListing();
  const [videoURL, setVideoURL] = useState(listing.video.url);

  return <form onSubmit={() => { }} className="form-dashboard">
    <Container>
      <Row>
        <Col>
          <h3 className="title text-start">Listing Video</h3>
        </Col>
      </Row>

      <Row>
        <Col lg={12}>
          <TextInput
            type="text"
            placeholder="http://gentle-road/youtube/.net"
            value={videoURL}
            onChange={(e: any) => {
              setVideoURL(e.target.value);
            }}
            id="listingVideo"

          />
        </Col>
      </Row>

      <AButtonUpdateCreateListing
        onContinue={() => {
          console.log("videoURL:", videoURL);
          setListing({ ...listing, video: { url: videoURL } });
          setActiveMyListingSlug("my-team");
        }}
        onSubmit={() => { }}
      />

    </Container>
  </form>
}