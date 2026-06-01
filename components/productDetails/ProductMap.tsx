"use client";

import { useMyListing } from "@/app/Dashboard/MyListing/AddNewListing/MyListingProviderEditor";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import ZDropdown from "../forms/ZDropdown";

export default function ProductMap() {
  const {
    listingSettings,
    listing,
    setListing,
    setActiveMyListingSlug,
    locationIndex,
    setLocationIndex,
  } = useMyListing();

  const location =
    listing.services_areas_and_categories.locations[locationIndex];

  console.log("location for map: ", location);

  /*if (!listing.location.map_lat || !listing.location.map_lng || !listing.location.map_zoom) {
    return null;
  }*/
  if (location === undefined) {
    return <></>;
  }
  const MapMemoDynamic = useMemo(
    () =>
      dynamic(() => import("@/components/google/ZLeafletMap"), {
        ssr: false, // This is the magic line that kills the error
        loading: () => (
          <div
            style={{ height: "calc(30.8*var(--delta))", background: "#eee" }}
          />
        ),
      }),
    [],
  );

  return (
    <section className="product-map">
      <div className="heading-location-selector">
        <ZDropdown
          variant="dropdown-for-sort"
          data={listing.services_areas_and_categories.locations.map(
            (location, index) => ({
              value: index.toString(),
              label: location.display_name,
              text: location.display_name,
            }),
          )}
          value={location.display_name}
          onChange={(v) => {
            setLocationIndex(Number(v));
          }}
        />
      </div>
      {/*<h2>Map</h2>*/}
      <MapMemoDynamic
        onLocationChange={(
          lat: number,
          lng: number,
          address: string,
          zoom: number,
          city: string,
          postcode: string,
        ) => {}}
        initPositionAndZoom={{
          /*lat: listing.location.map_lat,
          lng: listing.location.map_lng,
          zoom: listing.location.map_zoom,*/
          lat: location.lat,
          lng: location.lng,
          zoom: 15,
          // disableNavigation: true,
        }}
      />
    </section>
  );
}
