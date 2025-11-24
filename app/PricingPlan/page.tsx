import FooterLanding from "@/components/footers/FooterLanding";
import HeroHeader from "@/components/heroes/HeroHeader";

import pricingHero from './../../assets/images/pricing-hero.jpg';
import TestimonialsPanel from "@/components/testimonials/TestimonialsPanel";
import X3DirectoriesPanels from "@/components/directoriesgrid/X3DirectoriesPanels";



import help1 from './../../assets/images/1-help.jpg';
import help2 from './../../assets/images/2-help.jpg';
import help3 from './../../assets/images/3-help.jpg';
import PlansAndPricing from "@/components/pricing/PlansAndPricing";

export default function PricingPlanPage() {
  return <>

    <HeroHeader
      heroPhoto={pricingHero}
      showSearchForm={false}
      title="Business Pricing plan"
      paragraph="Clear and transparent pricing and listing structures to make it easy to grow your business and help people find what they are looking for."
    />


    <PlansAndPricing />


    <X3DirectoriesPanels
      headingTitleParagraph={{
        show: true,
        title: "How Gentle Road Helps You",
        paragraph: "We simplify the planning process in three easy steps."
      }}
      panels={[
        {
          src: help1,
          title: "Search for your city  ",
          link: "",
        },
        {
          src: help2,
          title: "Compare trusted providers",
          link: "",
        },
        {
          src: help3,
          title: "Connect directly for guidance  ",
          link: "",
        },
      ]}
    />


    <TestimonialsPanel
      showTheTestimonials={true}
      heading={{
        show: false,
        title: "",
        paragraph: ""
      }}
      banner={{
        buttonLink: '',
        buttonText: "List Your Business",
        bigTitle: "List Your Organization",
        paragraph: "Get found by those who need what you offer."
      }}
    />

    <FooterLanding />

  </>
}