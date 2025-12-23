"use client";

import { useListingsPublic } from "@/ContextProvider/ListingCardsProvider";
import PaginateSortingHeader from "../headers/PaginateSortingHeader";


import exampleProductPhoto from './../../assets/images/example-product-photo.jpg';
import ProductPanel, { IProductPanel } from "./ProductPanel";

export default function ProductsPanelsList(
  // data: IProductPanel[]
) {

  const {
    listingsForTheCards
  } = useListingsPublic();

  /*const data: IProductPanel[] = [
    {
      categories: [
        {
          label: "Cremation",
          link: "#Cremation"
        },
        {
          label: "Green Burial",
          link: "#GreenBurial"
        },
        {
          label: "Grief Support",
          link: "#GriefSupport"
        },
      ],
      description: "Family-owned funeral home offering personalized ceremonies and 24/7 support.",
      details_item_location: "Serves Chicago, IL",
      details_item_startsAt: "Starts at $1,900",
      id: "1",
      image: exampleProductPhoto,
      stars: 5,
      title: "Peaceful Memorial Home"
    },
    {
      categories: [
        {
          label: "Cremation",
          link: "#Cremation"
        },
        {
          label: "Green Burial",
          link: "#GreenBurial"
        },
        {
          label: "Grief Support",
          link: "#GriefSupport"
        },
      ],
      description: "Family-owned funeral home offering personalized ceremonies and 24/7 support.",
      details_item_location: "Serves Chicago, IL",
      details_item_startsAt: "Starts at $1,900",
      id: "1",
      image: exampleProductPhoto,
      stars: 5,
      title: "Peaceful Memorial Home"
    },
    {
      categories: [
        {
          label: "Cremation",
          link: "#Cremation"
        },
        {
          label: "Green Burial",
          link: "#GreenBurial"
        },
        {
          label: "Grief Support",
          link: "#GriefSupport"
        },
      ],
      description: "Family-owned funeral home offering personalized ceremonies and 24/7 support.",
      details_item_location: "Serves Chicago, IL",
      details_item_startsAt: "Starts at $1,900",
      id: "1",
      image: exampleProductPhoto,
      stars: 5,
      title: "Peaceful Memorial Home"
    },

  ];*/

  return <section className="products-panels-list">
    <PaginateSortingHeader />

    <div className="products-list">
      {
        listingsForTheCards.map((product, key: number) => {
          return <ProductPanel {...product} key={`product-item-${key}-${product.id}`} />
        })
      }
    </div>

  </section>
}