import FooterLanding from "@/components/footers/FooterLanding";
import HeaderListingCards from "@/components/headers/HeaderListingCards";
import TestimonialsPanel from "@/components/testimonials/TestimonialsPanel";

export default function ListingCards() {
  return <>

    <HeaderListingCards />

    <TestimonialsPanel
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