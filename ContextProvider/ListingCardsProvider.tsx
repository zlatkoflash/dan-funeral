"use client";
import { IProductPanel } from "@/components/products/ProductPanel";
import { FetchTheListingsByFilters, IListingFilters } from "@/utils/listing";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { createContext, useContext, useState, useMemo, useEffect } from "react";

// 1. Define the Shape of a Listing
export interface ListingForPage {
  id: string;
  title: string;
  category: string;
  price: number;
}

interface ListingContextType {
  listings: ListingForPage[];           // The currently visible (filtered/paginated) listings
  listingsForTheCards: IProductPanel[];           // The currently visible (filtered/paginated) listings
  totalItems: number;            // Total matches before pagination
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

export const ListingCardsProvider = ({ children,
  // listingsDetails 
}: {
  children: React.ReactNode,
  // listingsDetails: { listings: ListingForPage[], listingsForTheCards: IProductPanel[] } 

}) => {

  const router = useRouter();

  // const [listings, setListings] = useState<ListingForPage[]>(listingsDetails.listings);
  const [listings, setListings] = useState<ListingForPage[]>([]);
  // const [listingsForTheCards, setListingsForTheCards] = useState<IProductPanel[]>(listingsDetails.listingsForTheCards);
  const [listingsForTheCards, setListingsForTheCards] = useState<IProductPanel[]>([]);
  // const [searchQuery, setSearchQuery] = useState("");
  // const [filters, setFilters] = useState<Record<string, any>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  // const itemsPerPage = 20;
  const itemsPerPage = 1;
  const TotalPages = () => {
    return Math.ceil(totalCount / itemsPerPage);
  }

  // const [filters, setFilters] = useState<IListingFilters>({} as IListingFilters);
  // const 
  const [loadingList, setLoadingList] = useState(false);

  const LoadTheListAgain = async (filters: IListingFilters, pageIndex?: number) => {
    console.log("Loading the results");
    console.log("Filters for the listings:", filters);
    setLoadingList(true);
    try {
      const result = await FetchTheListingsByFilters({
        ...filters,
        itemsPerPage: itemsPerPage,
        pageIndex: pageIndex !== undefined ? pageIndex : 1,
      });

      setListings(result.listings);
      setListingsForTheCards(result.listingsForTheCards);
      setTotalCount(result.totalCount);
      setCurrentPage(pageIndex !== undefined ? pageIndex : 1);
    }
    catch (error) {
      console.log("Error loading the results", error);
    }
    setLoadingList(false);
    // return { listings: [], listingsForTheCards: [] };
  };

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {

    console.log("URL is changed I will load the list by the filters");

    // This code runs every time the URL or Query String changes
    const url = `${pathname}?${searchParams.toString()}`;

    console.log("URL Changed to:", url);
    console.log("Path names:", searchParams);
    const allParams = Object.fromEntries(searchParams.entries()) as unknown as IListingFilters;
    console.log("All params:", allParams);

    // Example: Trigger an analytics event or reset a loading state
    // yourActionFunction();
    LoadTheListAgain(allParams, 1);
    // LoadTheListAgain();


  }, [pathname, searchParams]); // Dependencies ensure this triggers on change

  // Reset to page 1 when search/filters change
  /*useEffect(() => {
    setCurrentPage(1);
  }, [
    // searchQuery, filters

  ]);*/


  return (
    <ListingContext.Provider value={{
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
    }}>
      {children}
    </ListingContext.Provider>
  );
};

export const useListingsPublic = () => {
  const context = useContext(ListingContext);
  if (!context) throw new Error("useListings must be used within ListingProvider");
  // if (!context) console.log("useListings must be used within ListingProvider");
  return context;
};