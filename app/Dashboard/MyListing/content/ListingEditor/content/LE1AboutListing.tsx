import TextInput from "@/components/forms/Input";
import { Button, Col, Container, Row } from "react-bootstrap";
import AButtonUpdateCreateListing from "./AButtonUpdateCreateListing";
import { useMyListing } from "../../../AddNewListing/MyListingProviderEditor";
import { useState } from "react";

export interface ILE1AboutListing {
  // listing: IListing;
  title: string,
  description: string,
}

export default function LE1AboutListing() {

  const {
    listing, setListing, setActiveMyListingSlug,
    LE1About, setLE1About
  } = useMyListing();

  const [title, setTitle] = useState<string>(LE1About.title);
  const [description, setDescription] = useState<string>(LE1About.description);


  return <form onSubmit={() => { }} className="form-dashboard">
    <Container>
      <Row>
        <Col>
          <h3 className="title text-start">About Listing</h3>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          {/* Old Password Input */}
          <TextInput
            id="listing-title"
            onChange={(e) => { setTitle(e.target.value) }}
            type="text" // Use type="password" for security
            value={title}
            placeholder="Listing Title"
            errorsCasses={["required"]}
          />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          {/* Old Password Input */}
          <TextInput
            id="listing-description"
            onChange={(htmlText: string) => { setDescription(htmlText) }}
            type="rich-text-editor" // Use type="password" for security
            value={description}
            placeholder="Listing Description"
          />
        </Col>
      </Row>

      <AButtonUpdateCreateListing
        canSave={title !== "" && description.replace(/<[^>]*>/g, '') !== ""}
        onContinue={() => {
          /*setListing({
            ...listing,
            about: {
              title: title,
              description: description
            }
          });*/
          setActiveMyListingSlug("listing-category");
        }}
        onSubmit={() => {

        }}
        inputsData={{
          data: {
            title: title,
            description: description,
          }
        }}
        savingPartType="about"
      />
    </Container>
  </form>
}