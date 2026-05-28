"use client";

import Image from "next/image";
import ZStars from "../stars/ZStars";

import locationIcon from "./../../assets/images/icon-location-gray.svg";
import { useMyListing } from "@/app/Dashboard/MyListing/AddNewListing/MyListingProviderEditor";
import VerifiedBadge from "../badges/VerifiedBadge";

export default function ProductTitleAndFeedback() {
  const {
    listingSettings,
    listing,
    setListing,
    setActiveMyListingSlug,
    locationIndex,
  } = useMyListing();

  console.log("ProductTitleAndFeedback listing:", listing);
  console.log("ProductTitleAndFeedback location:", listing.location);

  return (
    <section className="product-title-and-feedback">
      <h1>{listing.identity_and_narrative.business_name}</h1>
      <div className="stars-and-location">
        <ZStars value={listing.rating_value} size="larger" />
        <div className="location">
          <Image
            src={locationIcon}
            alt={
              // listing.location.listing_address
              listing.services_areas_and_categories.locations[locationIndex]
                ?.display_name
            }
            width={30}
            height={30}
          />{" "}
          {
            //  listing.location.listing_address
            listing.services_areas_and_categories.locations[locationIndex]
              ?.display_name
          }
        </div>
        {listing.owner.verification.isVerifiedByAdmin === true && (
          <div className="ml-4">
            <VerifiedBadge />
          </div>
        )}
      </div>
    </section>
  );
}
