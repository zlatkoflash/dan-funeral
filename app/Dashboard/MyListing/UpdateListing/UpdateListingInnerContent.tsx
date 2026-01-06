"use client";

import AdminContentWrap from "../../content/AdminContentWrap";
import AListingEditorWrap from "../content/ListingEditor/AListingEditorWrap";
import { useMyListing } from "../AddNewListing/MyListingProviderEditor";

export default function UpdateListingInnerContent() {

  const { listing, actualListingId, LE1About } = useMyListing();

  return <>
    <AdminContentWrap subHeadSearchSettings={{
      breads: [
        {
          label: "Home",
          link: "/",
        },
        {
          label: "Dashboard",
          link: "/Dashboard",
        },
        {
          label: "My Listing",
          link: "/Dashboard/MyListing",
        },
        {
          label: LE1About.title !== "" ? LE1About.title : "Listing - " + actualListingId,
          link: "",
        }
      ],
      title: "Update Listing",
      right_content: <>
        {
          /*<div className="listing-main-buttons">
        <Button variant="success" type="button">
          🌐 Publish Listing
        </Button>
        <Button variant="success" type="button">
          📝 Save
        </Button>
      </div>*/
        }
      </>
    }}>
      <AListingEditorWrap />
    </AdminContentWrap>
  </>;
}