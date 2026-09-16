"use client";
import { IProductPanel } from "@/components/products/ProductPanel";
import { getApiData } from "@/utils/api";
import { getValidDeviceId } from "@/utils/device";
import {
  FetchTheListingsByFilters,
  getCityStateValues,
  getOrCreateTimedSeed,
  getSlugsForListings,
  IListingFilters,
  SLUG_DEFAULT_ALL_POSTAL_CODES,
} from "@/utils/listing";
import { getIP } from "@/utils/user";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  useRef,
} from "react";

// 1. Define the Shape of a Listing
export interface ListingForPage {
  id: string;
  title: string;
  category: string;
  price: number;
  post_name: string;
}

interface ListingContextType {
  listings: ListingForPage[]; // The currently visible (filtered/paginated) listings
  listingsForTheCards: IProductPanel[]; // The currently visible (filtered/paginated) listings
  totalItems: number; // Total matches before pagination
  // searchQuery: string;
  // setSearchQuery: (q: string) => void;
  // filters: Record<string, any>;
  // updateFilter: (key: string, value: any) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  // executeSearchRedirect: () => void;

  // filters: IListingFilters;
  // setFilters: (filters: IListingFilters) => void;

  LoadTheListAgain: (filters: IListingFilters) => Promise<void>;
  loadingList: boolean;
  setLoadingList: (loading: boolean) => void;

  totalCount: number;
  setTotalCount: (totalCount: number) => void;
  TotalPages: () => number;
}

const ListingContext = createContext<ListingContextType | undefined>(undefined);

export const ListingCardsProvider = ({
  children,
  outListings,
  currentPageOut = 1
  // listingsDetails
}: {
  children: React.ReactNode;
  outListings?: {
    listings: ListingForPage[];
    listingsForTheCards: IProductPanel[];
    totalCount: number;
  },
  currentPageOut?: number;
  // listingsDetails: { listings: ListingForPage[], listingsForTheCards: IProductPanel[] }
}) => {
  const router = useRouter();

  // const [listings, setListings] = useState<ListingForPage[]>(listingsDetails.listings);
  const [listings, setListings] = useState<ListingForPage[]>(outListings?.listings || []);
  // const [listingsForTheCards, setListingsForTheCards] = useState<IProductPanel[]>(listingsDetails.listingsForTheCards);
  const [listingsForTheCards, setListingsForTheCards] = useState<
    IProductPanel[]
  >(outListings?.listingsForTheCards || []);
  // const [searchQuery, setSearchQuery] = useState("");
  // const [filters, setFilters] = useState<Record<string, any>>({});
  const [currentPage, setCurrentPage] = useState(currentPageOut ? currentPageOut : 1);
  const [totalCount, setTotalCount] = useState(outListings?.totalCount || 0);


  const itemsPerPage = 10;
  // const itemsPerPage = 1;
  const TotalPages = () => {
    return Math.ceil(totalCount / itemsPerPage);
  };

  // const [filters, setFilters] = useState<IListingFilters>({} as IListingFilters);
  // const
  const [loadingList, setLoadingList] = useState(false);


  const urlParams = useSearchParams();

  useEffect(() => {
    console.log("===loading-cards-provider===");
  }, []);

  const LoadTheListAgain = async (
    filters: IListingFilters,
    pageIndex?: number,
  ) => {
    console.log("Loading list...", "loading listing, path name:", pathname);
    // console.log("Filters for the listings:", filters);

    const { CitySlug,
      // ZipSlug, 
      ServicesSlug,
      // SubServicesSlug 
    } =
      getSlugsForListings(pathname);

    setLoadingList(true);

    const ZipSlug = urlParams.get("zip") || SLUG_DEFAULT_ALL_POSTAL_CODES;
    const SubServicesSlug = urlParams.get("sub-service") || "";

    /*const response = await fetch('/api/system/get-ip');
    const data = await response.json();
    console.log('Client IP:', data.ip, data);*/

    let ipDetails = {};
    if (ZipSlug === "" || ZipSlug === SLUG_DEFAULT_ALL_POSTAL_CODES) {
      const ip = await getIP();
      ipDetails = { ip };
    }

    const cityValues = getCityStateValues(CitySlug);

    try {
      const filtersForListing = {

        cityValues,

        ...{
          CitySlug,
          ZipSlug,
          ServicesSlug,
          SubServicesSlug,
        },

        ...filters,
        ...ipDetails,
        itemsPerPage: itemsPerPage,
        pageIndex: pageIndex !== undefined ? pageIndex : 1,
      };
      console.log("Filters for the listings:", filtersForListing);

      const seed_integer = getOrCreateTimedSeed();
      console.log("SEED INTEGER >>>>> ", seed_integer);

      const result = await FetchTheListingsByFilters(
        filtersForListing,
        seed_integer,
      );

      setListings(result.listings);
      setListingsForTheCards(result.listingsForTheCards);
      setTotalCount(result.totalCount);
      setCurrentPage(pageIndex !== undefined ? pageIndex : 1);

      console.log("Total results searching:", result)
      console.log("result listing cards:", result.listingsForTheCards);

      /**
       * Now we capture the viewing for the all the listings appearing in the
       * current view, to know which listing should appear in the top and
       * get highlighted
       */

      getApiData(
        "/listings/count-listings-search-appearance",
        "POST",
        {
          device_id: getValidDeviceId(),
          listing_ids: result.listingsForTheCards.map((listing) => listing.id),
        },
        "not-authorize",
        "application/json",
      );
    } catch (error) {
      console.log("Error loading the results", error);
    }
    setLoadingList(false);
    // return { listings: [], listingsForTheCards: [] };
  };

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastUrlForLoadingList = useRef("");

  useEffect(() => {

    if (outListings !== undefined) {
      /**
       * So when the content is comming from root page no need for loading
       */
      return;
    }

    console.log("URL is changed I will load the list by the filters");
    console.log("===URL-changed+load-the-list===");

    // This code runs every time the URL or Query String changes
    const url = `${pathname}?${searchParams.toString()}`;
    if (url === lastUrlForLoadingList.current) {
      return;
    }
    lastUrlForLoadingList.current = url;

    console.log("URL Changed to:", url);
    console.log("Path names:", searchParams);
    const allParams = Object.fromEntries(
      searchParams.entries(),
    ) as unknown as IListingFilters;
    console.log("All params:", allParams);

    // Example: Trigger an analytics event or reset a loading state
    // yourActionFunction();
    LoadTheListAgain(
      allParams,
      isNaN(Number(allParams.pageIndex)) ? 1 : Number(allParams.pageIndex),
    );
  }, [pathname, searchParams]); // Dependencies ensure this triggers on change

  // Reset to page 1 when search/filters change
  /*useEffect(() => {
    setCurrentPage(1);
  }, [
    // searchQuery, filters

  ]);*/

  const value = useMemo(
    () => ({
      listings,
      listingsForTheCards,
      totalItems: listings.length,
      currentPage,
      setCurrentPage,
      itemsPerPage,
      LoadTheListAgain,
      loadingList,
      setLoadingList,
      totalCount,
      setTotalCount,
      TotalPages,
    }),
    [listings, listingsForTheCards, currentPage, loadingList, totalCount],
  ); // Only re-renders consumers if these actually change

  return (
    <ListingContext.Provider
      value={value}

    >
      {children}
    </ListingContext.Provider>
  );
};

export const useListingsPublic = () => {
  const context = useContext(ListingContext);
  if (!context)
    throw new Error("useListings must be used within ListingProvider");
  // if (!context) console.log("useListings must be used within ListingProvider");
  return context;
};
