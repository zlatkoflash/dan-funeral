import TextInput from "@/components/forms/Input";
import { Col, Container, Row } from "react-bootstrap";
import AButtonUpdateCreateListing from "./AButtonUpdateCreateListing";
import iconLinkedIn from "@/assets/images/icon-linked-in.svg";
import ZGoogleMap from "@/components/google/ZGoogleMap";
import ZLeafletMap from "@/components/google/ZLeafletMap";
import { useMyListing } from "../../../AddNewListing/MyListingProviderEditor";
import { useState } from "react";
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

export interface ILE3ListingLocation {
  location: string,
  listing_address: string,
  listing_pincode_zipcode: string,
  map_address: string,
  map_lat: number,
  map_lng: number,
  map_zoom: number,

  map_city: string,
  map_postcode: string
}

export default function LE3ListingLocation() {

  // Use useMemo to prevent the map from "blinking" or re-loading unnecessarily
  const MapMemoDynamic = useMemo(() => dynamic(
    () => import('@/components/google/ZLeafletMap'),
    {
      ssr: false, // This is the magic line that kills the error
      loading: () => <div style={{ height: 'calc(30.8*var(--delta))', background: '#eee' }} />
    }
  ), []);

  const {
    /*location_map_lat,
    location_map_lng,
    location_map_address,*/
    listing,
    setListing,
    setActiveMyListingSlug,

    LE3Location,
    setLE3Location
  } = useMyListing();


  const [location_category, setLocationCategory] = useState<string>(LE3Location.location);

  const [listing_address, setListingAddress] = useState<string>(LE3Location.listing_address);
  const [listing_pincode_zipcode, setListingPincodeZipcode] = useState<string>(LE3Location.listing_pincode_zipcode);


  const [location_map_lat, setLocationMapLat] = useState<number>(LE3Location.map_lat);
  const [location_map_lng, setLocationMapLng] = useState<number>(LE3Location.map_lng);
  const [location_map_address, setLocationMapAddress] = useState<string>(LE3Location.map_address);
  const [location_map_zoom, setLocationMapZoom] = useState<number>(LE3Location.map_zoom);

  const [location_city_map, setLocationCityMap] = useState<string>(LE3Location.map_city);
  const [location_postcode_map, setLocationPostcodeMap] = useState<string>(LE3Location.map_postcode);

  return <form onSubmit={() => { }} className="form-dashboard">
    <Container>
      <Row>
        <Col>
          <h3 className="title text-start">Listing Location</h3>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          {/* Old Password Input */}
          <TextInput
            icon={iconLinkedIn}
            id="listing-location"
            onChange={(e) => { setLocationCategory(e.target.value) }}
            type="select" // Use type="password" for security
            value={location_category}
            // placeholder="Listing Title"
            options={[
              { label: "Select Location", value: "" },
              { label: "Example", value: "Example" }
            ]}
          />
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <h3 className="title text-start">Address and Pincode</h3>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <TextInput

            id="listing-address"
            onChange={(e) => {
              setListingAddress(e.target.value)
            }}
            type="text" // Use type="password" for security
            value={listing_address}
            placeholder="Listing Address"
          />
        </Col>
        <Col md={6}>
          <TextInput

            id="listing-pincode-zipcode"
            onChange={(e) => { setListingPincodeZipcode(e.target.value) }}
            type="text" // Use type="password" for security
            value={listing_pincode_zipcode}
            placeholder="Pin code / Zip Code"
          />
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <h3 className="title text-start">Map Location</h3>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <TextInput
            id="listing-map-maker-address"
            onChange={(e) => { }}
            type="text" // Use type="password" for security
            value={location_map_address}
            placeholder="Map Maker Address"
          />
        </Col>
        <Col md={3}>
          <TextInput
            id="listing-map-maker-latitude"
            onChange={(e) => { }}
            type="text" // Use type="password" for security
            value={location_map_lat.toString()}
            placeholder="Latitude"
          />
        </Col>
        <Col md={3}>
          <TextInput
            id="listing-map-maker-longitude"
            onChange={(e) => { }}
            type="text" // Use type="password" for security
            value={location_map_lng.toString()}
            placeholder="Longitude"
          />
        </Col>
      </Row>

      <Row>
        <Col>


          <MapMemoDynamic
            initPositionAndZoom={{ lat: location_map_lat, lng: location_map_lng, zoom: location_map_zoom }}
            onLocationChange={(
              lat: number,
              lng: number,
              address: string,
              zoom: number,
              city: string,
              postcode: string,

            ) => {
              setLocationMapLat(lat);
              setLocationMapLng(lng);
              setLocationMapAddress(address);
              setLocationMapZoom(zoom);

              /**
               * Those 2 variables are most important for the search engine
               */
              console.log("postcode:", postcode);
              console.log("city:", city);
              setLocationCityMap(city);
              setLocationPostcodeMap(postcode);
            }} />

        </Col>
      </Row>

      <AButtonUpdateCreateListing
        onContinue={() => {
          // setActiveMyListingSlug('listing-category')
          /*setListing({
            ...listing,
            location: {
              location: location_category,
              listing_address: listing_address,
              listing_pincode_zipcode: listing_pincode_zipcode,
              map_address: location_map_address,
              map_lat: location_map_lat,
              map_lng: location_map_lng,
              map_zoom: location_map_zoom,
              map_city: location_city_map,
              map_postcode: location_postcode_map
            }
          });*/
          setActiveMyListingSlug('upload-images');
        }}
        onSubmit={() => {
        }}
        inputsData={{
          data: {
            location: location_category,
            listing_address: listing_address,
            listing_pincode_zipcode: listing_pincode_zipcode,
            map_address: location_map_address,
            map_lat: location_map_lat,
            map_lng: location_map_lng,
            map_zoom: location_map_zoom,
            map_city: location_city_map,
            map_postcode: location_postcode_map
          }
        }}
        savingPartType="location"
      />
    </Container>
  </form>
}