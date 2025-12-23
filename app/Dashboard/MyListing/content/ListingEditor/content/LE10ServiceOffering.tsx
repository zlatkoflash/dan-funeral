import { Col, Container, Row } from "react-bootstrap";
import AButtonUpdateCreateListing from "./AButtonUpdateCreateListing";
import { useMyListing } from "../../../AddNewListing/MyListingProviderEditor";

export default function LE10ServiceOffering() {

  const { listing, setListing, setActiveMyListingSlug } = useMyListing();

  return <form onSubmit={() => { }} className="form-dashboard">
    <Container>
      <Row>
        <Col>
          <h3 className="title text-start">Service Offering</h3>
        </Col>
      </Row>


      <AButtonUpdateCreateListing
        onContinue={() => {
          setActiveMyListingSlug("product-offerings")
        }}
        onSubmit={() => { }}
      />

    </Container>
  </form>
}