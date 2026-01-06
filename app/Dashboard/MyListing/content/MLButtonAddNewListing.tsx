"use client";

import { Button } from "react-bootstrap";
import plusIcon from "@/assets/images/icon-plus.svg";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function MLButtonAddNewListing() {

  // const [creatingNewListing, setCreatingNewListing] = useState(false);

  /*const ___CreateNewListing = async () => {
    setCreatingNewListing(true);



    setCreatingNewListing(false);
  }*/

  return <div className="button-wrap">

    <Link href="/Dashboard/MyListing/AddNewListing" className="btn btn-success">
      <Image className="icon" src={plusIcon} alt="plus" />
      Add New Listing
    </Link>
    {
      /*<Button variant="success" type="button" className={`btn ${creatingNewListing ? "btn-loading" : ""}`} onClick={() => {
      ___CreateNewListing();
    }}>
      <Image className="icon" src={plusIcon} alt="plus" />
      Add New Listing
    </Button>*/
    }

  </div>
}
