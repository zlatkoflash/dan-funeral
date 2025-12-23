import { IListing } from "@/app/Dashboard/MyListing/AddNewListing/MyListingProviderEditor";
import { getApiData } from "./api";

export const SaveTheListing = async (listingId: string | undefined, listing: IListing) => {
  const formData = new FormData();

  const listingOptimizedForPost = JSON.parse(JSON.stringify(listing));
  listingOptimizedForPost.media.featured_image.preview = "preview-url-disabled-for-post";
  /*listingOptimizedForPost.media.gallery.forEach((item: any) => {
    item.preview = "preview-url-disabled-for-post";
  });*/
  console.log("listingOptimizedForPost:", listingOptimizedForPost);

  formData.append("listingId", listingId || "");
  formData.append("listing", JSON.stringify(listingOptimizedForPost));

  if (listing.media.featured_image.isNew && listing.media.featured_image.file !== null) {
    formData.append("featured_image", listing.media.featured_image.file);
  }
  /*for (let i = 0; i < listing.media.gallery.length; i++) {
    const item = listing.media.gallery[i];

    if (item.isNew && item.file !== null) {
      // Adding [] tells the server to treat "gallery" as an array
      formData.append("gallery[]", item.file);
    }
  }*/

  const response = await getApiData<{ ok: boolean, status: number, message: string, listingId: string }>(`/listings/save-listing?r=${Date.now()}`, "POST", formData, "authorize", "multipart/form-data");

  return response;
}