import { Col, Container, Row } from "react-bootstrap";
import AButtonUpdateCreateListing from "./AButtonUpdateCreateListing";
import { useMyListing } from "../../../AddNewListing/MyListingProviderEditor";

export default function LE11RoomFacilities() {

  const { setActiveMyListingSlug } = useMyListing();

  return <form onSubmit={() => { }} className="form-dashboard">
    <Container>
      <Row>
        <Col>
          <h3 className="title text-start">Room Facilities</h3>
        </Col>
      </Row>


      <AButtonUpdateCreateListing
        onContinue={() => {
          setActiveMyListingSlug("languages")
        }}
        onSubmit={() => { }}
      />

    </Container>
  </form>
}