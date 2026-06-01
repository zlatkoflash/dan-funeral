"use client";

import TextInput from "@/components/forms/Input";
import { getApiData } from "@/utils/api";
import {
  executeSearchFiltersRedirect,
  getSlugsForListings,
} from "@/utils/listing";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ICategoryLocal } from "./FilterServices";

/*interface ICategoryLocal {
  term_id: number;
  slug: string;
  name: string;
  count: number;
  children: ICategoryLocal[];
}*/

export default function FilterSubServices() {
  const pathname = usePathname(); // e.g., "/services/marketing/seo"

  const { CitySlug, ServicesSlug, SubServicesSlug } =
    getSlugsForListings(pathname);

  const router = useRouter();

  // const [mainServices, setMainServices] = useState<ICategoryLocal[]>([]);
  const [subServices, setSubServices] = useState<ICategoryLocal[]>([]);
  // const [selectedMain, setSelectedMain] = useState(ServicesSlug);
  const [selectedSub, setSelectedSub] = useState(SubServicesSlug);

  const ___LoadTheSubServices = async () => {
    const dataForSubServices = await getApiData<{
      ok: boolean;
      categories: ICategoryLocal[];
    }>(
      "/listings/get-sub-services",
      "POST",
      {
        main_service_slug: ServicesSlug,
      },
      "not-authorize",
      "application/json",
    );
    console.log("dataForSubServices:", dataForSubServices);
    if (dataForSubServices.ok && dataForSubServices.categories !== undefined) {
      setSubServices(dataForSubServices.categories);
    } else {
      setSubServices([]);
      console.log("Error loading sub services");
    }
    /*if (response.ok) {
      setSubServices(response.categories);
    }*/
  };

  useEffect(() => {
    ___LoadTheSubServices();
  }, [pathname, ServicesSlug]);

  // Map the ICategoryLocal array to the format TextInput expects
  /*const mainServiceOptions = [
    { value: "", label: "All Services" },
    ...mainServices.map((cat) => ({
      value: cat.slug, // Using slug as the unique value
      label: `(${cat.count}) ${cat.name}`,
    })),
  ];*/
  const subServiceOptions = [
    { value: "", label: "All Sub Services" },
    ...subServices.map((cat) => ({
      value: cat.slug, // Using slug as the unique value
      label: `(${cat.count}) ${cat.name}`,
    })),
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="filter-list-radios">
        {subServices.map((category, index: number) => {
          return (
            <div
              className="form-check form-check-filter"
              key={`filter-list-radio-wrap-${index}`}
            >
              <input
                type="radio"
                name="filter-sub-categories"
                id={`filter-categories-${category.term_id}`}
                className="form-check-input"
                checked={selectedSub === category.slug}
                value={category.slug}
                onChange={(e) => {
                  setSelectedSub(e.target.value);
                  executeSearchFiltersRedirect({
                    pageIndex: 1,
                    paramsArray: [
                      {
                        paramName: "expanded-services",
                        paramValue: "true",
                      },
                    ],
                    router: router,
                    slugsForChange: {
                      // slug1_city: "",
                      slug2_category: ServicesSlug,
                      slug3_sub_category: category.slug,
                      // slug3_sub_category: "",
                      // slug4_sub_service: ""
                    },
                  });
                }}
              />
              <label htmlFor={`filter-categories-${category.term_id}`}>
                {category.name}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
