
/*import AdminContentWrap from "../../content/AdminContentWrap";
import TextInput from "@/components/forms/Input";
import MLCotentWrap from "../content/MLCotentWrap";
import { IMLSidebarMenuItem } from "../content/MLSidebarMenu";
import AListingEditorWrap from "../content/ListingEditor/AListingEditorWrap";
// import { IWPCategory, MyListingProviderEditor } from "./MyListingProviderEditor";
import { Button } from "react-bootstrap";*/
import { getApiData } from "@/utils/api";
import UpdateListingInnerContent from "./UpdateListingInnerContent";
import { IListing, IWPCategory, MyListingProviderEditor } from "../AddNewListing/MyListingProviderEditor";
import { AuthUser } from "@/ContextProvider/AuthProviderWrap";
import ZError from "@/app/errors/ZError";

export default async function AddNewListingPage({ searchParams }: { searchParams: { listingId: string } }) {

  const loggedUserData = await getApiData<{
    ok: boolean,
    user: AuthUser,
    message: string
  }>("/user/getLoggedUser", "POST", {}, "authorize");
  console.log("loggedUserData:", loggedUserData);

  const getParams = await searchParams;
  const listingId = getParams.listingId;
  console.log("listingId:", listingId);

  const listingDetails = await getApiData<{
    categories: IWPCategory[];
  }>("/listings/get-listing-dashboard-details", "POST", {}, "authorize");
  console.log("listingDetails:", listingDetails);

  const listingObjectDetails = await getApiData<{
    listing: IListing, listingPost
    : { ID: string, post_title: string, post_author: number }
  }>(`/listings/get-listing-for-id`, "POST", { listingId: listingId }, "authorize");
  console.log("listingObjectDetails:", listingObjectDetails);


  console.log("loggedUserData:", loggedUserData);
  console.log("listingObjectDetails:", listingObjectDetails);

  console.log("listingObjectDetails.post:", listingObjectDetails.listingPost
    , listingObjectDetails);



  if (Number(loggedUserData.user.id) !== Number(listingObjectDetails.listingPost
    .post_author)) {
    return <ZError status={403} message="You are not authorized to edit this listing" />
  }


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