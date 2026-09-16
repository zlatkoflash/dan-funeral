import { getApiData } from "@/utils/api";
import { IListing, IWPCategory, MyListingProviderEditor } from "../Dashboard/MyListing/AddNewListing/MyListingProviderEditor";
import ZError from "../errors/ZError";
import { ILE10ServiceOffering } from "../Dashboard/MyListing/content/ListingEditor/content/LE10ServiceOffering";
import ProviderEvents from "../provider/[slug]/ProviderEvents";
import HeaderListingCards from "@/components/headers/HeaderListingCards";
import SubHeaderOnlyBreadCrumbs from "@/components/headers/SubHeaderOnlyBreadCrumbs";
import ProductDetailsGallery from "@/components/galleries/ProductDetailsGallery";
import ProductContentSidebar from "@/components/SidebarContainers/ProductContentSidebar";
import ProductTitleAndFeedback from "@/components/productDetails/ProductTitleAndFeedback";
import ProductGoogleMap from "@/components/productDetails/ProductGoogleMap";
import ProductAbout from "@/components/productDetails/ProductAbout";
import ProductAboutVideoPlayer from "@/components/productDetails/ProductAboutVideo";
import ProductQuickFactsWrap from "@/components/productDetails/ProductQuickFactsWrap";
import ProductServies from "@/components/productDetails/ProductServies";
import PricingList from "@/components/pricing/PricingList";
import { IOtherService } from "../DashboardV2/DashboardComponents/ServicesEditor/ServicesEditor";
import ProductsFAQs from "@/components/productDetails/ProductsFAQs";
import { IFAQBusiness } from "../DashboardV2/EditBusiness/components/editors/BusinessFAQsEditor";
import ProductReviewsWrap from "@/components/productDetails/ProductReviewsWrap";
import FlagVerify from "@/components/flags/FlagVerify";
import TestimonialsPanel from "@/components/testimonials/TestimonialsPanel";
import FormProduct from "@/components/forms/ReadyForms/FormProduct";
import FooterLanding from "@/components/footers/FooterLanding";
import { formatCityStateSlug, isCityStateSlug } from "@/utils/listing";

export async function ListingPage({
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
    category: IWPCategory
  }>(`/listings/get-listing-by-slug`, "POST",
    {
      listingSlug: providerSlug,
      categorySlug: slugs.length === 3 ? slugs[1] : slugs[0]
    }
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

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const breadCrumbsLinks = (): { label: string, link: string }[] => {
    if (slugs.length === 1) {
      // when only slug of the company is there
      return [
        { label: "Home", link: "/" },
        { label: "Providers", link: "/providers" },
        { label: listingDetails.listingPost.post_title, link: `${baseUrl}/${slugs.join('/')}` },
      ]
    }
    if (slugs.length === 2 && listingDetails.category !== null) {
      // when we have city/category and company slug
      return [
        { label: "Home", link: "/" },
        { label: "Providers", link: "/providers" },
        { label: listingDetails.category.name, link: `/${slugs[0]}` },
        { label: listingDetails.listingPost.post_title, link: `${baseUrl}/${slugs.join('/')}` },
      ]
    }
    if (slugs.length === 2 && isCityStateSlug(slugs[0])) {
      // when we have city/category and company slug
      return [
        { label: "Home", link: "/" },
        { label: "Providers", link: "/providers" },
        { label: formatCityStateSlug(slugs[0]) || "", link: `/${slugs[0]}` },
        { label: listingDetails.listingPost.post_title, link: `${baseUrl}/${slugs.join('/')}` },
      ]
    }
    if (slugs.length === 3 && listingDetails.category !== null) {
      // when we have city/category and company slug
      return [
        { label: "Home", link: "/" },
        { label: "Providers", link: "/providers" },
        { label: formatCityStateSlug(slugs[0]) || "", link: `/${slugs[0]}` },
        { label: listingDetails.category.name, link: `/${slugs[0]}/${slugs[1]}` },
        { label: listingDetails.listingPost.post_title, link: `${baseUrl}/${slugs.join('/')}` },
      ]
    }

    return [];
  }


  console.log("listingDetails.listing.location_primary:", listingDetails.listing.location_primary);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FuneralHome', // Change from ItemList to FuneralHome
    'name': listingDetails.listing.identity_and_narrative.business_name,
    'description': listingDetails.listing.identity_and_narrative.about_us?.replace(/<[^>]*>?/gm, '') || '',
    'image': listingDetails.listing.media.featured_image.preview || '',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': listingDetails.listing.location_primary?.display_name || '',
      'addressLocality': listingDetails.listing.location_primary?.city || '',
      'addressRegion': listingDetails.listing.location_primary?.state_code || '',
      'postalCode': listingDetails.listing.location_primary?.postal_code || '',
      'addressCountry': 'US'


    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': listingDetails.listing.location_primary?.lat || '',
      'longitude': listingDetails.listing.location_primary?.lng || '',
    },
    'telephone': listingDetails.listing.identity_and_narrative.phone_number || '',
    'url': `${baseUrl}/${slugs.join('/')}`
  };

  console.log("jsonLd::::", jsonLd);

  const breadcrumbs = breadCrumbsLinks();
  // 2. Map the array into Schema.org format
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': crumb.label,
      // Ensure the URL is absolute (handles relative or absolute paths returned by your function)
      'item': crumb.link.startsWith('http') ? crumb.link : `${baseUrl}${crumb.link}`
    }))
  };

  console.log("breadcrumbJsonLd:", breadcrumbJsonLd);

  console.log("listingDetails.listing.faqs:", listingDetails.listing.frequent_asked_questions);
  // Map your provider's FAQs into Schema.org format
  const faqJsonLd = listingDetails.listing.frequent_asked_questions && listingDetails.listing.frequent_asked_questions.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': listingDetails.listing.frequent_asked_questions.map(faq => ({
      '@type': 'Question',
      'name': faq.title,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
          .replace(/<[^>]*>?/gm, '') // Strips HTML tags like <p>, <br>, etc.
          .replace(/&#8217;/g, "'")   // Fixes common HTML entities if needed
          .trim()
      }
    }))
  } : null;


  return (
    <>

      {/* 1. Add the JSON-LD script tag here */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}


      <MyListingProviderEditor
        actualListingId={listingDetails.listingPost.ID}
        listingInit={listingDetails.listing}
      >
        <ProviderEvents listing_id={listingDetails.listingPost.ID} />
        <HeaderListingCards menuItems={DashboardData.menu_header_items} />

        <SubHeaderOnlyBreadCrumbs
          bread={{
            links: breadCrumbsLinks(),
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
