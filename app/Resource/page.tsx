import HeroHeader from "@/components/heroes/HeroHeader";

import FooterLanding from "@/components/footers/FooterLanding";
import BannerFindSupport from "@/components/banners/BannerFindSupport";
import GuidsGrid from "@/components/directoriesgrid/GuidsGrid";


import aboutUsHero from './../../assets/images/pricing-hero.jpg';
import bannerFinaSupprotIllustration from './../../assets/images/paradise-place.png';

import guid1 from './../../assets/images/guid-1.jpg';
import guid2 from './../../assets/images/guid-2.jpg';
import guid3 from './../../assets/images/guid-3.jpg';

export default function ResourcePage() {
  return <>

    <HeroHeader
      heroPhoto={aboutUsHero}
      showSearchForm={true}
      title="Guides to Help You Plan with Confidence"
      paragraph="Explore our most-read resources — simple, compassionate guides to help you make informed decisions and find peace of mind at every step."
      class="for-resource"
    />

    <GuidsGrid
      heading={{
        show: false,
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



    <BannerFindSupport
      heading={{
        paragraph: "",
        show: true,
        title: "Let us help you find the way.",
      }}
      button={{
        label: "Find Support in Your Community",
        link: "/"
      }}
      image={bannerFinaSupprotIllustration}
    />


    <FooterLanding />

  </>
}