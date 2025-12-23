import HeroHeader from "@/components/heroes/HeroHeader";

import FooterLanding from "@/components/footers/FooterLanding";
import BannerFindSupport from "@/components/banners/BannerFindSupport";
import GuidsGrid from "@/components/directoriesgrid/GuidsGrid";


import aboutUsHero from './../../assets/images/pricing-hero.jpg';
import bannerFinaSupprotIllustration from './../../assets/images/paradise-place.png';

import guid1 from './../../assets/images/guid-1.jpg';
import guid2 from './../../assets/images/guid-2.jpg';
import guid3 from './../../assets/images/guid-3.jpg';
import ZError from "../errors/ZError";
import { getApiData } from "@/utils/api";

export default async function ResourcesPage() {


  const pageJson = await getApiData("/get_page_data/resource");
  // console.log("pageJson:", pageJson);

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
      /*heroPhoto={aboutUsHero}
      title="Guides to Help You Plan with Confidence"
      paragraph="Explore our most-read resources — simple, compassionate guides to help you make informed decisions and find peace of mind at every step."
      */
      {...pageJson.acf.hero_header}
      headerListingCards={{
        menuItems: pageJson.menu_header_items
      }}
      class="for-resource"
      showSearchForm={true}
    />

    {
      <GuidsGrid
        heading={{
          show: false,
          title: "Guides to Help You Plan with Confidence",
          paragraph: "Explore our most-read resources — simple, compassionate guides to help you make informed decisions and find peace of mind at every step."
        }}
        // {...pageJson.acf.posts_grid_guids_grid}
        items={pageJson.acf.posts_grid_guids_grid.items}
      /*items={[
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
      ]}*/
      />
    }



    <BannerFindSupport
      /*heading={{
        paragraph: "",
        show: true,
        title: "Let us help you find the way.",
      }}
      image={bannerFinaSupprotIllustration}*/
      {...pageJson.acf.banner_support}
      button={{
        label: "Find Support in Your Community",
        link: "/"
      }}
    />


    <FooterLanding menu_footer_items={pageJson.menu_footer_items} />

  </>
}