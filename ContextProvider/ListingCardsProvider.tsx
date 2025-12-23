"use client";
import { IProductPanel } from "@/components/products/ProductPanel";
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
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filters: Record<string, any>;
  updateFilter: (key: string, value: any) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
}

const ListingContext = createContext<ListingContextType | undefined>(undefined);

export const ListingCardsProvider = ({ children, listingsDetails }: { children: React.ReactNode, listingsDetails: { listings: ListingForPage[], listingsForTheCards: IProductPanel[] } }) => {

  const [listings, setListings] = useState<ListingForPage[]>(listingsDetails.listings);
  const [listingsForTheCards, setListingsForTheCards] = useState<IProductPanel[]>(listingsDetails.listingsForTheCards);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // 2. Filter Logic (Search by text and Category)
  /*const filteredData = useMemo(() => {
    return initialData.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filters.category ? item.category === filters.category : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, filters, initialData]);*/

  // 3. Pagination Logic
  /*const paginatedListings = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage]);*/

  // Reset to page 1 when search/filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

  const updateFilter = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <ListingContext.Provider value={{
      listings: listings,
      listingsForTheCards: listingsForTheCards,

      totalItems: listings.length,
      searchQuery,
      setSearchQuery,
      filters,
      updateFilter,
      currentPage,
      setCurrentPage,
      itemsPerPage
    }}>
      {children}
    </ListingContext.Provider>
  );
};

export const useListingsPublic = () => {
  const context = useContext(ListingContext);
  if (!context) throw new Error("useListings must be used within ListingProvider");
  return context;
};