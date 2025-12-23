import FooterBanner from "@/components/banners/FooterBanner";
import GuidsGrid from "@/components/directoriesgrid/GuidsGrid";
import FooterLanding from "@/components/footers/FooterLanding";
import HeroHeader from "@/components/heroes/HeroHeader";
import PostContent from "@/components/post/PostContent";
import { getApiData } from "@/utils/api";
import { notFound } from "next/navigation";
import ZError from "../errors/ZError";

export default async function StandardPostPage({ params }: { params: { slug: string } }) {

  /*const itFound = false;

  if (!itFound) {
      // when no found it will load no-found.tsx page
      notFound(); // 👈 This is running
  }*/

  const paramsLoaded = await params;

  const pageJson = await getApiData("/get_page_data/" + paramsLoaded.slug);

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
  else if (pageJson.acf === undefined) {
    return <ZError status={404} />
  }

  console.log("pageJson universal page:", pageJson);

  if (pageJson.acf.post__page_template === "resource-detail-template")
    return <>
      <HeroHeader
        herophoto={""}
        showSearchForm={false}
        title={pageJson.page.post_title}
        paragraph="Explore our most-read resources — simple, compassionate guides to help you make informed decisions and find peace of mind at every step."
        class="for-post"
        headerListingCards={{
          menuItems: pageJson.menu_header_items
        }}
      />



      <PostContent
        /*intro={{
            title: pageJson.page.post_title,
            paragraph: pageJson.page.acf.paragraph,
            profile: {
                ...pageJson.page_creator_profile_details
            }
        }}
        featuredImage={pageJson.acf.hero_image}
        contentItems={[]}*/
        {...pageJson.post_content_global}
      />


      <GuidsGrid
        heading={{
          show: true,
          title: "Read More Related Content",
          paragraph: "",
        }}
        items={pageJson.x3RandomGridPosts}
      />


      <FooterBanner
        heading={{
          show: true,
          title: "Our Mission",
          paragraph: "Gentle Road was created to bring clarity, compassion, and peace of mind to families during life’s most difficult moments.",

        }}
        link="/Dashboard/MyListing"
        btnLinkText="List Your Business"
      />

      <FooterLanding menu_footer_items={pageJson.menu_footer_items} />
    </>

  {
    // here returning the other template :)
  }
  return <>
    <HeroHeader
      herophoto={""}
      showSearchForm={false}
      title={pageJson.page.post_title}
      paragraph="Explore our most-read resources — simple, compassionate guides to help you make informed decisions and find peace of mind at every step."
      class="for-post"
      headerListingCards={{
        menuItems: pageJson.menu_header_items
      }}
    />

    <PostContent
      intro={{
        title: pageJson.page.post_title,
        paragraph: pageJson.page.post_excerpt,
        /*profile: {
            name: "Michael Charleston",
            postUpdateDate: "May 18, 2023",
            photo: undefined
        }*/
      }}
      featuredImage={pageJson.acf.hero_image !== undefined && pageJson.acf.hero_image !== "" && pageJson.acf.hero_image !== null ? pageJson.acf.hero_image : undefined}
      // contentItems={pageJson.page.content_items}
      contentHTMLPage={pageJson.page.post_content}

    />

    {
      pageJson.acf.guids_grid !== undefined && pageJson.acf.guids_grid.items !== undefined && pageJson.acf.guids_grid.items.length > 0 && (<GuidsGrid {...pageJson.acf.guids_grid} />)
    }



    {
      pageJson.acf.footer_banner !== undefined && pageJson.acf.footer_banner.background_image !== '' && (<FooterBanner
        {...pageJson.acf.footer_banner}

        link=""
        btnLinkText="List Your Business"
      />)
    }


    <FooterLanding menu_footer_items={pageJson.menu_footer_items} />
  </>
}