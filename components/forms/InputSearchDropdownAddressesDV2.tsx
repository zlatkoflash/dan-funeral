import { useEffect, useState } from "react";
import InputSearchDropdown from "@/components/forms/InputSearchDropdown";


export interface ILocationItemSelected {
  lat: number;
  lng: number;
  display_name: string;
  city: string;
  country: string;
  country_code: string;
  postcode: string;
  place_id: string;
  zoom?: number;
}

export default function InputSearchDropdownAddressesDV2({
  onSelect,
  searchAddressDefaultText = "",
  placeholder = "Search location...",
  label=""
}: {
  onSelect?: (item: ILocationItemSelected) => void;
  searchAddressDefaultText?: string;
  placeholder?: string;
  label?: string;
}) {


  const [searchAddressTerm, setSearchAddressTerm] = useState<string>(searchAddressDefaultText);
  const [searchItems, setSearchItems] = useState<{ label: string; value: string, data: any }[]>([]);

  const __LoadTheLocations = async (address: string) => {
    // Use the argument 'address' instead of the state variable
    if (address.length < 3) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(address)}`,
        {
          headers: { 'User-Agent': 'YourAppName/1.0' }
        }
      );
      const data = await response.json();

      console.log("data locations:", data);

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

  return (
    <InputSearchDropdown
      options={searchItems}
      value={searchAddressTerm}
      label={label}
      onSelect={(item) => {
        const mapaData = item.data;
        /*setLocationMapLat(mapaData.lat);
        setLocationMapLng(mapaData.lon);
        setLocationMapAddress(mapaData.display_name);*/
        if (onSelect) {
          onSelect({

            lat: mapaData.lat,
            lng: mapaData.lon,
            display_name: mapaData.display_name,

            city: mapaData.address.city,
            country: mapaData.address.country,
            country_code: mapaData.address.country_code,
            postcode: mapaData.address.postcode,

            place_id: mapaData.place_id,

          });
        }

      }}
      onChangeText={(text) => {
        setSearchAddressTerm(text);
      }}
      placeholder={placeholder}
    />
  );
}