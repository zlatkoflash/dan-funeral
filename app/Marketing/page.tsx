import ClaimYourFreePage from "@/components/banners/ClaimYourFreePage";
import X3DirectoriesPanels from "@/components/directoriesgrid/X3DirectoriesPanels";
import FooterLanding from "@/components/footers/FooterLanding";
import HeroHeader from "@/components/heroes/HeroHeader";


import help1 from './../../assets/images/1-help.jpg';
import help2 from './../../assets/images/2-help.jpg';
import help3 from './../../assets/images/3-help.jpg';
import GuidsGrid from "@/components/directoriesgrid/GuidsGrid";
import TestimonialsPanel from "@/components/testimonials/TestimonialsPanel";


import marketingHero from './../../assets/images/marketing-hero.jpg';

export default function MarketingPage() {
  return <>

    <HeroHeader
      heroPhoto={marketingHero}
      showSearchForm={true}
      title="Simply search for your business below."
      paragraph="Can’t find it? Add your business name, and we’ll help you claim your Gentle Road Page."
    />

    <ClaimYourFreePage />

    <X3DirectoriesPanels
      headingTitleParagraph={{
        title: "How Claiming Your Business Works",
        paragraph: "We make it simple for service providers to join Gentle Road in three easy steps.",
        show: true,
        type: "marketing-x3-panels"
      }}
      panels={[
        { link: "/", src: help1, title: "Find your listing", paragrpah: "Search for your funeral home, service, or venue to see if it already exists on Gentle Road.", type: "marketing-page", btnDirLabel: "Claim Your Business" },
        { link: "/", src: help2, title: "Verify and update details", paragrpah: "Claim your page, confirm ownership, and update your information so families can trust and contact you.", type: "marketing-page", btnDirLabel: "Claim Your Business" },
        { link: "/", src: help3, title: "Connect with families", paragrpah: "Respond to inquiries, showcase your services, and support families directly during their planning journey.", type: "marketing-page", btnDirLabel: "Claim Your Business" },
      ]}
    />



    <GuidsGrid />



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