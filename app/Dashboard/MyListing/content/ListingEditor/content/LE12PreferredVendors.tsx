import { Col, Container, Row } from "react-bootstrap";
import AButtonUpdateCreateListing from "./AButtonUpdateCreateListing";
import TextInput from "@/components/forms/Input";
import { useMyListing } from "../../../AddNewListing/MyListingProviderEditor";
import { useState } from "react";

export interface ILE12PreferredVendor {
  id: string;
}

export default function LE12PreferredVendors() {

  const {
    // listing, 
    // setListing,
    LE12PreferredVendor,
    setLE12PreferredVendor,
    setActiveMyListingSlug
  } = useMyListing();
  const [vendorId, setVendorId] = useState<string>(LE12PreferredVendor.id);

  return <form onSubmit={() => { }} className="form-dashboard">
    <Container>
      <Row>
        <Col>
          <h3 className="title text-start">Preferred Vendors</h3>
        </Col>
      </Row>

      <Row>
        <Col>
          <TextInput
            id="PreferredVendors"
            type="select"
            value={vendorId}
            onChange={(e) => {
              setVendorId(e.target.value);
            }}
            options={[
              {
                label: "Select Vendor",
                value: "",
              },
              {
                label: "Vendor 1",
                value: "vendor-1",
              },
              {
                label: "Vendor 2",
                value: "vendor-2",
              },
            ]}
          />
        </Col>
      </Row>

      <AButtonUpdateCreateListing
        // isNextStep={false}
        onContinue={() => {
          /*setListing({
            ...listing,
            vendor: {
              id: vendorId
            }
          })*/
          // setActiveMyListingSlug("product-offerings");
        }}
        onSubmit={() => { }}
        inputsData={{
          data: {
            id: vendorId
          }
        }}
        savingPartType="preffered-vendors"
        isNextStep={false}
      />

    </Container>
  </form>
}