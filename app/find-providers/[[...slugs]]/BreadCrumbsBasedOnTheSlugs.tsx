"use client";

import { IWPCategory } from "@/app/Dashboard/MyListing/AddNewListing/MyListingProviderEditor";
import { ICategory } from "@/components/directoriesgrid/HomeDirectory";
import FormSearch from "@/components/forms/ReadyForms/FormSearch";
import SubHeaderSearch from "@/components/headers/SubHeaderSearch";
import {
  formatCityStateSlug,
  formatSlugToTitle,
  getSlugsForListings,
  isCityStateSlug,
  SLUG_DEFAULT_ALL_CATEGORIES,
  SLUG_DEFAULT_ALL_CITIES,
  SLUG_DEFAULT_ALL_POSTAL_CODES,
  SLUG_DEFAULT_ALL_SUBCATEGORIES,
} from "@/utils/listing";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * This component is only for the providers page.
 * 
 * @returns 
 */
export default function BreadCrumbsBasedOnTheSlugs(
  { category = null, items }
    :
    { category?: IWPCategory | null, items: { label: string, link: string }[] }
) {
  // because we usePathname this component will rerender always when the link is changed
  // event for rerendering is auto added
  const path = usePathname();
  const slugsArray = path.split("/").filter((slug) => slug !== "");

  // const path = window.location.pathname;
  const slugs = getSlugsForListings(path);
  // const paramsSlugs = await params;
  // console.log("paramsSlugs:", paramsSlugs);

  // const URLSlugs = paramsSlugs.slugs !== undefined ? paramsSlugs.slugs : [];

  /*const citySlug = URLSlugs[0] || "";
  const zipSlug = URLSlugs[1] || "";
  const serviceSlug = URLSlugs[2] || "";
  const subServiceSlug = URLSlugs[3] || "";*/
  const citySlug = slugs.CitySlug;
  // const zipSlug = slugs.ZipSlug;
  const serviceSlug = slugs.ServicesSlug;
  // const subServiceSlug = slugs.SubServicesSlug;

  console.log("CitySlug:", citySlug);
  console.log("ServicesSlug:", serviceSlug);

  let titleForThePage = "Gentle Road Services";
  /*if (
    subServiceSlug !== SLUG_DEFAULT_ALL_SUBCATEGORIES &&
    subServiceSlug !== ""
  ) {
    titleForThePage = formatSlugToTitle(subServiceSlug);
  } else */if (
    serviceSlug !== SLUG_DEFAULT_ALL_CATEGORIES &&
    serviceSlug !== ""
  ) {
    titleForThePage = formatSlugToTitle(serviceSlug);
  }
  if (citySlug !== SLUG_DEFAULT_ALL_CITIES && citySlug !== "") {
    titleForThePage = titleForThePage + " in " + formatSlugToTitle(citySlug);
  }

  /*let breadcrumbs = [
    {
      label: "Home",
      link: "/providers/",
    },
   
  ];*/
  // let getParams = new URLSearchParams(paramsGetFilters as any).toString();
  let getParams = new URLSearchParams(window.location.search).toString();
  if (getParams !== "") {
    getParams = "?" + getParams;
  }
  /*
  if (citySlug !== SLUG_DEFAULT_ALL_CITIES && citySlug !== "") {
    breadcrumbs.push({
      label: formatSlugToTitle(citySlug),
      link: `/${citySlug}${getParams}`,
    });
  }
  if (serviceSlug !== SLUG_DEFAULT_ALL_CATEGORIES && serviceSlug !== "") {
    breadcrumbs.push({
      label: formatSlugToTitle(serviceSlug),
      link: `/${citySlug}/${serviceSlug}${getParams}`,
    });
  }*/

  /*const getBreadCrumbs = (): { label: string, link: string }[] => {
    if (slugsArray.length === 1 && slugsArray[0] === 'providers') {
      return [
        {
          label: "Home",
          link: `/providers/`,
        },
      ];
    }
    if (slugsArray.length === 1 && isCityStateSlug(slugsArray[0])) {
      return [
        {
          label: "Home",
          link: "/providers/",
        },
        {
          label: formatCityStateSlug(slugsArray[0]) || "",
          link: `/${slugsArray[0]}${getParams}`,
        },
      ];
    }
    if (slugsArray.length === 2 && category !== null) {
      return [
        {
          label: "Home",
          link: "/providers/",
        },
        {
          label: formatCityStateSlug(slugsArray[0]) || "",
          link: `/${slugsArray[0]}${getParams}`,
        },
        {
          label: category.name || "",
          link: `/${slugsArray[0]}/${slugsArray[1]}${getParams}`,
        },
      ];
    }
    return [];
  }*/


  return (
    <>
      <SubHeaderSearch
        title={titleForThePage}
        breads={items}
        right_content={
          <>
            <FormSearch buttonSearchType="btn-text" />
          </>
        }
      />
    </>
  );
}
