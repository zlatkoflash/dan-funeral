import TextInput from "@/components/forms/Input";
import { Col, Container, Row } from "react-bootstrap";
import AButtonUpdateCreateListing from "./AButtonUpdateCreateListing";
import iconLinkedIn from "@/assets/images/icon-linked-in.svg";
import ZGoogleMap from "@/components/google/ZGoogleMap";
import ZLeafletMap from "@/components/google/ZLeafletMap";
import { useMyListing } from "../../../AddNewListing/MyListingProviderEditor";
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import InputSearchDropdown from "@/components/forms/InputSearchDropdown";

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

  const [searchAddressTerm, setSearchAddressTerm] = useState<string>("");
  const [searchItems, setSearchItems] = useState<{ label: string; value: string, data: any }[]>([]);

  // 1. Update the function to accept 'address' as an argument
  const __LoadTheLocations = async (address: string) => {
    // Use the argument 'address' instead of the state variable
    if (address.length < 3) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
        {
          headers: { 'User-Agent': 'YourAppName/1.0' }
        }
      );
      const data = await response.json();

      const newItems = data.map((item: any) => ({
        label: item.display_name,
        value: `${item.lat},${item.lon}`,
        data: item,
      }));

      setSearchItems(newItems);
      console.log("newItems set:", newItems);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  // 2. Pass the search term into the function inside the useEffect
  useEffect(() => {
    if (!searchAddressTerm.trim() || searchAddressTerm.length < 3) {
      setSearchItems([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      // PASS THE STATE HERE so the function gets the fresh value
      __LoadTheLocations(searchAddressTerm);
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [searchAddressTerm]);


  return <form onSubmit={() => { }} className="form-dashboard">
    <Container>
      <Row>
        <Col>
          <h3 className="title text-start">Listing Location</h3>
        </Col>
      </Row>
      {
        /*<Row>
        <Col md={12}>
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
      </Row>*/
      }

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
          {
            /*<TextInput
            id="listing-map-maker-address"
            onChange={(e) => {
              setLocationMapAddress(e.target.value)
            }}
            type="text" // Use type="password" for security
            value={location_map_address}
            placeholder="Map Maker Address"
          />*/
          }
          <InputSearchDropdown
            value={location_map_address}
            onChangeText={(text) => {
              // setLocationMapAddress(text)

              // __LoadTheLocations(text);

              setSearchAddressTerm(text);

            }}
            onSelect={(item) => {
              // setLocationMapAddress(item.label)
              const mapaData = item.data;
              setLocationMapLat(mapaData.lat);
              setLocationMapLng(mapaData.lon);
              setLocationMapAddress(mapaData.display_name);
            }}
            options={searchItems}
          />
        </Col>
        <Col md={3}>
          <TextInput
            id="listing-map-maker-latitude"
            onChange={(e) => {
              // setLocationMapLat(Number(e.target.value))
            }}
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
            initPositionAndZoom={{
              lat: location_map_lat,
              lng: location_map_lng,
              zoom: location_map_zoom
            }}
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