import FooterLanding from "@/components/footers/FooterLanding";
import FormSearch from "@/components/forms/ReadyForms/FormSearch";
import HeaderListingCards from "@/components/headers/HeaderListingCards";
import SubHeaderSearch from "@/components/headers/SubHeaderSearch";
import { IProductPanel } from "@/components/products/ProductPanel";
import ProductsPanelsList from "@/components/products/ProductsPanelsList";
import SidebarContent from "@/components/SidebarContainers/SidebarContent";
import TestimonialsPanel from "@/components/testimonials/TestimonialsPanel";
import {
  ListingCardsProvider,
  ListingForPage,
} from "@/ContextProvider/ListingCardsProvider";
import { getApiData } from "@/utils/api";
import {
  FetchTheListingsByFilters,
  formatSlugToTitle,
  IListingFilters,
} from "@/utils/listing";
import TheFiltersForTheList from "./TheFiltersForTheList";

export default async function FindProviders({
  searchParams,
  params,
}: {
  searchParams: IListingFilters;
  params: Promise<{ slugs: string[] }>;
}) {
  // 3. Await the searchParams
  const paramsGetFilters = await searchParams;
  console.log("search params:", paramsGetFilters);

  const paramsSlugs = await params;
  console.log("paramsSlugs:", paramsSlugs);

  const URLSlugs = paramsSlugs.slugs !== undefined ? paramsSlugs.slugs : [];

  const citySlug = URLSlugs[0] || "";
  const serviceSlug = URLSlugs[1] || "";
  const subServiceSlug = URLSlugs[2] || "";

  let titleForThePage = "Gentle Road Services";
  if (subServiceSlug !== "all-subcategories" && subServiceSlug !== "") {
    titleForThePage = formatSlugToTitle(subServiceSlug);
  } else if (serviceSlug !== "all-categories" && serviceSlug !== "") {
    titleForThePage = formatSlugToTitle(serviceSlug);
  }
  if (citySlug !== "all-cities" && citySlug !== "") {
    titleForThePage = titleForThePage + " in " + formatSlugToTitle(citySlug);
  }

  const DashboardData = await getApiData("/dashboard/GetBasicData", "GET", {});

  let breadcrumbs = [
    {
      label: "Home",
      link: "/find-providers/",
    },
    /*{
      label: "Peaceful-memorial-funerals",
      link: ""
    }*/
  ];
  let getParams = new URLSearchParams(paramsGetFilters as any).toString();
  if (getParams !== "") {
    getParams = "?" + getParams;
  }
  if (citySlug !== "all-cities" && citySlug !== "") {
    breadcrumbs.push({
      label: formatSlugToTitle(citySlug),
      link: `/find-providers/${citySlug}${getParams}`,
    });
  }
  if (serviceSlug !== "all-categories" && serviceSlug !== "") {
    breadcrumbs.push({
      label: formatSlugToTitle(serviceSlug),
      link: `/find-providers/${citySlug}/${serviceSlug}${getParams}`,
    });
  }
  if (subServiceSlug !== "all-subcategories" && subServiceSlug !== "") {
    breadcrumbs.push({
      label: formatSlugToTitle(subServiceSlug),
      link: `/find-providers/${citySlug}/${serviceSlug}/${subServiceSlug}${getParams}`,
    });
  }

  // 2. Extract the slug(s)
  // const slugData = params.slug;

  return (
    <>
      {/*<ListingCardsProvider
    // listingsDetails={{} as ListingForPage[]}
    >*/}
      <HeaderListingCards menuItems={DashboardData.menu_header_items} />
      <SubHeaderSearch
        title={titleForThePage}
        breads={breadcrumbs}
        right_content={
          <>
            <FormSearch buttonSearchType="btn-text" />
          </>
        }
      />

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
    </>
  );
}
