import FooterLanding from "@/components/footers/FooterLanding";
import FormSearch from "@/components/forms/ReadyForms/FormSearch";
import HeaderListingCards from "@/components/headers/HeaderListingCards";
import SubHeaderSearch from "@/components/headers/SubHeaderSearch";
import { IProductPanel } from "@/components/products/ProductPanel";
import ProductsPanelsList from "@/components/products/ProductsPanelsList";
import SidebarContent from "@/components/SidebarContainers/SidebarContent";
import TestimonialsPanel from "@/components/testimonials/TestimonialsPanel";
import { ListingCardsProvider, ListingForPage } from "@/ContextProvider/ListingCardsProvider";
import { getApiData } from "@/utils/api";
import { FetchTheListingsByFilters, IListingFilters } from "@/utils/listing";
import TheFiltersForTheList from "./TheFiltersForTheList";

export default async function FindProviders({ searchParams }: { searchParams: IListingFilters }) {

  // 3. Await the searchParams
  const params = await searchParams;
  console.log("search params:", params);


  const DashboardData = await getApiData("/dashboard/GetBasicData", "GET", {});
  // const getListingsByDefault = await getApiData<{ listings: ListingForPage[], listingsForTheCards: IProductPanel[] }>("/listings/get-list-by-filters", "POST", {});
  // const getListingsByDefault = await FetchTheListingsByFilters(params);
  // console.log("getListingsByDefault>>>:", getListingsByDefault);




  return <>

    <ListingCardsProvider
    // listingsDetails={{} as ListingForPage[]}
    >
      <HeaderListingCards menuItems={DashboardData.menu_header_items} />
      <SubHeaderSearch
        title="Funeral Homes in Chicago"
        breads={[
          {
            label: "Home",
            link: "/"
          },
          {
            label: "Peaceful-memorial-funerals",
            link: ""
          }
        ]}
        right_content={<>
          <FormSearch buttonSearchType="btn-text" />
        </>}
      />

      <SidebarContent

        sidebarContent={
          <>
            <TheFiltersForTheList />
          </>
        }
        content={
          <ProductsPanelsList />
        }

      />

      <TestimonialsPanel
        showTheTestimonials={true}
        heading={{
          show: false, paragraph: "", title: ""
        }}
        banner={{
          buttonlink: "",
          buttontext: "List Your Business",
          bigtitle: "List Your Organization",
          paragraph: "Get found by those who need what you offer.",
          background_photo: ""
        }}
      />

      <FooterLanding menu_footer_items={DashboardData.menu_footer_items} />
    </ListingCardsProvider>
  </>
}