"use client";

import { useListingsPublic } from "@/ContextProvider/ListingCardsProvider";
import PaginateSortingHeader from "../headers/PaginateSortingHeader";

import exampleProductPhoto from "./../../assets/images/example-product-photo.jpg";
import ProductPanel, { IProductPanel } from "./ProductPanel";
import PaginationListing from "../paginations/PaginationListing";
import { useEffect, useRef } from "react";
import { getApiData } from "@/utils/api";

export default function ProductsPanelsList() {
  // data: IProductPanel[]
  const {
    listingsForTheCards,

    currentPage,
    TotalPages,

    loadingList,
  } = useListingsPublic();

  /*const CountFromRef = useRef(0);
  /// Temporary scripts for adding demo data to all lists
  const ___AddDemoDataTONextList = async () => {
    const result = await getApiData<{
      ok: boolean;
      count_rows: number;
    }>(
      "/data-manipulation/AddDemoDataToTheListings",
      "GET",
      {
        countFROM: CountFromRef.current,
      },
      "not-authorize",
      "application/json",
    );

    CountFromRef.current += 30;

    console.log("counts: ", CountFromRef.current);
    console.log("Added next demo data", result);

    if (result.ok && result.count_rows > 0) {
      ___AddDemoDataTONextList();
    }
  };
  useEffect(() => {
    ___AddDemoDataTONextList();
  }, []);*/

  return (
    <section className="products-panels-list">
      <PaginateSortingHeader />

      {listingsForTheCards.length > 0 && (
        <div className="products-list">
          {listingsForTheCards.map((product, key: number) => {
            // product.owner.
            // product.details_item_location
            return (
              <ProductPanel
                {...product}
                key={`product-item-${key}-${product.id}`}
              />
            );
          })}
        </div>
      )}
      {listingsForTheCards.length === 0 && !loadingList && (
        // && !loadingList
        <div>No products found</div>
      )}
      {loadingList && <div>Loading...</div>}
      {
        // loadingList && listingsForTheCards.length === 0 && <div>Loading...</div>
      }

      {TotalPages() > 1 && (
        <PaginationListing
          totalPages={TotalPages()}
          initialPage={currentPage}
          loading={loadingList}
        />
      )}
    </section>
  );
}
