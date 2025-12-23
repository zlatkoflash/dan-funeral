import HeroHeader from "@/components/heroes/HeroHeader";


import FooterLanding from "@/components/footers/FooterLanding";
import OurStory from "@/components/testimonials/OurStory";
import BannerMoment from "@/components/banners/BannerMoment";
import OurMissionGrid from "@/components/directoriesgrid/OurMissionGrid";
import BannerFindSupport from "@/components/banners/BannerFindSupport";

import mission1 from './../../assets/images/mission-1.svg';
import mission2 from './../../assets/images/mission-2.svg';
import mission3 from './../../assets/images/mission-3.svg';

import aboutUsHero from './../../assets/images/pricing-hero.jpg';
import bannerFinaSupprotIllustration from './../../assets/images/paradise-place.png';
import ZError from "../errors/ZError";
import { getApiData } from "@/utils/api";


export default async function PageAboutUs() {


  const pageJson = await getApiData("/get_page_data/about-us");
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
      {...pageJson.acf.hero_header}
      headerListingCards={{ menuItems: pageJson.menu_header_items }}
      //heroPhoto={aboutUsHero}
      showSearchForm={false}
      /*title="Why we built Gentle Road"
      paragraph="Finding a path forward shouldn't be the hardest part."*/
      class="for-about-us"
    />


    <OurStory
      {...pageJson.acf.our_story_block}

    />

    <BannerMoment
      /*heading={{
        paragraph: "",
        show: true,
        title: "A Moment of Clarity",
      }}
      illustration={undefined}
      momentbigtitle="We thought about other major life events. For joyous occasions like weddings, there are beautiful, centralized platforms to help plan, find vendors, and read reviews."
      paragraph="Why was the process for one of life's most difficult moments so broken? We knew there had to be a better, gentler way."*/
      {...pageJson.acf.banner_moment}
    />

    <OurMissionGrid
      /*heading={{
        paragraph: "Gentle Road was created to be the platform we wished we had. It's a directory built on empathy, transparency, and the simple idea that you deserve clarity during a time of need.",
        show: true,
        title: "To Make One Thing Easier",
        paragraphtop: "Our Mission",
        type: "our-mission"
      }}*/
      {...pageJson.acf.our_mission}

      missions={
        pageJson.acf.our_mission.missions.length > 0
          ?
          pageJson.acf.our_mission.missions
          :
          [
            { image: mission1, title: "Everything in One Place", paragraph: "From funeral homes and crematoriums to florists and grief counselors, find all the support you need in one, easy-to-navigate directory." },
            { image: mission2, title: "Fair, Honest Reviews", paragraph: "We believe in transparency. Our platform is a place for fair and honest reviews so you can make informed, confident decisions for your family." },
            { image: mission3, title: "An Empathetic Environment", paragraph: "This is a space free of pressure. We are a guide, not a salesperson. We're just here to provide a clear path and a helping hand." },
          ]}
    />


    <BannerFindSupport
      /*{heading={{
        paragraph: "",
        show: true,
        title: "Let us help you find the way.",
      }}}*/
      {...pageJson.acf.banner_support}
      button={{
        label: "Find Support in Your Community",
        link: "/"
      }}
    // image={bannerFinaSupprotIllustration}
    />



    <FooterLanding menu_footer_items={pageJson.menu_footer_items} />

  </>
}