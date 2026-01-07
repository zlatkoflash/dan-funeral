"use client";

import { useListingsPublic } from "@/ContextProvider/ListingCardsProvider";
import PaginateSortingHeader from "../headers/PaginateSortingHeader";


import exampleProductPhoto from './../../assets/images/example-product-photo.jpg';
import ProductPanel, { IProductPanel } from "./ProductPanel";
import PaginationListing from "../paginations/PaginationListing";

export default function ProductsPanelsList(
  // data: IProductPanel[]
) {

  const {
    listingsForTheCards,

    currentPage,
    TotalPages,

    loadingList


  } = useListingsPublic();



  return <section className="products-panels-list">
    <PaginateSortingHeader />

    <div className="products-list">
      {
        listingsForTheCards.map((product, key: number) => {
          return <ProductPanel {...product} key={`product-item-${key}-${product.id}`} />
        })
      }
    </div>


    {
      TotalPages() > 1 && <PaginationListing totalPages={TotalPages()} initialPage={currentPage} loading={loadingList} />
    }




  </section>
}