"use client"

import { useMyListing } from "@/app/Dashboard/MyListing/AddNewListing/MyListingProviderEditor";
import Link from "next/link";

export default function ProductAbout() {

  const { listing } = useMyListing();

  return <section className="product-about">
    <div className="left-content">
      <h2>About {listing.about.title}</h2>
      <div className="buttons">
        <Link href={""} className="btn btn-success">Contact Provider</Link>
      </div>
    </div>
    {
      /*<div className="right-content">
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
    </div>*/
    }
    <div className="right-content" dangerouslySetInnerHTML={{ __html: listing.about.description }} />
  </section>
}