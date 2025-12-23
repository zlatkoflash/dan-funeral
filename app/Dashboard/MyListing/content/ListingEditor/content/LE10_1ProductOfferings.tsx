import { Col, Container, Row } from "react-bootstrap";
import AButtonUpdateCreateListing from "./AButtonUpdateCreateListing";
import { useMyListing } from "../../../AddNewListing/MyListingProviderEditor";

export default function LE10_1ProductOfferings() {

  const { listing, setListing, setActiveMyListingSlug } = useMyListing();

  return <form onSubmit={() => { }} className="form-dashboard">
    <Container>
      <Row>
        <Col>
          <h3 className="title text-start">Product Offerings</h3>
        </Col>
      </Row>



      <AButtonUpdateCreateListing
        onContinue={() => {
          setActiveMyListingSlug("room-facilities")
        }}
        onSubmit={() => { }}
      />

    </Container>
  </form>
}