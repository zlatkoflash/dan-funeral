export const dynamic = 'force-dynamic';

import FooterBanner from "@/components/banners/FooterBanner";
import GuidsGrid from "@/components/directoriesgrid/GuidsGrid";
import FooterLanding from "@/components/footers/FooterLanding";
import HeroHeader from "@/components/heroes/HeroHeader";
import PostContent from "@/components/post/PostContent";
import { getApiData, getCacheData } from "@/utils/api";
// import { notFound } from "next/navigation";
import ZError from "../errors/ZError";

import { formatCityStateSlug, isCityStateSlug } from "@/utils/listing";

import { cachedProviders, PageProviders } from "./PageProviders";
import { ListingPage } from "./PageProvider";
import { cache } from "react";
import { IWPCategory } from "../Dashboard/MyListing/AddNewListing/MyListingProviderEditor";
import { env } from "process";


// Wrap the check in React's cache
export const getCachedCategoryOrProvider = cache(async (slugs: string[]) => {
  return await getApiData<{
    ok: boolean;
    message: string;
    category_exist: boolean;
    category: IWPCategory;
    provider_exist: boolean;
    provider: { ID: string; post_name: string; post_title: string };
  }>(
    '/listings/check-if-slugs-have-category-or-provider',
    "POST",
    { slugs },
    "not-authorize",
    "application/json"
  );
});

export async function generateMetadata(
  { params, searchParams }
    :
    {
      params: { slugs: string[] };
      searchParams: Promise<{ [key: string]: string }>;
    }) {


  const searchParamsFor = await searchParams;
  const paramsFor = await params;
  let getParams = new URLSearchParams(searchParamsFor).toString();
  if (getParams !== "") {
    getParams = "?" + getParams;
  }



  console.log("paramsFor metadata::::", paramsFor);
  const { slugs } = paramsFor;

  const checkIfThereIs_category_or_provider = await getCachedCategoryOrProvider(slugs);

  console.log("checkIfThereIs_category_or_provider:", checkIfThereIs_category_or_provider);

  const baseURL = process.env.NEXT_PUBLIC_SITE_URL || "https://gentleroad.com"
  const pageUrl = `${baseURL}/${slugs.join('/')}${getParams}`;

  let title = "";
  let description = "";

  let robotIndexThePage = true;
  if (!checkIfThereIs_category_or_provider.provider_exist && (
    checkIfThereIs_category_or_provider.category_exist || isCityStateSlug(slugs[0]) || slugs[0] === "providers"
  )) {

    const { result, seed_integer } = await cachedProviders({
      searchParams: await searchParams,
      slugs: paramsFor.slugs
    });

    if (result.listings.length < 3) {
      robotIndexThePage = false;
    }
  }

  if (checkIfThereIs_category_or_provider.provider_exist) {
    title = `${checkIfThereIs_category_or_provider.provider.post_title} - Reviews, Services & Contact | Gentle Road`;
    description = "";
    // let keywords = []; // google ignore the keywords
    if (checkIfThereIs_category_or_provider.category_exist && isCityStateSlug(slugs[0])) {
      description = `Read verified reviews, check service options, and contact ${checkIfThereIs_category_or_provider.provider.post_title}, a trusted provider for ${formatCityStateSlug(slugs[0])} in ${checkIfThereIs_category_or_provider.category.name}.`;
      // keywords = [`${checkIfThereIs_category_or_provider.provider.post_name}`, `${formatCityStateSlug(slugs[0])}`, `${checkIfThereIs_category_or_provider.category.name}`];
    }
    else if (!checkIfThereIs_category_or_provider.category_exist && isCityStateSlug(slugs[0])) {
      description = `Browse local end-of-life service providers, final arrangement professionals, and memorial care. Find trusted support tailored to your family's needs in ${formatCityStateSlug(slugs[0])}.`
    }
    else if (checkIfThereIs_category_or_provider.category_exist && !isCityStateSlug(slugs[0])) {
      description = `Read verified reviews, check service options, and contact ${checkIfThereIs_category_or_provider.provider.post_title}, a trusted provider for ${checkIfThereIs_category_or_provider.category.name}.`
    }
    else if (slugs[0] === "providers") {
      description = `Read verified reviews, check service options, and contact ${checkIfThereIs_category_or_provider.provider.post_title}, a trusted provider.`
    }
    // checkIfThereIs_category_or_provider.provider.

  }
  else if (isCityStateSlug(slugs[0]) && checkIfThereIs_category_or_provider.category_exist) {
    title = `${checkIfThereIs_category_or_provider.category.name} in ${formatCityStateSlug(slugs[0])} | Gentle Road`;
    description = `${checkIfThereIs_category_or_provider.category.description} in ${formatCityStateSlug(slugs[0])} - Reviews, Services & Contact | Gentle Road`;

  }
  else if (!isCityStateSlug(slugs[0]) && checkIfThereIs_category_or_provider.category_exist) {
    title = `${checkIfThereIs_category_or_provider.category.name} | Gentle Road`;
    description = `${checkIfThereIs_category_or_provider.category.description} in - Reviews, Services & Contact | Gentle Road`;

  }
  else if (isCityStateSlug(slugs[0])) {
    title = `${formatCityStateSlug(slugs[0])} | Gentle Road`;
    description = `Browse local end-of-life service providers, final arrangement professionals, and memorial care. Find trusted support tailored to your family's needs in ${formatCityStateSlug(slugs[0])}.`;
  }
  else if (slugs[0] === 'providers') {
    title = "All Funeral & End-of-Life Service Providers | Complete Directory";
    description = "Browse our comprehensive directory of end-of-life service providers, final arrangement professionals, and memorial care. Find trusted support tailored to your family's needs.";
  }
  else {
    // here for post
  }

  return {
    title: title,
    description: description,
    /* is not used anymore google ignore keywords
    keywords: [
      checkIfThereIs_category_or_provider.provider.post_name,
      `${checkIfThereIs_category_or_provider.provider.post_name} ${city}`,
      `${category} ${city}`,
      `local funeral services ${city}`
    ],*/
    robots: {
      index: robotIndexThePage,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
    alternates: { canonical: pageUrl },
    openGraph: {
      title: title,
      description: description,
      url: pageUrl,
      type: 'website',
    },
  };

  /*const city = slugs[0];
  const category = slugs[1];
  // const providers = await getProvidersByHub(city, category);
  const providers = [1, 2, 3, 4];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gentleroad.com';
  const pageUrl = `${siteUrl}/${city}/${category}`;

  // Zero-Results Protocol: Hide thin pages from search engines
  if (providers.length < 3) {
    return {
      title: `Funeral Providers in ${city}`,
      description: `Explore local funeral homes and service providers in ${city}.`,
      robots: { index: false, follow: true },
      alternates: { canonical: pageUrl },
    };
  }

  // Standard metadata for fully populated hub pages
  return {
    title: `Best ${category} in ${city} | Verified Providers`,
    description: `Compare top-rated ${category} in ${city}. Read verified reviews, view service options, and connect with trusted local professionals.`,
    keywords: [`${category} ${city}`, `funeral homes ${city}`, `local funeral services ${city}`],
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
    alternates: { canonical: pageUrl },
    openGraph: {
      title: `Best ${category} in ${city} | Gentle Road`,
      description: `Compare top-rated ${category} in ${city}. Find trusted local providers.`,
      url: pageUrl,
      type: 'website',
    },
  };*/
}

export default async function StandardPostPage({ params, searchParams }: { params: { slugs: string[] }, searchParams: { [key: string]: string } }) {


  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  console.log("resolvedParams:", resolvedParams);
  const slugs = resolvedParams.slugs || [];

  console.log("resolvedSearchParams:", resolvedSearchParams);

  console.log("slugs:", slugs);
  /*const checkIfThereIs_category_or_provider = await getApiData<{
    ok: boolean,
    message: string,
    provider_exist: boolean,
    category_exist: boolean,
    provider: { ID: string, post_name: string, }
  }>('/listings/check-if-slugs-have-category-or-provider', "POST", {
    slugs: slugs
  }, "not-authorize", "application/json");*/
  const checkIfThereIs_category_or_provider = await getCachedCategoryOrProvider(slugs);

  console.log("checkIfThereIs_category_or_provider:", checkIfThereIs_category_or_provider);

  if (checkIfThereIs_category_or_provider.provider_exist === true) {
    /*const contentProvider = await ListingPage(
      {
        providerSlug: checkIfThereIs_category_or_provider.provider.post_name,
        slugs: slugs
      }
    );
    return contentProvider;*/
    return <ListingPage providerSlug={checkIfThereIs_category_or_provider.provider.post_name} slugs={slugs} />
  }

  if (
    slugs[0] === 'providers'
    || isCityStateSlug(slugs[0])
    || checkIfThereIs_category_or_provider.category_exist
  ) {
    let typeOfListing: "all-providers" | "city-state" | "category" | "city-category" = "all-providers";

    if (slugs[0] === 'providers') {
      typeOfListing = "all-providers";
    }
    else if (slugs.length === 2 && isCityStateSlug(slugs[0]) && checkIfThereIs_category_or_provider.category_exist) {
      typeOfListing = "city-category";
    }
    else if (isCityStateSlug(slugs[0])) {
      typeOfListing = "city-state";
    }
    else if (checkIfThereIs_category_or_provider.category_exist) {
      typeOfListing = "category";
    }

    /*const providersContent = await PageProviders(typeOfListing);
    return providersContent;*/
    return <PageProviders
      typeOfSlugs={typeOfListing}
      slugs={slugs}
      searchParams={resolvedSearchParams}
    />
  }

  // 1. Handle the homepage explicitly so it never 404s
  /*if (slugs.length === 0) {
    return <>Homepage Works!</>;
  }

  // 2. Handle captured segments
  return <>ssss - {slugs.join('/')}</>;*/


  /**
   * finally we load post content
   */
  const contentPost = await PostPageContent({ slug: slugs[0] });

  return contentPost;

}



async function PostPageContent({ slug }: { slug: string }) {
  let pageJson: any = await getCacheData(slug);

  if (pageJson === null) {
    pageJson = await getApiData("/get_page_data/" + slug);
  }
  else {
  }

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

  // console.log("pageJson universal page:", pageJson);


  // return <>AAAA</>


  if (pageJson.acf.post__page_template === "privacy-policy-template") {
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

        {
        ...pageJson.post_content_global
        // ...{contentHTMLPage:pageJson.page.post_content}
        }
        contentHTMLPage={pageJson.page.post_content}
        hideShare={true}
        hideIntroPhoto={true}
        contentItems={[]}

      />



      <FooterLanding menu_footer_items={pageJson.menu_footer_items} />

    </>
  }
  else if (pageJson.acf.post__page_template === "resource-detail-template")
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
      }}
      featuredImage={pageJson.acf.hero_image !== undefined && pageJson.acf.hero_image !== "" && pageJson.acf.hero_image !== null ? pageJson.acf.hero_image : undefined}
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






