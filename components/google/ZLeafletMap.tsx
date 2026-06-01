"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ZLeafletMapZoomButtons, {
  ZLeafletMapEvents,
} from "./ZLeafletMapZoomButtons";
import Image from "next/image";
import icon_pin from "./../../assets/images/icon-pin.svg";
import { useMyListing } from "@/app/Dashboard/MyListing/AddNewListing/MyListingProviderEditor";
import { useEffect } from "react";
import { renderToStaticMarkup } from "react-dom/server";

function MapUpdater({
  lat,
  lng,
  zoom,
}: {
  lat: number;
  lng: number;
  zoom: number;
}) {
  const map = useMap(); // Now this works because it's a CHILD of MapContainer

  useEffect(() => {
    if (lat && lng) {
      // Use flyTo for a smooth move, or setView for an instant jump
      map.setView([lat, lng], zoom, { animate: false });
    }
  }, [lat, lng, zoom, map]);

  return null; // This component doesn't render anything visual
}

export default function ZLeafletMap({
  onLocationChange,
  initPositionAndZoom,
}: {
  onLocationChange: (
    lat: number,
    lng: number,
    address: string,
    zoom: number,
    postcode: string,
    city: string,
  ) => void;
  initPositionAndZoom?: {
    lat: number;
    lng: number;
    zoom: number;
    disableNavigation?: boolean;
  };
}) {
  /*const {
    location_map_lat,
    location_map_lng,
    location_map_address,
    setLocationMapLat,
    setLocationMapLng,
    setLocationMapAddress
  } = useMyListing();*/

  const position: [number, number] = [
    initPositionAndZoom?.lat || 39.95185892663005,
    initPositionAndZoom?.lng || -75.13000488281251,
  ]; // Minsk coordinates
  /*const icon = L.icon({
    iconUrl: 'path/to/your/icon.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });*/

  /*useEffect(() => {
    if (initPositionAndZoom === undefined) return;
    const map = useMap();
    map.setView([initPositionAndZoom.lat, initPositionAndZoom.lng], initPositionAndZoom.zoom);
  }, []);*/

  // 1. Convert your React element into an HTML string for Leaflet
  const customHtmlString = renderToStaticMarkup(
    <div className="icon-marker-center">
      <Image src={icon_pin} alt="Pin" width={40} height={40} />
    </div>,
  );

  // 2. Create the Leaflet DivIcon wrapper
  const movingCustomIcon = L.divIcon({
    html: customHtmlString,
    className: "custom-moving-pin", // Removes default white square box styles
    iconSize: [40, 40], // Matches the size layout of your element
    iconAnchor: [20, 40], // X (half width), Y (full height) so the tip points exactly to the coordinate
  });

  return (
    <div
      className="map-wrap"
      style={{
        pointerEvents:
          initPositionAndZoom?.disableNavigation === true ? "none" : "auto",
      }}
    >
      <MapContainer
        zoomControl={false}
        center={position}
        zoom={initPositionAndZoom?.zoom || 15}
        style={{ height: "calc(30.8*var(--delta))", width: "100%" }}
      >
        {initPositionAndZoom !== undefined && (
          <MapUpdater
            lat={initPositionAndZoom.lat}
            lng={initPositionAndZoom.lng}
            zoom={initPositionAndZoom.zoom}
          />
        )}

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/*<Marker position={position} icon={icon}>
        <Popup>Kastrychnitskaya Street</Popup>
      </Marker>*/}

        {/* 3. Render your pin securely pinned to the dynamic coordinates */}
        <Marker position={position} icon={movingCustomIcon}>
          <Popup>Kastrychnitskaya Street</Popup>
        </Marker>

        {/*
          <div className="icon-marker-center">
          <Image src={icon_pin} alt="Pin" />
        </div>
          */}

        <ZLeafletMapEvents
          onLocationChange={(lat, lng, address, zoom, city, postcode) => {
            // console.log(lat, lng, address, zoom, postcode, city);
            /*setLocationMapLat(lat);
        setLocationMapLng(lng);
        setLocationMapAddress(address);*/
            onLocationChange(lat, lng, address, zoom, city, postcode);
          }}
        />

        {initPositionAndZoom?.disableNavigation !== true && (
          <ZLeafletMapZoomButtons />
        )}
      </MapContainer>
    </div>
  );
}
