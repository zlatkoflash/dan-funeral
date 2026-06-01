"use client";

import FormSearch from "@/components/forms/ReadyForms/FormSearch";
import SubHeaderSearch from "@/components/headers/SubHeaderSearch";
import {
  formatSlugToTitle,
  getSlugsForListings,
  SLUG_DEFAULT_ALL_CATEGORIES,
  SLUG_DEFAULT_ALL_CITIES,
  SLUG_DEFAULT_ALL_POSTAL_CODES,
  SLUG_DEFAULT_ALL_SUBCATEGORIES,
} from "@/utils/listing";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function BreadCrumbsBasedOnTheSlugs() {
  // because we usePathname this component will rerender always when the link is changed
  // event for rerendering is auto added
  const path = usePathname();

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
  const zipSlug = slugs.ZipSlug;
  const serviceSlug = slugs.ServicesSlug;
  const subServiceSlug = slugs.SubServicesSlug;

  console.log("CitySlug:", citySlug);
  console.log("ZipSlug:", zipSlug);
  console.log("ServicesSlug:", serviceSlug);
  console.log("SubServicesSlug:", subServiceSlug);

  let titleForThePage = "Gentle Road Services";
  if (
    subServiceSlug !== SLUG_DEFAULT_ALL_SUBCATEGORIES &&
    subServiceSlug !== ""
  ) {
    titleForThePage = formatSlugToTitle(subServiceSlug);
  } else if (
    serviceSlug !== SLUG_DEFAULT_ALL_CATEGORIES &&
    serviceSlug !== ""
  ) {
    titleForThePage = formatSlugToTitle(serviceSlug);
  }
  if (citySlug !== SLUG_DEFAULT_ALL_CITIES && citySlug !== "") {
    titleForThePage = titleForThePage + " in " + formatSlugToTitle(citySlug);
  }

  let breadcrumbs = [
    {
      label: "Home",
      link: "/find-providers/",
    },
    /*{
        label: "Peaceful-memorial-funerals",
        link: ""
      }*/
  ];
  // let getParams = new URLSearchParams(paramsGetFilters as any).toString();
  let getParams = new URLSearchParams(window.location.search).toString();
  if (getParams !== "") {
    getParams = "?" + getParams;
  }
  if (citySlug !== SLUG_DEFAULT_ALL_CITIES && citySlug !== "") {
    breadcrumbs.push({
      label: formatSlugToTitle(citySlug),
      link: `/find-providers/${citySlug}${getParams}`,
    });
  }
  if (zipSlug !== SLUG_DEFAULT_ALL_POSTAL_CODES && zipSlug !== "") {
    breadcrumbs.push({
      label: formatSlugToTitle(zipSlug),
      link: `/find-providers/${citySlug}/${zipSlug}${getParams}`,
    });
  }
  if (serviceSlug !== SLUG_DEFAULT_ALL_CATEGORIES && serviceSlug !== "") {
    breadcrumbs.push({
      label: formatSlugToTitle(serviceSlug),
      link: `/find-providers/${citySlug}/${zipSlug}/${serviceSlug}${getParams}`,
    });
  }
  if (
    subServiceSlug !== SLUG_DEFAULT_ALL_SUBCATEGORIES &&
    subServiceSlug !== ""
  ) {
    breadcrumbs.push({
      label: formatSlugToTitle(subServiceSlug),
      link: `/find-providers/${citySlug}/${zipSlug}/${serviceSlug}/${subServiceSlug}${getParams}`,
    });
  }

  return (
    <>
      <SubHeaderSearch
        title={titleForThePage}
        breads={breadcrumbs}
        right_content={
          <>
            <FormSearch buttonSearchType="btn-text" />
          </>
        }
      />
    </>
  );
}
