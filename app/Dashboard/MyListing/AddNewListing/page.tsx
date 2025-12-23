
import AdminContentWrap from "../../content/AdminContentWrap";
import TextInput from "@/components/forms/Input";
import MLCotentWrap from "../content/MLCotentWrap";
import { IMLSidebarMenuItem } from "../content/MLSidebarMenu";
import AListingEditorWrap from "../content/ListingEditor/AListingEditorWrap";
import { IWPCategory, MyListingProviderEditor } from "./MyListingProviderEditor";
import { Button } from "react-bootstrap";
import { getApiData } from "@/utils/api";

export default async function AddNewListingPage() {

  const listingDetails = await getApiData<{
    categories: IWPCategory[];
  }>("/listings/get-listing-dashboard-details", "POST", {}, "authorize");
  console.log("listingDetails:", listingDetails);

  return <>
    <MyListingProviderEditor listingSettings={listingDetails}>
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
            label: "Add New Listing",
            link: "",
          }
        ],
        title: "Add New Listing",
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
    </MyListingProviderEditor>
  </>
}