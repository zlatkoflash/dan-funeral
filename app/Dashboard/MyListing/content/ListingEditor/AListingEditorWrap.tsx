"use client"

import MLCotentWrap from "../MLCotentWrap";
import { Button, Col, Container, Row } from "react-bootstrap";
import { IMLSidebarMenuItem } from "../MLSidebarMenu";
import TextInput from "@/components/forms/Input";
import { useMyListing } from "../../AddNewListing/MyListingProviderEditor";
import LE1AboutListing from "./content/LE1AboutListing";
import LE2ListingCategory from "./content/LE2ListingCategory";
import LE3ListingLocation from "./content/LE3ListingLocation";
import LE4UploadImages from "./content/LE4UploadImages";
import LE5Pricing from "./content/LE5Pricing";
import LE6WorkingHours from "./content/LE6WorkingHours";
import LE7ListingVideo from "./content/LE7ListingVideo";
import LE8MyTeam from "./content/LE8MyTeam";
import LE9FAQs from "./content/LE9FAQs";
import LE10ServiceOffering from "./content/LE10ServiceOffering";
import LE11RoomFacilities from "./content/LE11RoomFacilities";
import LE12PreferredVendors from "./content/LE12PreferredVendors";
import LE10_1ProductOfferings from "./content/LE10_1ProductOfferings";

export default function AListingEditorWrap() {

  const { listing, activeMyListingSlug, setActiveMyListingSlug, validation } = useMyListing();

  const sidebarMenuItems: IMLSidebarMenuItem[] = [
    {
      title: "About Listing",
      value: "about-listing",
      error: validation.aboutHasErrors
    },
    {
      title: "Listing Category",
      value: "listing-category",
      error: validation.categoryHasErrors
    },
    {
      title: "Listing Location",
      value: "listing-location",
      error: validation.locationHasErrors
    },
    {
      title: "Upload Images",
      value: "upload-images",
      error: validation.mediaHasErrors
    },
    {
      title: "Pricing",
      value: "pricing",
      error: validation.pricingHasErrors
    },
    {
      title: "Working Hours",
      value: "working-hours",
    },
    {
      title: "Listing Video",
      value: "listing-video",
    },
    {
      title: "My Team",
      value: "my-team",
      error: validation.teamMembersHasErrors
    },
    {
      title: "Faq's",
      value: "faqs",
      error: validation.faqsHasErrors
    },
    {
      title: "Service Offerings",
      value: "service-offerings",
    },
    {
      title: "Product Offerings",
      value: "product-offerings",
    },
    {
      title: "Room Facilities",
      value: "room-facilities",
    },
    {
      title: "Preferred Vendors",
      value: "preferred-vendors",
      error: validation.vendorHasErrors
    },

  ];

  const sidebarMenuItemsEdited = () => {
    // return [];
    return sidebarMenuItems.map((item, index) => {
      return {
        ...item,
        onclick: () => {
          console.log(item.title);
          setActiveMyListingSlug(item.value as string)
        }
      }
    })
  }

  return <>

    <MLCotentWrap sidebarItems={{
      items: sidebarMenuItemsEdited(),
      activeMenuValue: activeMyListingSlug
    }}>
      {
        (
          () => {
            const canSave = sidebarMenuItems.filter(item => item.error === true).length === 0;

            if (activeMyListingSlug === "about-listing" || activeMyListingSlug === "") {
              return <LE1AboutListing />
            }
            if (activeMyListingSlug === "listing-category") {
              return <LE2ListingCategory />
            }
            if (activeMyListingSlug === "listing-location") {
              return <LE3ListingLocation />
            }
            if (activeMyListingSlug === "upload-images") {
              return <LE4UploadImages />
            }
            if (activeMyListingSlug === "pricing") {
              return <LE5Pricing />
            }
            if (activeMyListingSlug === "working-hours") {
              return <LE6WorkingHours />
            }
            if (activeMyListingSlug === "listing-video") {
              return <LE7ListingVideo />
            }
            if (activeMyListingSlug === "my-team") {
              return <LE8MyTeam />
            }
            if (activeMyListingSlug === "faqs") {
              return <LE9FAQs />
            }
            if (activeMyListingSlug === "service-offerings") {
              return <LE10ServiceOffering />
            }
            if (activeMyListingSlug === "product-offerings") {
              return <LE10_1ProductOfferings />
            }

            if (activeMyListingSlug === "room-facilities") {
              return <LE11RoomFacilities />
            }
            if (activeMyListingSlug === "preferred-vendors") {
              return <LE12PreferredVendors />
            }

            return <>Undefined content for Listing Editor</>;
          }
        )()
      }

    </MLCotentWrap>
  </>
}