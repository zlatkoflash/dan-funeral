import FooterBanner from "@/components/banners/FooterBanner";
import GuidsGrid from "@/components/directoriesgrid/GuidsGrid";
import FooterLanding from "@/components/footers/FooterLanding";
import HeroHeader from "@/components/heroes/HeroHeader";
import PostContent from "@/components/post/PostContent";
import { getApiData, getCacheData } from "@/utils/api";
// import { notFound } from "next/navigation";
import ZError from "../errors/ZError";
import HeaderListingCards from "@/components/headers/HeaderListingCards";
import BreadCrumbsBasedOnTheSlugs from "../find-providers/[[...slugs]]/BreadCrumbsBasedOnTheSlugs";
import SidebarContent from "@/components/SidebarContainers/SidebarContent";
import TheFiltersForTheList from "../find-providers/[[...slugs]]/TheFiltersForTheList";
import { ListingCardsProvider } from "@/ContextProvider/ListingCardsProvider";
import ProductsPanelsList from "@/components/products/ProductsPanelsList";
import TestimonialsPanel from "@/components/testimonials/TestimonialsPanel";
import { isCityStateSlug } from "@/utils/listing";
import { IListing, MyListingProviderEditor } from "../Dashboard/MyListing/AddNewListing/MyListingProviderEditor";
import { ILE10ServiceOffering } from "../Dashboard/MyListing/content/ListingEditor/content/LE10ServiceOffering";
import ProviderEvents from "../provider/[slug]/ProviderEvents";
import SubHeaderOnlyBreadCrumbs from "@/components/headers/SubHeaderOnlyBreadCrumbs";
import ProductDetailsGallery from "@/components/galleries/ProductDetailsGallery";
import ProductContentSidebar from "@/components/SidebarContainers/ProductContentSidebar";
import ProductTitleAndFeedback from "@/components/productDetails/ProductTitleAndFeedback";
import ProductGoogleMap from "@/components/productDetails/ProductGoogleMap";
import ProductAbout from "@/components/productDetails/ProductAbout";
import ProductAboutVideoPlayer from "@/components/productDetails/ProductAboutVideo";
import ProductServies from "@/components/productDetails/ProductServies";
import ProductQuickFactsWrap from "@/components/productDetails/ProductQuickFactsWrap";
import PricingList from "@/components/pricing/PricingList";
import { IOtherService } from "../DashboardV2/DashboardComponents/ServicesEditor/ServicesEditor";
import ProductsFAQs from "@/components/productDetails/ProductsFAQs";
import { IFAQBusiness } from "../DashboardV2/EditBusiness/components/editors/BusinessFAQsEditor";
import ProductReviewsWrap from "@/components/productDetails/ProductReviewsWrap";
import FlagVerify from "@/components/flags/FlagVerify";
import FormProduct from "@/components/forms/ReadyForms/FormProduct";

export default async function StandardPostPage({ params }: { params: { slugs: string[] } }) {


  const resolvedParams = await params;
  console.log("resolvedParams:", resolvedParams);
  const slugs = resolvedParams.slugs || [];

  console.log("slugs:", slugs);
  const checkIfThereIs_category_or_provider = await getApiData<{
    ok: boolean,
    message: string,
    provider_exist: boolean,
    category_exist: boolean,
    provider: { ID: string, post_name: string, }
  }>('/listings/check-if-slugs-have-category-or-provider', "POST", {
    slugs: slugs
  }, "not-authorize", "application/json");

  console.log("checkIfThereIs_category_or_provider:", checkIfThereIs_category_or_provider);

  if (checkIfThereIs_category_or_provider.provider_exist === true) {
    const contentProvider = await ListingPage(
      {
        providerSlug: checkIfThereIs_category_or_provider.provider.post_name,
        slugs: slugs
      }
    );
    return contentProvider;
  }

  if (slugs[0] === 'providers' || isCityStateSlug(slugs[0]) || checkIfThereIs_category_or_provider.category_exist) {
    const providersContent = await PageProviders();
    return providersContent;
  }

  // 1. Handle the homepage explicitly so it never 404s
  /*if (slugs.length === 0) {
    return <>Homepage Works!</>;
  }

  // 2. Handle captured segments
  return <>ssss - {slugs.join('/')}</>;*/


  /**
   * finally we load post content
   */
  const contentPost = await PostPageContent({ slug: slugs[0] });

  return contentPost;

}


async function PageProviders() {


  const DashboardData = await getApiData("/dashboard/GetBasicData", "GET", {});

  return <>
    {/*<ListingCardsProvider
      // listingsDetails={{} as ListingForPage[]}
      >*/}
    <HeaderListingCards menuItems={DashboardData.menu_header_items} />
    {/*<SubHeaderSearch
          title={titleForThePage}
          breads={breadcrumbs}
          right_content={
            <>
              <FormSearch buttonSearchType="btn-text" />
            </>
          }
        />*/}
    <BreadCrumbsBasedOnTheSlugs />

    <SidebarContent
      className="for-filters"
      sidebarContent={
        <>
          <TheFiltersForTheList />
        </>
      }
      content={
        <ListingCardsProvider>
          <ProductsPanelsList />
        </ListingCardsProvider>
      }
    />

    <TestimonialsPanel
      showTheTestimonials={true}
      heading={{
        show: false,
        paragraph: "",
        title: "",
      }}
      banner={{
        buttonlink: "",
        buttontext: "List Your Business",
        bigtitle: "List Your Organization",
        paragraph: "Get found by those who need what you offer.",
        background_photo: "",
      }}
    />

    <FooterLanding menu_footer_items={DashboardData.menu_footer_items} />
    {/*</ListingCardsProvider>*/}
  </>;

}

async function PostPageContent({ slug }: { slug: string }) {
  let pageJson: any = await getCacheData(slug);

  if (pageJson === null) {
    pageJson = await getApiData("/get_page_data/" + slug);
  }
  else {
  }

  if (pageJson.status === 404) {
    // this is not found from the server
    // notFound();
    return <ZError status={405} />
  }
  else if (pageJson.status === 500) {
    // server error
    return <ZError status={500} />
  }
  else if (pageJson.status === 501) {
    // internal error
    return <ZError status={501} />
  }
  else if (pageJson.acf === undefined) {
    return <ZError status={404} />
  }

  // console.log("pageJson universal page:", pageJson);


  // return <>AAAA</>


  if (pageJson.acf.post__page_template === "privacy-policy-template") {
    return <>
      <HeroHeader
        herophoto={""}
        showSearchForm={false}
        title={pageJson.page.post_title}
        paragraph="Explore our most-read resources — simple, compassionate guides to help you make informed decisions and find peace of mind at every step."
        class="for-post"
        headerListingCards={{
          menuItems: pageJson.menu_header_items
        }}
      />

      <PostContent

        {
        ...pageJson.post_content_global
        // ...{contentHTMLPage:pageJson.page.post_content}
        }
        contentHTMLPage={pageJson.page.post_content}
        hideShare={true}
        hideIntroPhoto={true}
        contentItems={[]}

      />



      <FooterLanding menu_footer_items={pageJson.menu_footer_items} />

    </>
  }
  else if (pageJson.acf.post__page_template === "resource-detail-template")
    return <>
      <HeroHeader
        herophoto={""}
        showSearchForm={false}
        title={pageJson.page.post_title}
        paragraph="Explore our most-read resources — simple, compassionate guides to help you make informed decisions and find peace of mind at every step."
        class="for-post"
        headerListingCards={{
          menuItems: pageJson.menu_header_items
        }}
      />



      <PostContent
        {...pageJson.post_content_global}
      />


      <GuidsGrid
        heading={{
          show: true,
          title: "Read More Related Content",
          paragraph: "",
        }}
        items={pageJson.x3RandomGridPosts}
      />


      <FooterBanner
        heading={{
          show: true,
          title: "Our Mission",
          paragraph: "Gentle Road was created to bring clarity, compassion, and peace of mind to families during life’s most difficult moments.",

        }}
        link="/Dashboard/MyListing"
        btnLinkText="List Your Business"
      />

      <FooterLanding menu_footer_items={pageJson.menu_footer_items} />
    </>

  {
    // here returning the other template :)
  }
  return <>
    <HeroHeader
      herophoto={""}
      showSearchForm={false}
      title={pageJson.page.post_title}
      paragraph="Explore our most-read resources — simple, compassionate guides to help you make informed decisions and find peace of mind at every step."
      class="for-post"
      headerListingCards={{
        menuItems: pageJson.menu_header_items
      }}
    />

    <PostContent
      intro={{
        title: pageJson.page.post_title,
        paragraph: pageJson.page.post_excerpt,
      }}
      featuredImage={pageJson.acf.hero_image !== undefined && pageJson.acf.hero_image !== "" && pageJson.acf.hero_image !== null ? pageJson.acf.hero_image : undefined}
      contentHTMLPage={pageJson.page.post_content}

    />

    {
      pageJson.acf.guids_grid !== undefined && pageJson.acf.guids_grid.items !== undefined && pageJson.acf.guids_grid.items.length > 0 && (<GuidsGrid {...pageJson.acf.guids_grid} />)
    }



    {
      pageJson.acf.footer_banner !== undefined && pageJson.acf.footer_banner.background_image !== '' && (<FooterBanner
        {...pageJson.acf.footer_banner}

        link=""
        btnLinkText="List Your Business"
      />)
    }


    <FooterLanding menu_footer_items={pageJson.menu_footer_items} />
  </>
}




async function ListingPage({
  /*params,
  searchParams,*/
  providerSlug,
  slugs
}: {
  /*params: Promise<{ slug: string }>;
  searchParams: { [key: string]: string | string[] | undefined };*/
  providerSlug: string,
  slugs: string[]
}) {
  // const listingSlug = (await params).slug;
  // onsole.log("listingSlug:", listingSlug);

  const listingDetails = await getApiData<{
    // listingv2: IListingCompleteDetails;
    ok: boolean;
    listing: IListing;
    listingPost: { ID: string; post_title: string; post_author: number };
  }>(`/listings/get-listing-by-slug`, "POST",
    { listingSlug: providerSlug }
  );
  console.log("listingDetails:", listingDetails);

  if (listingDetails.ok !== true) {
    return <ZError
      status={404}
      message="Listing Provider Not Found"
    />
  }

  /*await getApiData(
    "/listings/count-listing-view",
    "POST",
    { listing_id: listingDetails.listingPost.ID },
    "not-authorize",
    "application/json",
  );*/

  const DashboardData = await getApiData("/dashboard/GetBasicData", "GET", {});

  console.log("listingDetails:", listingDetails)

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
  console.log("listingDetails.listing:", listingDetails.listing);

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
              { label: "Find Providers", link: "/providers" },
              { label: listingDetails.listingPost.post_title, link: "" },
            ],
          }}
        />

        <ProductDetailsGallery />

        <ProductContentSidebar
          content={
            <>
              <ProductTitleAndFeedback />
              {
                // <ProductMap />
              }
              <ProductGoogleMap />
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
                title="Frequently Asked Questions"
                headingButton={{
                  label: "Call Now",
                  link: `tel:${listingDetails.listing.identity_and_narrative.business_name}`,
                }}
                accordionItems={
                  listingDetails.listing.frequent_asked_questions.length > 0
                    ? listingDetails.listing.frequent_asked_questions.map(
                      (item: IFAQBusiness) => ({
                        title: item.title,
                        content: item.answer,
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



