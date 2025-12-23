import FooterLanding from "@/components/footers/FooterLanding";
import HeroHeader from "@/components/heroes/HeroHeader";

import pricingHero from './../../assets/images/pricing-hero.jpg';
import TestimonialsPanel from "@/components/testimonials/TestimonialsPanel";
import X3DirectoriesPanels from "@/components/directoriesgrid/X3DirectoriesPanels";



import help1 from './../../assets/images/1-help.jpg';
import help2 from './../../assets/images/2-help.jpg';
import help3 from './../../assets/images/3-help.jpg';
import PlansAndPricing from "@/components/pricing/PlansAndPricing";
import FeaturedPlacement from "@/components/banners/FeaturedPlacement";
import { getApiData } from "@/utils/api";
import ZError from "../errors/ZError";
import HeaderSmallForLoggedUser from "@/components/headers/HeaderSmallForLoggedUser";
import { IStripeSubscription, StripePlansProvider } from "@/ContextProvider/StripePlansProvider";
import APlansAndPricingStripe from "@/components/pricing/APlansAndPricingStripe";
import { getActivePricingSubscription, getStripePlans } from "@/utils/stripe";

export default async function PricingPlanPage() {


  const pageJson = await getApiData("/get_page_data/pricing-plan");
  // console.log("pageJson:", pageJson);

  const stripePlans = await getStripePlans();
  const activePricingSubscription = await getActivePricingSubscription();

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
  else if (pageJson.status === 401 || pageJson.code === "incorrect_password") {
    // internal error
    return <ZError status={401} />
  }

  return <>

    {/*<HeaderSmallForLoggedUser pageId={pageJson.page.ID} />*/}

    <HeroHeader
      /*heroPhoto={pricingHero}
      showSearchForm={false}
      title="Business Pricing plan"
      paragraph="Clear and transparent pricing and listing structures to make it easy to grow your business and help people find what they are looking for."*/
      {...pageJson.acf.hero_header}
      headerListingCards={{ menuItems: pageJson.menu_header_items }}
      showSearchForm={false}
    />


    {
      // <PlansAndPricing {...pageJson.acf.plans_and_pricing} />
    }
    <StripePlansProvider plans={stripePlans} activeSubscriptionInit={activePricingSubscription.exists ? activePricingSubscription.subscription as IStripeSubscription : null}>
      <APlansAndPricingStripe heading={{
        ...pageJson.acf.plans_and_pricing.heading,
        show: true,
      }} />
    </StripePlansProvider>


    <FeaturedPlacement />


    <X3DirectoriesPanels
      {...pageJson.acf.x3_directories_panels}
      heading={{
        ...pageJson.acf.x3_directories_panels.heading,
        show: true,
      }}
    /*headingTitleParagraph={{
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
    ]}*/
    />


    <TestimonialsPanel
      /*showTheTestimonials={true}
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
      }}*/

      {...pageJson.acf.testimonials_home}
      showTheTestimonials={true}

    />

    <FooterLanding menu_footer_items={pageJson.menu_footer_items} />

  </>
}