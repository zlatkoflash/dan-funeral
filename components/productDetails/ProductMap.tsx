"use client"

import { useMyListing } from '@/app/Dashboard/MyListing/AddNewListing/MyListingProviderEditor';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

export default function ProductMap() {

  const {
    listingSettings,
    listing,
    setListing,
    setActiveMyListingSlug
  } = useMyListing();

  if (!listing.location.map_lat || !listing.location.map_lng || !listing.location.map_zoom) {
    return null;
  }

  const MapMemoDynamic = useMemo(() => dynamic(
    () => import('@/components/google/ZLeafletMap'),
    {
      ssr: false, // This is the magic line that kills the error
      loading: () => <div style={{ height: 'calc(30.8*var(--delta))', background: '#eee' }} />
    }
  ), []);

  return <section className="product-map">
    {
      /*<h2>Map</h2>*/
    }
    <MapMemoDynamic onLocationChange={(lat: number, lng: number, address: string, zoom: number, city: string, postcode: string) => { }} initPositionAndZoom={{ lat: listing.location.map_lat, lng: listing.location.map_lng, zoom: listing.location.map_zoom, disableNavigation: true }} />
  </section>
}