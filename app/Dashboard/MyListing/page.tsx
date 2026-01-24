import { Button } from "react-bootstrap";
import AdminContentWrap from "../content/AdminContentWrap";
import ML1SelectListingToEdit from "./content/ML1SelectListingToEdit";
import FormSearch from "@/components/forms/ReadyForms/FormSearch";
import MLButtonAddNewListing from "./content/MLButtonAddNewListing";
import { IWPCategory, IWPListingPost, MyListingProviderEditor } from "./AddNewListing/MyListingProviderEditor";
import { getApiData } from "@/utils/api";

export default async function MyListingPage() {


  const listingDetails = await getApiData<{
    categories: IWPCategory[];
    listings: IWPListingPost[];
  }>("/listings/get-listing-dashboard-details", "POST", {}, "authorize");
  console.log("listingDetails:", listingDetails);

  return <>
    <MyListingProviderEditor
      listingSettings={listingDetails}
    >
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
            link: "",
          },
        ],
        title: "My Listing",
        right_content: <MLButtonAddNewListing />
      }}>
        <ML1SelectListingToEdit />
      </AdminContentWrap>
    </MyListingProviderEditor>
  </>
}