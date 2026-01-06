"use client";

import { useMap } from 'react-leaflet';
import { useMapEvents } from 'react-leaflet';

import icon_plus from './../../assets/images/icon-circle-plus.svg'
import icon_minus from './../../assets/images/icon-circle-minus.svg'
import Image from 'next/image';


export default function ZLeafletMapZoomButtons() {
  const map = useMap();

  const handleZoomIn = () => {
    map.zoomIn();
  };

  const handleZoomOut = () => {
    map.zoomOut();
  };

  return (
    <div className="map-buttonz-zoom">
      <button
        onClick={handleZoomIn}
        type="button"
        className="btn-zoom btn-zoom-in"
        title="Zoom In"
      >
        <Image src={icon_plus} alt="Zoom In" />
      </button>

      <button
        onClick={handleZoomOut}
        type="button"
        className="btn-zoom btn-zoom-out"
        title="Zoom Out"
      >
        <Image src={icon_minus} alt="Zoom Out" />
      </button>
    </div>
  );
}


interface MapEventsProps {
  // Added zoom to the callback signature
  onLocationChange: (
    lat: number, lng: number, address: string, zoom: number,
    city: string, postcode: string
  ) => void;
}

export function ZLeafletMapEvents({ onLocationChange }: MapEventsProps) {
  const map = useMapEvents({
    moveend: async () => {
      const center = map.getCenter();
      const zoom = map.getZoom(); // Get the current zoom level
      const { lat, lng } = center;

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
        );
        const data = await response.json();
        const address = data.display_name || "Address not found";
        console.log("data map:", data);
        let cityFor = data.address.city;
        if (cityFor === undefined) cityFor = data.address.town;
        if (cityFor === undefined) cityFor = data.address.village;
        if (cityFor === undefined) cityFor = data.address.state;
        if (cityFor === undefined) cityFor = data.address.county;

        // Pass all 4 values back to the parent
        onLocationChange(lat, lng, address, zoom, cityFor, data.address.postcode);
      } catch (error) {
        console.error("Error fetching address:", error);
        onLocationChange(lat, lng, "Error fetching address", zoom, "", "");
      }
    },
  });

  return null;
}