"use client"

import Image from "next/image";
import ZStars from "../stars/ZStars";

import locationIcon from './../../assets/images/icon-location-gray.svg';
import { useMyListing } from "@/app/Dashboard/MyListing/AddNewListing/MyListingProviderEditor";
import VerifiedBadge from "../badges/VerifiedBadge";

export default function ProductTitleAndFeedback() {
  const {
    listingSettings,
    listing,
    setListing,
    setActiveMyListingSlug
  } = useMyListing();

  console.log("ProductTitleAndFeedback listing:", listing);
  console.log("ProductTitleAndFeedback location:", listing.location);

  return <section className="product-title-and-feedback">
    <h1>{listing.about.title}</h1>
    <div className="stars-and-location">
      <ZStars value={5} size="larger" />
      <div className="location">
        <Image src={locationIcon} alt={listing.location.listing_address} width={30} height={30} /> {listing.location.listing_address}, {listing.location.listing_pincode_zipcode}
      </div>
      {
        listing.owner.verification.isVerifiedByAdmin === true && <div className="ml-4"><VerifiedBadge /></div>
      }
    </div>
  </section>
}