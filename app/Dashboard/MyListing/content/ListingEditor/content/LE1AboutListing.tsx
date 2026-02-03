import TextInput from "@/components/forms/Input";
import { Button, Col, Container, Row } from "react-bootstrap";
import AButtonUpdateCreateListing from "./AButtonUpdateCreateListing";
import { useMyListing } from "../../../AddNewListing/MyListingProviderEditor";
import { useState } from "react";

export interface ILE1AboutListing {
  // listing: IListing;
  title: string,
  description: string,
  year_founded: string,
}

export default function LE1AboutListing() {

  const {
    listing, setListing, setActiveMyListingSlug,
    LE1About, setLE1About, actualListingId
  } = useMyListing();

  console.log("LE1About:", LE1About);

  const [title, setTitle] = useState<string>(LE1About.title);
  const [description, setDescription] = useState<string>(LE1About.description);
  const [year_founded, setYearFounded] = useState<string>(LE1About.year_founded);

  const currentYear = new Date().getFullYear();
  const yearsCount = 70;

  const yearOptions = [
    { value: "", label: "Select Year" },
    ...Array.from({ length: yearsCount + 1 }, (_, i) => {
      // Subtract index from current year to get years in descending order
      const year = (currentYear - i).toString();
      return { value: year, label: year };
    })
  ];


  return <form onSubmit={() => { }} className="form-dashboard">
    <Container>
      <Row>
        <Col>
          <h3 className="title text-start">About Listing</h3>

          {
            actualListingId === undefined && (
              <Row className="mb-0">
                <Col>
                  <p><strong>Ready to create your listing?</strong> To ensure your property or service stands out, you'll need to provide a <strong>compelling Title</strong> and a <strong>detailed Description</strong>. A clear title helps users find you in search results, while a thorough description builds trust and answers potential questions upfront.</p>
                </Col>
              </Row>
            )
          }

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
              setYearFounded(e.target.value)
            }}
            // type="text" // Use type="password" for security
            type="select"
            value={year_founded}

            placeholder="Year Founded"
            errorsCasses={["required"]}
            label="Year Founded"
            options={yearOptions}
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
            year_founded: year_founded
          }
        }}
        savingPartType="about"
      />
    </Container>
  </form>
}