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


    <GuidsGrid />

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
