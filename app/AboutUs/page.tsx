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


export default function PageAboutUs() {
  return <>
    <HeroHeader
      heroPhoto={aboutUsHero}
      showSearchForm={false}
      title="Why we built Gentle Road"
      paragraph="Finding a path forward shouldn't be the hardest part."
      class="for-about-us"
    />


    <OurStory

      heading={{
        paragraph: "",
        show: true,
        title: "It started with a loss.",
        paragraphTop: "Our Story"
      }}

      author="Alex Chen, VP of Strategy"
      image={undefined}
      quote="I credit three major strategic decisions this year to insights I first encountered in Letterhead—it's like having a brilliant analyst working exclusively for me."
      storyContent={`<p>Like many, our journey began with the passing of a beloved family member. Amid the grief, we were suddenly expected to be project managers for one of life's most complex and time-sensitive events.</p>
    <p>We spent days making dozens of calls, trying to compare services we didn't understand.</p><p>The process was tedious, the information was fragmented, and we constantly felt vulnerable to high-pressure sales tactics. We were being over-sold at a time when we were at our lowest.</p>
    <p>We just wanted one place to see our options clearly, so we could focus on our family.</p>`}

    />

    <BannerMoment
      heading={{
        paragraph: "",
        show: true,
        title: "A Moment of Clarity",
      }}
      illustration={undefined}
      momentBigTitle="We thought about other major life events. For joyous occasions like weddings, there are beautiful, centralized platforms to help plan, find vendors, and read reviews."
      paragraph="Why was the process for one of life's most difficult moments so broken? We knew there had to be a better, gentler way."
    />

    <OurMissionGrid
      heading={{
        paragraph: "Gentle Road was created to be the platform we wished we had. It's a directory built on empathy, transparency, and the simple idea that you deserve clarity during a time of need.",
        show: true,
        title: "To Make One Thing Easier",
        paragraphTop: "Our Mission",
        type: "our-mission"
      }}

      missions={[
        { image: mission1, title: "Everything in One Place", paragraph: "From funeral homes and crematoriums to florists and grief counselors, find all the support you need in one, easy-to-navigate directory." },
        { image: mission2, title: "Fair, Honest Reviews", paragraph: "We believe in transparency. Our platform is a place for fair and honest reviews so you can make informed, confident decisions for your family." },
        { image: mission3, title: "An Empathetic Environment", paragraph: "This is a space free of pressure. We are a guide, not a salesperson. We're just here to provide a clear path and a helping hand." },
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