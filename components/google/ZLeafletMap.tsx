"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import ZLeafletMapZoomButtons, { ZLeafletMapEvents } from './ZLeafletMapZoomButtons';
import Image from 'next/image';
import icon_pin from './../../assets/images/icon-pin.svg'
import { useMyListing } from '@/app/Dashboard/MyListing/AddNewListing/MyListingProviderEditor';

export default function ZLeafletMap({ onLocationChange, initPositionAndZoom }: { onLocationChange: (lat: number, lng: number, address: string, zoom: number, postcode: string, city: string) => void, initPositionAndZoom?: { lat: number, lng: number, zoom: number, disableNavigation?: boolean } }) {

  /*const {
    location_map_lat,
    location_map_lng,
    location_map_address,
    setLocationMapLat,
    setLocationMapLng,
    setLocationMapAddress
  } = useMyListing();*/

  const position: [number, number] = [initPositionAndZoom?.lat || 39.95185892663005, initPositionAndZoom?.lng || -75.13000488281251]; // Minsk coordinates
  /*const icon = L.icon({
    iconUrl: 'path/to/your/icon.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });*/

  return (<div className="map-wrap" style={{
    pointerEvents: initPositionAndZoom?.disableNavigation === true ? 'none' : 'auto'
  }}>
    <MapContainer
      zoomControl={false}
      center={position}
      zoom={initPositionAndZoom?.zoom || 15}
      style={{ height: 'calc(30.8*var(--delta))', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/*<Marker position={position} icon={icon}>
        <Popup>Kastrychnitskaya Street</Popup>
      </Marker>*/}

      <div className="icon-marker-center">
        <Image src={icon_pin} alt="Pin" />
      </div>

      <ZLeafletMapEvents onLocationChange={(lat, lng, address, zoom, city, postcode) => {
        // console.log(lat, lng, address, zoom, postcode, city);
        /*setLocationMapLat(lat);
        setLocationMapLng(lng);
        setLocationMapAddress(address);*/
        onLocationChange(lat, lng, address, zoom, city, postcode);
      }} />

      {
        initPositionAndZoom?.disableNavigation !== true && <ZLeafletMapZoomButtons />
      }

    </MapContainer>
  </div>
  );
}