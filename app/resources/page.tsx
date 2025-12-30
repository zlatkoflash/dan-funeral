import HeroHeader from "@/components/heroes/HeroHeader";

import FooterLanding from "@/components/footers/FooterLanding";
import BannerFindSupport from "@/components/banners/BannerFindSupport";
import GuidsGrid from "@/components/directoriesgrid/GuidsGrid";


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