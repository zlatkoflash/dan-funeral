import { Col, Container, Row } from "react-bootstrap";
import AButtonUpdateCreateListing from "./AButtonUpdateCreateListing";
import FAQsEditor, { FAQItem } from "@/components/grids/FAQsEditor";
import { useMyListing } from "../../../AddNewListing/MyListingProviderEditor";
import { useState } from "react";

export default function LE9FAQs() {

  const { listing, setListing, setActiveMyListingSlug } = useMyListing();
  const [faqs, setFaqs] = useState<FAQItem[]>(listing.faqs);

  return <form onSubmit={() => { }} className="form-dashboard">
    <Container>
      <Row>
        <Col>
          <h3 className="title text-start">Listing Faq's</h3>
        </Col>
      </Row>

      <Row>
        <Col>
          <FAQsEditor
            initialItems={faqs}
            onUpdate={(items: FAQItem[]) => {
              console.log('items:', items);
              setFaqs(items);
            }} />
        </Col>
      </Row>

      <AButtonUpdateCreateListing
        onContinue={() => {
          setListing({ ...listing, faqs });
          setActiveMyListingSlug("service-offerings");
        }}
        onSubmit={() => { }}
      />

    </Container>
  </form>
}