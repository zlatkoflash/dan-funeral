import FooterBanner from "@/components/banners/FooterBanner";
import GuidsGrid from "@/components/directoriesgrid/GuidsGrid";
import HomeDirectory from "@/components/directoriesgrid/HomeDirectory";
import X3DirectoriesPanels from "@/components/directoriesgrid/X3DirectoriesPanels";
import FooterLanding from "@/components/footers/FooterLanding";
import HomeHeroBigImage from "@/components/heroes/HomeHeroBigImage";
import TestimonialsPanel from "@/components/testimonials/TestimonialsPanel";
// import Image from "next/image";


import help1 from './../assets/images/1-help.jpg';
import help2 from './../assets/images/2-help.jpg';
import help3 from './../assets/images/3-help.jpg';


import guid1 from './../assets/images/guid-1.jpg';
import guid2 from './../assets/images/guid-2.jpg';
import guid3 from './../assets/images/guid-3.jpg';
import X3PanelsWithServices from "@/components/directoriesgrid/X3PanelsWithServices";

export default function Home() {

  console.log("Home page is rendered");

  return <>

    <HomeHeroBigImage />
    <HomeDirectory />

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


    <X3PanelsWithServices
      heading={{
        paragraph: "",
        show: true,
        title: "Search Based on Your Needs"
      }}
    />

    <TestimonialsPanel
      showTheTestimonials={true}
      heading={{
        show: true,
        title: "Families Who Found Comfort Through Gentle Road",
        paragraph: "Real stories from families who discovered trusted providers through our platform each experience a reminder of why compassion and clarity matter most."
      }}
      banner={{
        buttonLink: '',
        buttonText: "List Your Business",
        paragraph: "Every provider on Gentle Road is verified for professionalism, empathy, and service quality so you can focus on what truly matters."
      }}
    />


    <GuidsGrid
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
          readMoreLink: ""
        },
        {
          src: guid2,
          title: "What to Include in a Memorial Service",
          paragraph: "Discover thoughtful ways to personalize a service from meaningful rituals to small details that create lasting comfort.",
          readMoreLink: ""
        },
        {
          src: guid3,
          title: "Legal and Estate Essentials Made Simple",
          paragraph: "Get clarity on the key documents and steps involved in managing wills, estates, and end-of-life planning.",
          readMoreLink: ""
        },
      ]}
    />

    <FooterBanner heading={{
      show: true,
      title: "Our Mission",
      paragraph: `Gentle Road was created to bring clarity, compassion, and
peace of mind to families during life’s most difficult moments.`

    }}

      link=""
      btnLinkText="List Your Business"
    />

    <FooterLanding />

  </>

}
