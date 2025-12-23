import { Col, Container, Row } from "react-bootstrap";
import AButtonUpdateCreateListing from "./AButtonUpdateCreateListing";
import ServicesPricing from "@/components/pricing/ServicesPricing";
import { useState } from "react";
import { useMyListing } from "../../../AddNewListing/MyListingProviderEditor";

export default function LE5Pricing() {

  const {
    listing,
    setListing,
    setActiveMyListingSlug,
  } = useMyListing();

  const [pricing, setPricing] = useState<{
    id: string,
    description: string,
    price: number,
  }[]>(listing.pricing);

  return <form onSubmit={() => { }} className="form-dashboard">
    <Container>
      <Row>
        <Col>
          <h3 className="title text-start">Pricing</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <ServicesPricing initialData={
            pricing as any
            /*[
            {
              id: crypto.randomUUID(),
              description: 'Service 1',
              price: '100'
            },
            {
              id: crypto.randomUUID(),
              description: 'Service 2',
              price: '200'
            },
            {
              id: crypto.randomUUID(),
              description: 'Service 3',
              price: '200'
            },
            {
              id: crypto.randomUUID(),
              description: 'Service 4',
              price: '300'
            },
            {
              id: crypto.randomUUID(),
              description: 'Service 5',
              price: '400'
            },
          ]*/} onUpdate={(data) => {
              setPricing(data as any);
            }} />
        </Col>
      </Row>

      <AButtonUpdateCreateListing
        onContinue={() => {
          setListing({
            ...listing,
            pricing: pricing,
          });
          setActiveMyListingSlug("working-hours");
        }}
        onSubmit={() => { }}
      />
    </Container>
  </form>
}