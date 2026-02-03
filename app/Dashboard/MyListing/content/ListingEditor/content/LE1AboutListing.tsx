import TextInput from "@/components/forms/Input";
import { Button, Col, Container, Row } from "react-bootstrap";
import AButtonUpdateCreateListing from "./AButtonUpdateCreateListing";
import { useMyListing } from "../../../AddNewListing/MyListingProviderEditor";
import { useState } from "react";

export interface ILE1AboutListing {
  // listing: IListing;
  title: string,
  description: string,
  yearsinoperation: string,
}

export default function LE1AboutListing() {

  const {
    listing, setListing, setActiveMyListingSlug,
    LE1About, setLE1About
  } = useMyListing();

  console.log("LE1About:", LE1About);

  const [title, setTitle] = useState<string>(LE1About.title);
  const [description, setDescription] = useState<string>(LE1About.description);
  const [yearsinoperation, setYearsInOperation] = useState<string>(LE1About.yearsinoperation);


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
        <Col md={6}>
          <TextInput
            id="listing-years-in-operation"
            onChange={(e) => {
              setYearsInOperation(e.target.value)
            }}
            type="text" // Use type="password" for security
            value={yearsinoperation}

            placeholder="Years in Operation"
            errorsCasses={["required"]}
            label="Years in Operation"
          // disabled={true}
          />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <TextInput
            id="listing-description"
            onChange={(htmlText: string) => { setDescription(htmlText) }}
            type="rich-text-editor" // Use type="password" for security
            value={description}
            placeholder="Listing Description"
            maxLength={1500}
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
            yearsinoperation: yearsinoperation
          }
        }}
        savingPartType="about"
      />
    </Container>
  </form>
}