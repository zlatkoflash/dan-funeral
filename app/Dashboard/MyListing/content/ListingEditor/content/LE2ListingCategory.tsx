import TextInput from "@/components/forms/Input";
import { Button, Col, Container, Row } from "react-bootstrap";
import AButtonUpdateCreateListing from "./AButtonUpdateCreateListing";
import { IWPCategory, useMyListing } from "../../../AddNewListing/MyListingProviderEditor";
import { useState } from "react";

export interface ILE2ListingCategory {
  term_id: number
}

export default function LE2ListingCategory() {

  const {
    listingSettings,
    listing,
    setListing,
    setActiveMyListingSlug,

    LE2Category,
    setLE2Category
  } = useMyListing();
  const categoriesArray = (): { label: string, value: string }[] => {
    if (listingSettings === undefined) return [];
    return listingSettings?.categories.map((category: IWPCategory) => {
      return {
        label: category.name,
        value: category.term_id.toString()
      }
    })
  }

  const [selectedCategory, setSelectedCategory] = useState<string>(LE2Category.term_id.toString());

  return <form onSubmit={() => { }} className="form-dashboard">
    <Container>
      <Row>
        <Col>
          <h3 className="title text-start">Listing Category</h3>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          {/* Old Password Input */}
          <TextInput
            id="listing-category"
            onChange={(e) => {
              setSelectedCategory(e.target.value)
            }}
            type="select" // Use type="password" for security
            value={selectedCategory}
            // placeholder="Listing Title"
            options={[
              { label: "Select Listing Category", value: "0" },
              ...categoriesArray()
            ]}
          />
        </Col>
      </Row>

      <AButtonUpdateCreateListing
        onContinue={() => {
          /*setListing({
            ...listing,
            category: {
              term_id: isNaN(Number(selectedCategory)) ? 0 : Number(selectedCategory)
            }
          });*/
          setActiveMyListingSlug('listing-location')
        }}
        onSubmit={() => {
        }}
        inputsData={{
          data: { term_id: Number(selectedCategory) }
        }}
        savingPartType="category"
      />
    </Container>
  </form>
}