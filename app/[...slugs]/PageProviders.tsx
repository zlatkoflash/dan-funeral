import HeaderListingCards from "@/components/headers/HeaderListingCards";
import { getApiData } from "@/utils/api";
import BreadCrumbsBasedOnTheSlugs from "../find-providers/[[...slugs]]/BreadCrumbsBasedOnTheSlugs";
import SidebarContent from "@/components/SidebarContainers/SidebarContent";
import TheFiltersForTheList from "../find-providers/[[...slugs]]/TheFiltersForTheList";
import { ListingCardsProvider } from "@/ContextProvider/ListingCardsProvider";
import ProductsPanelsList from "@/components/products/ProductsPanelsList";
import TestimonialsPanel from "@/components/testimonials/TestimonialsPanel";
import FooterLanding from "@/components/footers/FooterLanding";
import { FetchTheListingsByFilters, formatCityStateSlug, getCityStateValues, getSlugsForListings, IListingFilters, isCityStateSlug, SLUG_DEFAULT_ALL_POSTAL_CODES } from "@/utils/listing";
import { getIP } from "@/utils/user";
import { getOrCreateTimedSeedFromCookie } from "@/utils/listingServer";
import { getValidDeviceId } from "@/utils/deviceServer";
import { cache } from "react";

export const cachedProviders = cache(async ({
  searchParams,
  slugs
}: {
  searchParams: { [key: string]: string };
  slugs: string[];
}) => {
  const allParams = searchParams as unknown as IListingFilters;
  let allParamsString = new URLSearchParams(searchParams).toString();
  if (allParamsString !== "") {
    allParamsString = "?" + allParamsString;
  }
  const { CitySlug,
    // ZipSlug, 
    ServicesSlug,
    // SubServicesSlug 
  } =
    getSlugsForListings(slugs.join("/"));

  const ZipSlug = searchParams.zip || SLUG_DEFAULT_ALL_POSTAL_CODES;
  const SubServicesSlug = searchParams['sub-service'] || "";

  let ipDetails = {};
  if (ZipSlug === "" || ZipSlug === SLUG_DEFAULT_ALL_POSTAL_CODES) {
    const ip = await getIP();
    ipDetails = { ip };
  }

  const itemsPerPage = 10;
  const cityValues = getCityStateValues(CitySlug);
  const pageIndex = isNaN(Number(allParams.pageIndex)) ? 1 : Number(allParams.pageIndex);
  const seed_integer = await getOrCreateTimedSeedFromCookie();
  console.log("SEED INTEGER >>>>>> ", seed_integer);

  const filtersForListing = {

    cityValues,

    ...{
      CitySlug,
      ZipSlug,
      ServicesSlug,
      SubServicesSlug,
    },

    ...allParams,
    ...ipDetails,
    itemsPerPage: itemsPerPage,
    pageIndex: pageIndex !== undefined ? pageIndex : 1,
  };
  console.log("Filters for the listings:", filtersForListing);
  const result = await FetchTheListingsByFilters(
    filtersForListing,
    seed_integer,
  );
  return {
    result,
    seed_integer,
  };
})

export async function PageProviders(
  {
    typeOfSlugs,
    slugs,
    searchParams
  }
    :
    {
      typeOfSlugs: "all-providers" | "city-state" | "category" | "city-category",
      slugs: string[],
      searchParams: { [key: string]: string }
    }
) {

  const allParams = searchParams as unknown as IListingFilters;
  let allParamsString = new URLSearchParams(searchParams).toString();
  if (allParamsString !== "") {
    allParamsString = "?" + allParamsString;
  }
  const pageIndex = isNaN(Number(allParams.pageIndex)) ? 1 : Number(allParams.pageIndex);

  /**
   * ===Loading the list of listings directly [start]====
   */
  /*const allParams = searchParams as unknown as IListingFilters;
  let allParamsString = new URLSearchParams(searchParams).toString();
  if (allParamsString !== "") {
    allParamsString = "?" + allParamsString;
  }
  const { CitySlug,
    // ZipSlug, 
    ServicesSlug,
    // SubServicesSlug 
  } =
    getSlugsForListings(slugs.join("/"));

  const ZipSlug = searchParams.zip || SLUG_DEFAULT_ALL_POSTAL_CODES;
  const SubServicesSlug = searchParams['sub-service'] || "";

  let ipDetails = {};
  if (ZipSlug === "" || ZipSlug === SLUG_DEFAULT_ALL_POSTAL_CODES) {
    const ip = await getIP();
    ipDetails = { ip };
  }

  const itemsPerPage = 10;
  const cityValues = getCityStateValues(CitySlug);
  const pageIndex = isNaN(Number(allParams.pageIndex)) ? 1 : Number(allParams.pageIndex);
  const seed_integer = await getOrCreateTimedSeedFromCookie();
  console.log("SEED INTEGER >>>>>> ", seed_integer);

  const filtersForListing = {

    cityValues,

    ...{
      CitySlug,
      ZipSlug,
      ServicesSlug,
      SubServicesSlug,
    },

    ...allParams,
    ...ipDetails,
    itemsPerPage: itemsPerPage,
    pageIndex: pageIndex !== undefined ? pageIndex : 1,
  };
  console.log("Filters for the listings:", filtersForListing);
  const result = await FetchTheListingsByFilters(
    filtersForListing,
    seed_integer,
  );*/

  // console.log("result listing::", result);
  // result.listings[0].post_name
  // result.listingsForTheCards

  const { result, seed_integer } = await cachedProviders(
    {
      searchParams,
      slugs,
    }
  );

  /**
   * Now we capture the viewing for the all the listings appearing in the
   * current view, to know which listing should appear in the top and
   * get highlighted
   */
  const device_id = await getValidDeviceId();

  console.log("device_id: ", device_id, "seed_integer: ", seed_integer);

  getApiData(
    "/listings/count-listings-search-appearance",
    "POST",
    {
      device_id: device_id,
      listing_ids: result.listingsForTheCards.map((listing) => listing.id),
    },
    "not-authorize",
    "application/json",
  );

  /**
   * ===Loading the list of listings directly [end]====
   */


  let title = "";
  let description = "";
  if (typeOfSlugs === "all-providers") {
    title = "All Funeral & End-of-Life Service Providers | Complete Directory";
    description = "Browse our comprehensive directory of end-of-life service providers, final arrangement professionals, and memorial care. Find trusted support tailored to your family's needs.";
  }
  else if (typeOfSlugs === "city-state") {
    const cityDetails = getCityStateValues(slugs[0]);
    title = `Funeral & End-of-Life Service Providers in ${cityDetails.city}, ${cityDetails.state_id} | Local Directory`;
    description = `Browse local end-of-life service providers, final arrangement professionals, and care options in ${cityDetails.city}, ${cityDetails.state_id}. Find trusted, compassionate support serving the ${cityDetails.city}, ${cityDetails.state_id} area.`;
  }
  else if (typeOfSlugs === "category" && result.category !== null) {
    // Assuming your category slug is stored in slugs[0] or a specific variable
    const rawCategory = slugs[0] || "services";

    // Convert "funeral-service-x-x" into "Funeral Service X X" (or format it nicely)
    const formattedCategory = result.category.name;

    title = `${formattedCategory} & End-of-Life Providers | Directory`;
    description = `Find local ${formattedCategory} and end-of-life service providers. Compare professional care and options to find the right support for your needs.`;
  }
  else if (typeOfSlugs === "city-category" && result.category !== null) {
    const cityDetails = getCityStateValues(slugs[0]);
    const rawCategory = slugs[1] || "services";

    const formattedCategory = result.category.name;

    title = `${formattedCategory} in ${cityDetails.city}, ${cityDetails.state_id} | Local Providers`;
    description = `Browse local ${formattedCategory} in ${cityDetails.city}, ${cityDetails.state_id}. Find professional funeral and end-of-life care options tailored to your community.`;
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  // 2. Construct the JSON-LD schema object
  /**/
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': title,
    'description': description,
    'itemListElement': result.listings.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.title,
      'url': `${baseUrl}/${slugs.join('/')}/${item.post_name}`
    }))
  };

  const DashboardData = await getApiData("/dashboard/GetBasicData", "GET", {});

  const getBreadCrumbs = (): { label: string, link: string }[] => {
    if (slugs.length === 1 && slugs[0] === 'providers') {
      return [
        {
          label: "Home",
          link: `/providers/`,
        },
      ];
    }
    if (slugs.length === 1 && isCityStateSlug(slugs[0])) {
      return [
        {
          label: "Home",
          link: "/providers/",
        },
        {
          label: formatCityStateSlug(slugs[0]) || "",
          link: `/${slugs[0]}${allParamsString}`,
        },
      ];
    }
    if (slugs.length === 2 && result.category !== null) {
      return [
        {
          label: "Home",
          link: "/providers/",
        },
        {
          label: formatCityStateSlug(slugs[0]) || "",
          link: `/${slugs[0]}${allParamsString}`,
        },
        {
          label: result.category.name || "",
          link: `/${slugs[0]}/${slugs[1]}${allParamsString}`,
        },
      ];
    }
    return [];
  }

  const breadcrumbs = getBreadCrumbs();


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

  console.log("slugs pages:", slugs);

  return <>

    {/* 1. Add the JSON-LD script tag here */}
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />


    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />

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
    <BreadCrumbsBasedOnTheSlugs items={getBreadCrumbs()} />

    <SidebarContent
      className="for-filters"
      sidebarContent={
        <>
          <TheFiltersForTheList />
        </>
      }
      content={
        <ListingCardsProvider outListings={result}>
          <ProductsPanelsList
            slugs={slugs}
            params={searchParams}
            showQuickFacts={pageIndex === 1}
            category={result.category}
          />
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