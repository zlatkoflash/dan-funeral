
import AdminContentWrap from "../../content/AdminContentWrap";
import TextInput from "@/components/forms/Input";
import MLCotentWrap from "../content/MLCotentWrap";
import { IMLSidebarMenuItem } from "../content/MLSidebarMenu";
import AListingEditorWrap from "../content/ListingEditor/AListingEditorWrap";
// import { IWPCategory, MyListingProviderEditor } from "./MyListingProviderEditor";
import { Button } from "react-bootstrap";
import { getApiData } from "@/utils/api";
import UpdateListingInnerContent from "./UpdateListingInnerContent";
import { IListing, IWPCategory, MyListingProviderEditor } from "../AddNewListing/MyListingProviderEditor";

export default async function AddNewListingPage({ searchParams }: { searchParams: { listingId: string } }) {


  const getParams = await searchParams;
  const listingId = getParams.listingId;
  console.log("listingId:", listingId);

  const listingDetails = await getApiData<{
    categories: IWPCategory[];
  }>("/listings/get-listing-dashboard-details", "POST", {}, "authorize");
  console.log("listingDetails:", listingDetails);

  const listingObjectDetails = await getApiData<{ listing: IListing, post: { ID: string, post_title: string } }>(`/listings/get-listing-for-id`, "POST", { listingId: listingId }, "authorize");
  console.log("listingObjectDetails:", listingObjectDetails);

  return <>
    <MyListingProviderEditor
      actualListingId={listingId}
      listingInit={listingObjectDetails.listing}
      listingSettings={listingDetails}

    >
      <UpdateListingInnerContent />
    </MyListingProviderEditor>
  </>
}