import ClaimYourFreePage from "@/components/banners/ClaimYourFreePage";
import X3DirectoriesPanels from "@/components/directoriesgrid/X3DirectoriesPanels";
import FooterLanding from "@/components/footers/FooterLanding";
import HeroHeader from "@/components/heroes/HeroHeader";


import help1 from './../../assets/images/1-help.jpg';
import help2 from './../../assets/images/2-help.jpg';
import help3 from './../../assets/images/3-help.jpg';
import GuidsGrid from "@/components/directoriesgrid/GuidsGrid";
import TestimonialsPanel from "@/components/testimonials/TestimonialsPanel";


import guid1 from './../../assets/images/guid-1.jpg';
import guid2 from './../../assets/images/guid-2.jpg';
import guid3 from './../../assets/images/guid-3.jpg';


import marketingHero from './../../assets/images/marketing-hero.jpg';
import { getApiData } from "@/utils/api";
import ZError from "../errors/ZError";
import PlansAndPricing from "@/components/pricing/PlansAndPricing";

export default async function MarketingPage() {

  const pageJson = await getApiData("/get_page_data/marketing");
  console.log("pageJson:", pageJson);

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

  return <>

    <HeroHeader
      {...pageJson.acf.hero_header}
      showSearchForm={true}
      // heroPhoto={marketingHero}
      /*title="Simply search for your business below."
      paragraph="Can’t find it? Add your business name, and we’ll help you claim your Gentle Road Page."*/
      headerListingCards={{ menuItems: pageJson.menu_header_items }}
    />

    <ClaimYourFreePage {...pageJson.acf.claim_your_free_page} />

    {/*<X3DirectoriesPanels
      headingTitleParagraph={{
        title: "How Claiming Your Business Works",
        paragraph: "We make it simple for service providers to join Gentle Road in three easy steps.",
        show: true,
        type: "marketing-x3-panels",

      }}
      panels={[
        { link: "/", src: help1, title: "Find your listing", paragrpah: "Search for your funeral home, service, or venue to see if it already exists on Gentle Road.", type: "marketing-page", btnDirLabel: "Claim Your Business" },
        { link: "/", src: help2, title: "Verify and update details", paragrpah: "Claim your page, confirm ownership, and update your information so families can trust and contact you.", type: "marketing-page", btnDirLabel: "Claim Your Business" },
        { link: "/", src: help3, title: "Connect with families", paragrpah: "Respond to inquiries, showcase your services, and support families directly during their planning journey.", type: "marketing-page", btnDirLabel: "Claim Your Business" },
      ]}
    />*/}
    <X3DirectoriesPanels
      {...pageJson.acf.x3_directories_panels}
      type="marketing-page"
    />


    <PlansAndPricing {...pageJson.acf.plans_and_pricing} />


    <GuidsGrid {...pageJson.acf.guids_grid} />
    {/*<GuidsGrid
      heading={{
        show: true,
        title: "Guides to Help You Plan with Confidence",
        paragraph: "Explore our most-read resources — simple, compassionate guides to help you make informed decisions and find peace of mind at every step."
      }}
      items={[
        {
          src: guid1,
          title: "How to Choose a Cremation Provider",
          paragraph: "A clear guide to comparing options, understanding costs, and choosing a trusted provider that aligns with your family’s needs.",
          readmorelink: ""
        },
        {
          src: guid2,
          title: "What to Include in a Memorial Service",
          paragraph: "Discover thoughtful ways to personalize a service from meaningful rituals to small details that create lasting comfort.",
          readmorelink: ""
        },
        {
          src: guid3,
          title: "Legal and Estate Essentials Made Simple",
          paragraph: "Get clarity on the key documents and steps involved in managing wills, estates, and end-of-life planning.",
          readmorelink: ""
        },
      ]}
    />*/}



    <TestimonialsPanel
      {...pageJson.acf.testimonials_home}
      showTheTestimonials={true}
    />
    {/*<TestimonialsPanel
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
    />*/}



    <FooterLanding menu_footer_items={pageJson.menu_footer_items} />

  </>
}