import { IListing } from "@/app/Dashboard/MyListing/AddNewListing/MyListingProviderEditor";
import { getApiData } from "./api";
import { ILE1AboutListing } from "@/app/Dashboard/MyListing/content/ListingEditor/content/LE1AboutListing";
import { IProductPanel } from "@/components/products/ProductPanel";
import { ListingForPage } from "@/ContextProvider/ListingCardsProvider";
// import { useRouter } from "next/navigation";


export interface IListingFilters {
  zip: string;
  city: string;
  itemsPerPage: number;
  pageIndex: number;
  latitude: string;
  longitude: string;
}


/**
 * 
 * @param listingId 
 * @param listing 
 * @returns 
 * This function is deprecated
 */
export const SaveTheListing = async (listingId: string | undefined, listing: IListing) => {
  const formData = new FormData();

  const listingOptimizedForPost = JSON.parse(JSON.stringify(listing));
  listingOptimizedForPost.media.featured_image.preview = "preview-url-disabled-for-post";

  console.log("listingOptimizedForPost:", listingOptimizedForPost);

  formData.append("listingId", listingId || "");
  formData.append("listing", JSON.stringify(listingOptimizedForPost));

  if (listing.media.featured_image.isNew && listing.media.featured_image.file !== null) {
    formData.append("featured_image", listing.media.featured_image.file);
  }

  const response = await getApiData<{ ok: boolean, status: number, message: string, listingId: string }>(`/listings/save-listing`, "POST", formData, "authorize", "multipart/form-data");

  return response;
}

export type TSavingPartType = "about" | "category" | "location" | "media" | "pricing" | "businessHours" | "video" | "teamMembers" | "faqs" | "service-offering" | "product-offering" | "room-facilities" | "preffered-vendors";
export const SaveTheListingPart = async (
  listingId: number,
  savingPartType: TSavingPartType,
  dataForsaving: any,
  file?: File
) => {

  console.log("Starting to saving the part...");

  const formData = new FormData();

  formData.append("listing-id", listingId.toString());
  formData.append("saving-part-type", savingPartType);
  formData.append("data-for-saving", JSON.stringify(dataForsaving));
  // formData.append("data-for-saving", JSON.stringify(dataForsaving));

  if (file !== undefined) {
    formData.append("file", file);
  }

  const response = await getApiData<{ ok: boolean, status: number, message: string, listingId: string }>(`/listings/save-listing-partial?c=${Math.random()}`, "POST", formData, "authorize", "multipart/form-data");
  console.log("res save-listing-partialponse:", response);

  return response;
}


export const CreateNewListing = async (aboutDetails: ILE1AboutListing) => {

  const formData = new FormData();

  // formData.append("about", JSON.stringify(aboutDetails));
  formData.append("title", aboutDetails.title);
  formData.append("description", aboutDetails.description);

  const response = await getApiData<{ ok: boolean, listing_id: number }>(`/listings/create-new-listing`, "POST", formData, "authorize", "multipart/form-data");
  console.log("response:", response);

  return response;
}


export const FetchLocationsForTheSearchBar = async (searchText: string) => {

  const response = await getApiData<{
    ok: boolean, status: number, message: string, locations: {
      city: string,
      postcode: string,
      latitude: string,
      longitude: string
    }[]
  }>(`/listings/fetch-locations-for-the-search-bar?q=${encodeURIComponent(searchText)}`, "GET", null, "not-authorize");
  console.log("response search results:", response);

  return response;
}

export const executeSearchFiltersRedirect = ({
  /*paramName,
  paramValue,*/
  paramsArray,
  router,
  currentParams, // Pass existing params so you don't lose other filters
  pageIndex
}: {
  /*paramName: string;
  paramValue: string;*/
  paramsArray: { paramName: string; paramValue: string }[],
  router: any;
  currentParams?: URLSearchParams;
  pageIndex: number
}) => {

  if (isNaN(pageIndex)) {
    console.error("pageIndex is not a number");
    return;
  }

  // Use existing params or start fresh
  const params = new URLSearchParams(currentParams?.toString());
  params.set("pageIndex", pageIndex.toString());

  // Update or set the new param
  paramsArray.forEach((param) => {
    if (param.paramValue) {
      params.set(param.paramName, param.paramValue);
    } else {
      params.delete(param.paramName); // Clean up if value is empty
    }
  });

  // Redirect
  router.push(`/find-providers?${params.toString()}`);
};


export const FetchTheListingsByFilters = async (filters: IListingFilters) => {

  const response = await getApiData<{
    ok: boolean, status: number, message: string,
    listings: ListingForPage[],
    listingsForTheCards: IProductPanel[],
    totalCount: number
  }>(`/listings/get-list-by-filters`, "POST", {
    ...filters
  }, "not-authorize");
  console.log("response:", response);

  return response;
}



export const getLocalLocation = () => {
  return new Promise((resolve, reject) => {
    // 1. Check support
    if (!navigator.geolocation) {
      const msg = "Geolocation not supported";
      console.error(msg);
      reject(msg);
      return;
    }

    // 2. Request position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude.toFixed(6),
          lng: position.coords.longitude.toFixed(6),
        };

        // 3. Update URL (Optional: keeps your URL sync logic)
        const params = new URLSearchParams(window.location.search);
        params.set("lat", coords.lat);
        params.set("lng", coords.lng);
        window.history.pushState({}, "", `?${params.toString()}`);

        // 4. Resolve the promise with the data
        resolve(coords);
      },
      (error) => {
        console.error("Location error:", error.message);
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  });
};