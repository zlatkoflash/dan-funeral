import FlagVerify from "@/components/flags/FlagVerify";
import FooterLanding from "@/components/footers/FooterLanding";
import FormProduct from "@/components/forms/ReadyForms/FormProduct";
import ProductDetailsGallery from "@/components/galleries/ProductDetailsGallery";
import HeaderListingCards from "@/components/headers/HeaderListingCards";
import SubHeaderOnlyBreadCrumbs from "@/components/headers/SubHeaderOnlyBreadCrumbs";
import ProductAbout from "@/components/productDetails/ProductAbout";
import ProductQuickFacts from "@/components/productDetails/ProductQuickFacts";
import ProductTitleAndFeedback from "@/components/productDetails/ProductTitleAndFeedback";
import ProductContentSidebar from "@/components/SidebarContainers/ProductContentSidebar";
// import SubHeaderSearch from "@/components/headers/SubHeaderSearch";

import dollarIcon from "./../../../assets/images/icon-dollar-gray.svg";
import ProductServies from "@/components/productDetails/ProductServies";
import ProductsFAQs from "@/components/productDetails/ProductsFAQs";
import ProductReviews from "@/components/productDetails/ProductReviews";
import TestimonialsPanel from "@/components/testimonials/TestimonialsPanel";
import { getApiData } from "@/utils/api";
import PricingList from "@/components/pricing/PricingList";
import {
  IListing,
  MyListingProviderEditor,
} from "@/app/Dashboard/MyListing/AddNewListing/MyListingProviderEditor";
import { FAQItem } from "@/components/grids/FAQsEditor";
import ProductMap from "@/components/productDetails/ProductMap";
import { ILE10ServiceOffering } from "@/app/Dashboard/MyListing/content/ListingEditor/content/LE10ServiceOffering";
import { IE13Language } from "@/app/Dashboard/MyListing/content/ListingEditor/content/LE13Languages";
import { formatWorkingHours } from "@/utils/listing";
import { IListingCompleteDetails } from "@/utils/interfaceListing";
import ProductQuickFactsWrap from "@/components/productDetails/ProductQuickFactsWrap";
import ProductAboutVideoPlayer from "@/components/productDetails/ProductAboutVideo";
import { IOtherService } from "@/app/DashboardV2/DashboardComponents/ServicesEditor/ServicesEditor";
import { IFAQBusiness } from "@/app/DashboardV2/EditBusiness/components/editors/BusinessFAQsEditor";
import ProductReviewsWrap from "@/components/productDetails/ProductReviewsWrap";
import ProviderEvents from "./ProviderEvents";

export default async function ListingPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const listingSlug = (await params).slug;
  console.log("listingSlug:", listingSlug);

  const listingDetails = await getApiData<{
    // listingv2: IListingCompleteDetails;
    listing: IListing;
    listingPost: { ID: string; post_title: string; post_author: number };
  }>(`/listings/get-listing-by-slug`, "POST", { listingSlug: listingSlug });
  console.log("listingDetails:", listingDetails);

  /*await getApiData(
    "/listings/count-listing-view",
    "POST",
    { listing_id: listingDetails.listingPost.ID },
    "not-authorize",
    "application/json",
  );*/

  const DashboardData = await getApiData("/dashboard/GetBasicData", "GET", {});

  const ServicesOffered: { label: string }[] = [];
  listingDetails.listing.serviceOffering.forEach(
    (service: ILE10ServiceOffering) => {
      ServicesOffered.push({ label: service.name });
    },
  );

  console.log(
    "listingDetails.listing.location:",
    listingDetails.listing.location,
  );

  // console.log("listingDetails:", listingDetails);

  return (
    <>
      <MyListingProviderEditor
        actualListingId={listingDetails.listingPost.ID}
        listingInit={listingDetails.listing}
      >
        <ProviderEvents listing_id={listingDetails.listingPost.ID} />
        <HeaderListingCards menuItems={DashboardData.menu_header_items} />

        <SubHeaderOnlyBreadCrumbs
          bread={{
            links: [
              { label: "Home", link: "/" },
              { label: "Find Providers", link: "/find-providers" },
              { label: listingDetails.listingPost.post_title, link: "" },
            ],
          }}
        />

        <ProductDetailsGallery />

        <ProductContentSidebar
          content={
            <>
              <ProductTitleAndFeedback />
              <ProductMap />
              <ProductAbout />
              {listingDetails.listing.media_gallery_videos.length > 0 && (
                <ProductAboutVideoPlayer />
              )}
              <ProductQuickFactsWrap />
              <ProductServies
                title="Services Offered"
                services={
                  /*[
              { label: "Traditional Funeral Services" },
              { label: "Memorial Ceremonies" },
              { label: "Pre-Planning & Advance Directives" },
              { label: "Direct Cremation" },
              { label: "Grief Counseling & Family Support" },
              { label: "Live Streaming for Remote Guests" },
              { label: "Eco-Friendly Burials" },
            ]*/ ServicesOffered
                }
              />

              <PricingList
                items={
                  listingDetails.listing.other_services.length > 0
                    ? listingDetails.listing.other_services.map(
                        (item: IOtherService) => ({
                          title: item.title,
                          price: item.price,
                          description: item.title,
                          linkForQuestions: "",
                          priceFrom: item.price,
                          // riceTo: 0,
                        }),
                      )
                    : []
                }
              />

              <ProductsFAQs
                title="Frequently asked questions"
                headingButton={{
                  label: "Call Now",
                  link: `tel:${listingDetails.listing.identity_and_narrative.business_name}`,
                }}
                accordionItems={
                  listingDetails.listing.frequent_asked_questions.length > 0
                    ? listingDetails.listing.frequent_asked_questions.map(
                        (item: IFAQBusiness) => ({
                          title: item.title,
                          content: (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.answer,
                              }}
                            />
                          ),
                        }),
                      )
                    : []
                }
              />

              <ProductReviewsWrap />

              <FlagVerify
                listing={listingDetails.listing}
                listingPost={listingDetails.listingPost}
              />

              <TestimonialsPanel
                showTheTestimonials={false}
                containerNoPadding={true}
                heading={{
                  show: false,
                  paragraph: "",
                  title: "",
                }}
                banner={{
                  buttonlink: "",
                  buttontext: "List Your Business",
                  bigtitle: "Need help choosing a provider?",
                  paragraph:
                    "Our care team is here to guide you every step of the way.",
                  background_photo: "",
                }}
              />
            </>
          }
          sidebarContent={
            <>
              <FlagVerify
                listing={listingDetails.listing}
                listingPost={listingDetails.listingPost}
              />
              <FormProduct />
            </>
          }
        />

        <FooterLanding menu_footer_items={DashboardData.menu_footer_items} />
      </MyListingProviderEditor>
    </>
  );
}
