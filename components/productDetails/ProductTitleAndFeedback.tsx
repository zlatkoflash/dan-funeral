"use client"

import Image from "next/image";
import ZStars from "../stars/ZStars";

import locationIcon from './../../assets/images/icon-location-gray.svg';
import { useMyListing } from "@/app/Dashboard/MyListing/AddNewListing/MyListingProviderEditor";

export default function ProductTitleAndFeedback() {
  const {
    listingSettings,
    listing,
    setListing,
    setActiveMyListingSlug
  } = useMyListing();
  return <section className="product-title-and-feedback">
    <h1>{listing.about.title}</h1>
    <div className="stars-and-location">
      <ZStars value={5} size="larger" />
      <div className="location">
        <Image src={locationIcon} alt="Serves Chicago, IL" width={30} height={30} /> Serves {listing.location.listing_address}, {listing.location.listing_pincode_zipcode}
      </div>
    </div>
  </section>
}