import FooterLanding from "@/components/footers/FooterLanding";
import HeaderListingCards from "@/components/headers/HeaderListingCards";
import SubHeaderSearch from "@/components/headers/SubHeaderSearch";
import ProductsPanelsList from "@/components/products/ProductsPanelsList";
import SidebarContent from "@/components/SidebarContainers/SidebarContent";
import TestimonialsPanel from "@/components/testimonials/TestimonialsPanel";

export default function ListingCards() {
  return <>

    <HeaderListingCards />
    <SubHeaderSearch />

    <SidebarContent

      sidebarContent={
        <>
          Sidebar Element Not Clear
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
        buttonLink: "",
        buttonText: "List Your Business",
        bigTitle: "List Your Organization",
        paragraph: "Get found by those who need what you offer."
      }}
    />

    <FooterLanding />

  </>
}