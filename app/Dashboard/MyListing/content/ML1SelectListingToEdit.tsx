"use client";

import MyListingGridHead from "@/components/grids/MyListingGridHead";
import MLCotentWrap from "./MLCotentWrap";
import { IMLSidebarMenuItem } from "./MLSidebarMenu";
import { Button, Col, Container, Row } from "react-bootstrap";
import TextInput from "@/components/forms/Input";
import { useState } from "react";
import { useMyListing } from "../AddNewListing/MyListingProviderEditor";
import { useRouter } from "next/navigation"; // 1. Import the router

// ML1SelectListingToEdit
export default function ML1SelectListingToEdit() {

  const router = useRouter();

  const { listingSettings } = useMyListing();

  /*const listing_filters: IMLSidebarMenuItem[] = [
    {
      title: "All Listings",
      value: "",
      count: 0,
    },
    {
      title: "Approved",
      value: "approved",
      count: 0,
    }
  ];*/

  console.log("listing_filters and listing_filters_edited are repeating, you need to ask Dan, what here actually will be shown.");

  const listing_filters = [
    { value: 'all', title: 'All Listings', count: 0 },
    { value: 'approved', title: 'Approved', count: 0 },
    { value: 'pending', title: 'Pending', count: 0 },
    { value: 'removed', title: 'Removed', count: 0 },
    { value: 'expired', title: 'Expired', count: 0 },
    { value: 'spotlight', title: 'Spotlight', count: 0 },
    { value: 'featured', title: 'Featured', count: 0 },
    { value: 'professionally', title: 'Professionally', count: 0 }
  ];

  const listing_filters_edited = () => {
    return listing_filters.map((item, index) => {
      return {
        ...item,
        onclick: () => {
          console.log(item.title);
        }
      }
    })
  }

  const [selectedListing, setSelectedListing] = useState<string>("");

  const MyListingsOptions = () => {
    const options: { label: string, value: string }[] = [];
    listingSettings?.listings?.map((item, index) => {
      options.push({
        label: item.post_title,
        value: item.ID.toString()
      })
    })
    return options;
  }

  return <>

    <MyListingGridHead
      items={[
        {
          count: 0,
          title: "Lite Plan",
          titleSmall: "(Free)",
          label: "Sep26, 2026",
        },
        {
          count: 0,
          title: "Out of 3",
          label: "Listing Capacity",
        },
        {
          count: 0,
          title: "Out of 1",
          label: "Spotlight Badge",
        },
        {
          count: 0,
          title: "Out of 1",
          label: "Featured Badge",
        },
        {
          count: 0,
          title: "Out of 1",
          label: "Professional Badge",
        }

      ]}
    />

    <p className="my-listing-paragraph">
      Create your business listing on Gentleroad to start building customers.
    </p>

    <MLCotentWrap sidebarItems={{
      items: listing_filters_edited()
    }}>
      <form onSubmit={() => { }} className="form-dashboard">
        <Container>
          <Row>
            <Col md={12}>
              {/* Old Password Input */}
              <TextInput
                id="listing-items"
                label="" // As requested, no label
                onChange={(e) => { setSelectedListing(e.target.value) }}
                type="select" // Use type="password" for security
                value={selectedListing}
                placeholder="Listing Items"
                options={[
                  { label: "Select Spotlight Badge Listings", value: "" },
                  // { label: "Example", value: "Example" }
                  ...MyListingsOptions()
                ]}
              />
            </Col>
          </Row>

          <Row className="row-footer-buttons">
            <Col>
              {/* Submit Button */}
              <Button
                className={selectedListing === "" ? "disabled" : ""}
                variant="success" type="button" onClick={() => {
                  // /Dashboard/MyListing/UpdateListing?listingId=610
                  router.push(`/Dashboard/MyListing/UpdateListing?listingId=${selectedListing}`);
                }}>Update Spotlight Badges</Button>
            </Col>
          </Row>
        </Container>
      </form>
    </MLCotentWrap>

  </>
}