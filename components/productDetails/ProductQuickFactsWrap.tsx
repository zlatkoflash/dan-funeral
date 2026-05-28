"use client";

import { useMyListing } from "@/app/Dashboard/MyListing/AddNewListing/MyListingProviderEditor";
import ProductQuickFacts from "./ProductQuickFacts";
import { formatWorkingHours, formatWorkingHoursV2 } from "@/utils/listing";
import { IE13Language } from "@/app/Dashboard/MyListing/content/ListingEditor/content/LE13Languages";
import { ILE10ServiceOffering } from "@/app/Dashboard/MyListing/content/ListingEditor/content/LE10ServiceOffering";

export default function ProductQuickFactsWrap() {
  const { listing, locationIndex } = useMyListing();

  if (!listing) return <></>;

  const ServicesOffered: { label: string }[] = [];
  listing.serviceOffering.forEach((service: ILE10ServiceOffering) => {
    ServicesOffered.push({ label: service.name });
  });

  return (
    <>
      <ProductQuickFacts
        facts={[
          {
            label: "Services Offered",
            // value: "Burial, Cremation, Green Options",
            value: ServicesOffered.map(
              (service: { label: string }) => service.label,
            ).join(", "),
            icon: undefined,
          },
          {
            label: "Service Area",
            // value: "Greater Chicago & Surroundings",
            // value: listing.location.map_address,
            value:
              listing.services_areas_and_categories.locations[locationIndex]
                ?.display_name,
            icon: undefined,
          },
          {
            label: "Languages Spoken",
            value: listing.languages
              .map(
                (language: IE13Language) =>
                  `${language.name}(${language.native_name}) `,
              )
              .join(", "),
            icon: undefined,
          },
          {
            label: "Availability",
            // value: "24/7 including holidays",
            value: formatWorkingHoursV2(listing.businessHoursV2),
            icon: undefined,
          },
          // { label: "Pricing", value: "Starts at $1,500", icon: dollarIcon },
          {
            label: "Years in Operation",
            // value: "40+ Years",
            //
            value: isNaN(
              parseInt(listing.identity_and_narrative.year_business_founded),
            )
              ? "-"
              : new Date().getFullYear() -
                parseInt(listing.identity_and_narrative.year_business_founded) +
                "+ Years",
            icon: undefined,
          },
          {
            label: "Phone Number",
            value: listing.identity_and_narrative.phone_number || "-",
            icon: undefined,
          },
          {
            label: "Website",
            value: listing.identity_and_narrative.website || "-",
            icon: undefined,
          },
        ]}
      />
    </>
  );
}
