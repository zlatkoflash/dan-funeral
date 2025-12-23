"use client";

import { Button } from "react-bootstrap";
import plusIcon from "@/assets/images/icon-plus.svg";
import Image from "next/image";
import Link from "next/link";

export default function MLButtonAddNewListing() {
  return <div className="button-wrap">

    <Link href="/Dashboard/MyListing/AddNewListing" className="btn btn-success">
      <Image className="icon" src={plusIcon} alt="plus" />
      Add New Listing
    </Link>

  </div>
}
