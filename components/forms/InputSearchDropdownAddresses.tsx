import { useEffect, useState } from "react";
import InputSearchDropdown from "@/components/forms/InputSearchDropdown";

export default function InputSearchDropdownAddresses({
  onSelect,
  searchAddressDefaultText = "",
  placeholder = "Search location..."
}: {
  onSelect?: (item: {
    lat: number;
    lng: number;
    display_name: string;
  }) => void;
  searchAddressDefaultText?: string;
  placeholder?: string;
}) {


  const [searchAddressTerm, setSearchAddressTerm] = useState<string>(searchAddressDefaultText);
  const [searchItems, setSearchItems] = useState<{ label: string; value: string, data: any }[]>([]);

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

  return (
    <InputSearchDropdown
      options={searchItems}
      value={searchAddressTerm}
      onSelect={(item) => {
        const mapaData = item.data;
        /*setLocationMapLat(mapaData.lat);
        setLocationMapLng(mapaData.lon);
        setLocationMapAddress(mapaData.display_name);*/
        if (onSelect) {
          onSelect({
            lat: mapaData.lat,
            lng: mapaData.lon,
            display_name: mapaData.display_name
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