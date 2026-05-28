"use client";
import { IProductPanel } from "@/components/products/ProductPanel";
import {
  FetchTheListingsByFilters,
  getSlugsForListings,
  IListingFilters,
} from "@/utils/listing";
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
  // listingsDetails
}: {
  children: React.ReactNode;
  // listingsDetails: { listings: ListingForPage[], listingsForTheCards: IProductPanel[] }
}) => {
  const router = useRouter();

  // const [listings, setListings] = useState<ListingForPage[]>(listingsDetails.listings);
  const [listings, setListings] = useState<ListingForPage[]>([]);
  // const [listingsForTheCards, setListingsForTheCards] = useState<IProductPanel[]>(listingsDetails.listingsForTheCards);
  const [listingsForTheCards, setListingsForTheCards] = useState<
    IProductPanel[]
  >([]);
  // const [searchQuery, setSearchQuery] = useState("");
  // const [filters, setFilters] = useState<Record<string, any>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [seed_integer, set_seed_integer] = useState<number>(
    Math.round(Math.random() * 10000),
  );
  console.log("SEED INTEGER >>>>> ", seed_integer);

  const itemsPerPage = 10;
  // const itemsPerPage = 1;
  const TotalPages = () => {
    return Math.ceil(totalCount / itemsPerPage);
  };

  // const [filters, setFilters] = useState<IListingFilters>({} as IListingFilters);
  // const
  const [loadingList, setLoadingList] = useState(true);

  const LoadTheListAgain = async (
    filters: IListingFilters,
    pageIndex?: number,
  ) => {
    console.log("Loading list...", "loading listing, path name:", pathname);
    // console.log("Filters for the listings:", filters);

    const { CitySlug, ServicesSlug, SubServicesSlug } =
      getSlugsForListings(pathname);

    setLoadingList(true);
    try {
      const filtersForListing = {
        ...{
          CitySlug,
          ServicesSlug,
          SubServicesSlug,
        },
        ...filters,
        itemsPerPage: itemsPerPage,
        pageIndex: pageIndex !== undefined ? pageIndex : 1,
      };
      console.log("Filters for the listings:", filtersForListing);
      const result = await FetchTheListingsByFilters(
        filtersForListing,
        seed_integer,
      );

      setListings(result.listings);
      setListingsForTheCards(result.listingsForTheCards);
      setTotalCount(result.totalCount);
      setCurrentPage(pageIndex !== undefined ? pageIndex : 1);

      console.log("result listing cards:", result.listingsForTheCards);
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
    console.log("URL is changed I will load the list by the filters");

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
    // LoadTheListAgain();
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
      /*value={{
      listings: listings,
      listingsForTheCards: listingsForTheCards,

      totalItems: listings.length,
      // searchQuery,
      // setSearchQuery,
      // filters,
      // updateFilter,
      currentPage,
      setCurrentPage,
      itemsPerPage,
      // filters,
      // setFilters,
      LoadTheListAgain,
      loadingList,
      setLoadingList,

      totalCount,
      setTotalCount,

      TotalPages,
      // executeSearchRedirect
    }}*/
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
