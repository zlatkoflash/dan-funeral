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
import BreadCrumbsBasedOnTheSlugs from "./BreadCrumbsBasedOnTheSlugs";

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

  const DashboardData = await getApiData("/dashboard/GetBasicData", "GET", {});

  // 2. Extract the slug(s)
  // const slugData = params.slug;

  return (
    <>
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
    </>
  );
}
