import { IListing } from "@/app/Dashboard/MyListing/AddNewListing/MyListingProviderEditor";
import { getApiData } from "./api";
import { ILE1AboutListing } from "@/app/Dashboard/MyListing/content/ListingEditor/content/LE1AboutListing";
import { IProductPanel } from "@/components/products/ProductPanel";
import { ListingForPage } from "@/ContextProvider/ListingCardsProvider";
import { AuthUser } from "@/ContextProvider/AuthProviderWrap";
import { IBusinessHour } from "@/app/DashboardV2/EditBusiness/components/editors/BusinessHoursEditor";
// import { useParams } from "next/navigation";
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
/*export const SaveTheListing = async (listingId: string | undefined, listing: IListing) => {
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
}*/

export type TSavingPartType =
  | "about"
  | "category"
  | "location"
  | "media"
  | "pricing"
  | "businessHours"
  | "video"
  | "teamMembers"
  | "faqs"
  | "service-offering"
  | "product-offering"
  | "room-facilities"
  | "preffered-vendors"
  | "languages";
export const SaveTheListingPart = async (
  listingId: number,
  savingPartType: TSavingPartType,
  dataForsaving: any,
  file?: File,
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

  const response = await getApiData<{
    ok: boolean;
    status: number;
    message: string;
    listingId: string;
  }>(
    `/listings/save-listing-partial?c=${Math.random()}`,
    "POST",
    formData,
    "authorize",
    "multipart/form-data",
  );
  console.log("res save-listing-partialponse:", response);

  return response;
};

export const CreateNewListing = async (aboutDetails: ILE1AboutListing) => {
  const formData = new FormData();

  // formData.append("about", JSON.stringify(aboutDetails));
  formData.append("title", aboutDetails.title);
  formData.append("description", aboutDetails.description);

  const response = await getApiData<{ ok: boolean; listing_id: number }>(
    `/listings/create-new-listing`,
    "POST",
    formData,
    "authorize",
    "multipart/form-data",
  );
  console.log("response:", response);

  return response;
};

export const FetchLocationsForTheSearchBar = async (searchText: string) => {
  const response = await getApiData<{
    ok: boolean;
    status: number;
    message: string;
    locations: {
      city: string;
      postcode: string;
      latitude: string;
      longitude: string;
      label: string;
    }[];
  }>(
    `/listings/fetch-locations-for-the-search-bar?q=${encodeURIComponent(searchText)}`,
    "GET",
    null,
    "not-authorize",
  );
  console.log("response search results:", response);

  return response;
};

export const executeSearchFiltersRedirect = ({
  /*paramName,
  paramValue,*/
  paramsArray,
  router,
  currentParams, // Pass existing params so you don't lose other filters
  pageIndex,
  slugsForChange = {
    slug1_city: "",
    slug1_2_zip: "",
    slug2_category: "",
    slug3_sub_category: "",
    // slug4_sub_service: string
  },
}: {
  /*paramName: string;
  paramValue: string;*/
  paramsArray: { paramName: string; paramValue: string }[];
  router: any;
  currentParams?: URLSearchParams;
  pageIndex: number;
  slugsForChange?: {
    slug1_city?: string;
    slug1_2_zip?: string;
    slug2_category?: string;
    slug3_sub_category?: string;
    // slug4_sub_service: string
  };
}) => {
  // return;

  if (isNaN(pageIndex)) {
    console.error("pageIndex is not a number");
    return;
  }

  // 2. Get the Path from the browser
  // URL: /find-providers/ohrid/funerals/muslim-services
  const path = window.location.pathname;
  //  const segments = path.split("/").filter(Boolean);
  //  console.log("segments:", segments);

  //  segments[0] is "find-providers"
  const pathnameSlugs = getSlugsForListings(path);

  const city = pathnameSlugs.CitySlug;
  const zip = pathnameSlugs.ZipSlug;
  const category = pathnameSlugs.ServicesSlug;
  const subCategory = pathnameSlugs.SubServicesSlug;

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

  /**
   * Now update the main slugs
   */
  const CitySlugFinal =
    slugsForChange && slugsForChange.slug1_city
      ? slugsForChange.slug1_city
      : city;
  const CityZipFinal =
    slugsForChange && slugsForChange.slug1_2_zip
      ? slugsForChange.slug1_2_zip
      : zip;
  const CategorySlugFinal =
    slugsForChange && slugsForChange.slug2_category
      ? slugsForChange.slug2_category
      : category;
  const SubCategorySlugFinal =
    slugsForChange && slugsForChange.slug3_sub_category
      ? slugsForChange.slug3_sub_category
      : subCategory;

  console.log("Search filters triggered - Path:", path);
  console.log("CitySlugFinal:", CitySlugFinal);
  console.log("CategorySlugFinal:", CategorySlugFinal);
  console.log("SubCategorySlugFinal:", SubCategorySlugFinal);
  console.log("params.toString():", params.toString());

  const targetURL = `/find-providers/${CitySlugFinal}/${CityZipFinal}/${CategorySlugFinal}/${SubCategorySlugFinal}?${params.toString()}`;
  // If we are already on the exact target path, just change query parameters smoothly
  /*if (path === `/find-providers/${CitySlugFinal}/${CategorySlugFinal}/${SubCategorySlugFinal}`) {
    window.history.pushState(null, '', targetURL);
    // Directly trigger your provider refresh without unmounting components
    return;
  }*/
  if (path.indexOf("/find-providers/") !== -1) {
    console.log("Refreshing the states on existing route");
    window.history.pushState(null, "", targetURL);
  } else {
    console.log("Pushing new route and reloading all states");
    // return;
    // Redirect
    router.push(
      // `/find-providers/${CitySlugFinal}/${CityZipFinal}/${CategorySlugFinal}/${SubCategorySlugFinal}?${params.toString()}`,
      targetURL,
      {
        scroll: true,
      },
    );
  }
};

export const FetchTheListingsByFilters = async (
  filters: IListingFilters,
  seed_integer: number,
) => {
  const response = await getApiData<{
    ok: boolean;
    status: number;
    message: string;
    listings: ListingForPage[];
    listingsForTheCards: IProductPanel[];
    totalCount: number;
    owner: AuthUser;
  }>(
    `/listings/get-list-by-filters`,
    "POST",
    {
      ...filters,
      seed_integer: seed_integer,
    },
    "not-authorize",
  );
  console.log("response:", response);

  return response;
};

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
      },
    );
  });
};

export const SlugifyThePartOfTheURL = (text: string): string => {
  return text
    .toString() // Ensure it's a string
    .toLowerCase() // Convert to lowercase
    .trim() // Remove whitespace from both ends
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars (punctuation etc)
    .replace(/--+/g, "-"); // Replace multiple - with single -
};

export const SLUG_DEFAULT_ALL_CITIES = "all-cities";
export const SLUG_DEFAULT_ALL_POSTAL_CODES = "all-postal-codes";
export const SLUG_DEFAULT_ALL_CATEGORIES = "all-categories";
export const SLUG_DEFAULT_ALL_SUBCATEGORIES = "all-subcategories";

export const getSlugsForListings = (
  pathname: string,
): {
  CitySlug: string;
  ZipSlug: string;
  ServicesSlug: string;
  SubServicesSlug: string;
} => {
  // Split by "/" and filter out empty strings
  const segments = pathname.split("/").filter(Boolean);

  // Access the 3rd segment (index 2)
  /*const CitySlug = segments[1];
  const ZipSlug = segments[2];
  const ServicesSlug = segments[3];
  const SubServicesSlug = segments[4];*/
  const CitySlug = segments[1] || SLUG_DEFAULT_ALL_CITIES;
  const ZipSlug = segments[2] || SLUG_DEFAULT_ALL_POSTAL_CODES;
  const ServicesSlug = segments[3] || SLUG_DEFAULT_ALL_CATEGORIES;
  const SubServicesSlug = segments[4] || SLUG_DEFAULT_ALL_SUBCATEGORIES;

  return {
    CitySlug,
    ZipSlug,
    ServicesSlug,
    SubServicesSlug,
  };
};

/**
 * Converts a hyphenated slug to a Title Case string.
 * Example: 'alternative-funeral-burials' -> 'Alternative Funeral Burials'
 */
export const formatSlugToTitle = (slug: string): string => {
  return slug
    .split("-") // Split into ['alternative', 'funeral', 'burials']
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each
    .join(" "); // Join with spaces
};

export const formatWorkingHours = (jsonInput: any) => {
  // Parse if it's a string, otherwise assume it's already an array
  const schedule =
    typeof jsonInput === "string" ? JSON.parse(jsonInput) : jsonInput;

  return schedule
    .map((item: any) => {
      let timeString = "";

      if (!item.isEnabled) {
        timeString = "Closed";
      } else if (item.is24Hours) {
        timeString = "Open 24 Hours";
      } else {
        timeString = `${item.fromHour} - ${item.toHour}`;
      }

      return `<strong>${item.day}:</strong> ${timeString}`;
    })
    .join("<br/>");
};

export const formatWorkingHoursV2 = (businessHours: IBusinessHour[]) => {
  return businessHours
    .map((item) => {
      let timeString = "";

      if (!item.day_week_is_available) {
        timeString = "Closed";
      } else if (item.it_is_working_24_hours) {
        timeString = "Open 24 Hours";
      } else {
        timeString = `${item.time_start.slice(0, 5)} - ${item.time_end.slice(0, 5)}`;
      }

      return `<strong>${item.day}:</strong> ${timeString}`;
    })
    .join("<br/>");
};
