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
import { zsettings } from "@/settings/ZSettings";
import { IPageInterface } from "./PagesInterfaces";
import { GetStaticPropsContext } from "next";
import { getApiData, getCacheData } from "@/utils/api";
import { notFound } from "next/navigation";
import ZError from "./errors/ZError";
import HeaderSmallForLoggedUser from "@/components/headers/HeaderSmallForLoggedUser";
import { useAuth } from "@/ContextProvider/AuthProviderWrap";

export default async function Home() {

  // const { user } = useAuth();

  // return <></>

  console.log("Home page is rendered");
  /*let pageData, pageJson: IPageInterface;
  try {
    pageData = await fetch(zsettings.apiURL + "/get_page_data/home");
    pageJson = await pageData.json();
  }
  catch (error) {
    console.log("error:", error);
    return null;
  }
  console.log("pageJson:", pageJson);*/
  let pageJson = await getCacheData("home");
  if (pageJson === null) {
    pageJson = await getApiData("/get_page_data/home");
  }
  // const pageJson = await getApiData("/get_page_data/home");
  // return <></>
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

  // console.log('pageJson:', pageJson);

  return <>


    {/*<HeaderSmallForLoggedUser pageId={pageJson.page.ID} />*/}


    <HomeHeroBigImage headerProps={{
      menuItems: pageJson.menu_header_items
    }} {...pageJson.acf.home_hero_big_image} />

    <HomeDirectory {...pageJson.acf.home_directory} />

    <X3DirectoriesPanels
      {...pageJson.acf.x3_directories}
      type="home-page"
    />
    {
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
    }


    <X3PanelsWithServices
      {...pageJson.acf.search_based_on_your_needs}
    />
    {
      /*heading={{
        paragraph: "",
        show: true,
        title: "Search Based on Your Needs"
      }}*/
    }

    <TestimonialsPanel
      {...pageJson.acf.testimonials_home}
      showTheTestimonials={true}
    /*heading={{
      show: true,
      title: "Families Who Found Comfort Through Gentle Road",
      paragraph: "Real stories from families who discovered trusted providers through our platform each experience a reminder of why compassion and clarity matter most."
    }}*/
    /*banner={{
      buttonLink: '',
      buttonText: "List Your Business",
      paragraph: "Every provider on Gentle Road is verified for professionalism, empathy, and service quality so you can focus on what truly matters."
    }}*/
    />


    <GuidsGrid
      {...pageJson.acf.guids_grid}
    /*heading={{
      show: true,
      title: "Guides to Help You Plan with Confidence",
      paragraph: "Explore our most-read resources — simple, compassionate guides to help you make informed decisions and find peace of mind at every step."
    }}
    items={[
      {
        src: guid1,
        title: "How to Choose a Cremation Provider",
        paragraph: "A clear guide to comparing options, understanding costs, and choosing a trusted provider that aligns with your family’s needs.",
        readmorelink: "",
        acf:{
          featured_thumbnail: "How to Choose a Cremation Provider",
          paragraph: "A clear guide to comparing options, understanding costs, and choosing a trusted provider that aligns with your family’s needs."
        },
        post_name: "How to Choose a Cremation Provider",
        post_title: "How to Choose a Cremation Provider"
      },
    ]}*/
    />

    <FooterBanner /*{heading={
      show: true,
      title: "Our Mission",
      paragraph: `Gentle Road was created to bring clarity, compassion, and
peace of mind to families during life’s most difficult moments.`

    }}*/
      {...pageJson.acf.footer_banner}

      link=""
      btnLinkText="List Your Business"
    />

    <FooterLanding menu_footer_items={pageJson.menu_footer_items} />

  </>

}


