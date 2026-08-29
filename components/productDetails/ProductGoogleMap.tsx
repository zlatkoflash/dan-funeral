"use client";

import { useMyListing } from "@/app/Dashboard/MyListing/AddNewListing/MyListingProviderEditor";

export default function ProductGoogleMap() {

  const {
    // listingSettings,
    listing,
    // setListing,
    // setActiveMyListingSlug,
    // locationIndex,
    // setLocationIndex,
  } = useMyListing();


  const location =
    // listing.services_areas_and_categories.locations[locationIndex]
    listing.location_primary
    ;

  if (!location || !location.display_name) return <></>

  return <>
    <section className="product-map">
      <div className="map-wrap">

        <iframe
          style={{ border: 0, width: "100%", height: "calc(30.8*var(--delta))" }}
          loading="lazy"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(location.display_name)}&t=&z=18&ie=UTF8&iwloc=&output=embed`}
        >
        </iframe>
      </div>
    </section>

  </>
}