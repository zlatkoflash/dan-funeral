"use client";

import TextInput from "@/components/forms/Input";
import { getApiData } from "@/utils/api";
import {
  executeSearchFiltersRedirect,
  getSlugsForListings,
  SLUG_DEFAULT_ALL_SUBCATEGORIES,
} from "@/utils/listing";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface ICategoryLocal {
  term_id: number;
  slug: string;
  name: string;
  count: number;
  children: ICategoryLocal[];
}

export default function FilterServices({
  onCategoryChange,
}: {
  onCategoryChange: (category: ICategoryLocal | null) => void;
}) {
  const pathname = usePathname(); // e.g., "/services/marketing/seo"

  const { CitySlug, ServicesSlug, SubServicesSlug } =
    getSlugsForListings(pathname);

  const router = useRouter();

  const [mainServices, setMainServices] = useState<ICategoryLocal[]>([]);
  // const [subServices, setSubServices] = useState<ICategoryLocal[]>([]);
  const [selectedMain, setSelectedMain] = useState(ServicesSlug);
  const [selectedCategory, setSelectedCategory] =
    useState<ICategoryLocal | null>(null);
  // const [selectedSub, setSelectedSub] = useState("");

  console.log("selectedMain:", selectedMain);

  const ___LoadTheMainServices = async () => {
    const response = await getApiData<{
      ok: boolean;
      categories: ICategoryLocal[];
    }>(
      "/listings/get-main-services",
      "GET",
      {},
      "not-authorize",
      "application/json",
    );

    console.log("Main services responsie:", response);

    if (response.ok) {
      setMainServices(response.categories);
      const find = response.categories.find((cat) => cat.slug === ServicesSlug);
      if (find) {
        setSelectedCategory(find);
      }
    }
  };

  useEffect(() => {
    ___LoadTheMainServices();
  }, []);
  useEffect(() => {
    if (selectedCategory) {
      onCategoryChange(selectedCategory);
    }
  }, [selectedCategory]);

  // Map the ICategoryLocal array to the format TextInput expects
  /*const mainServiceOptions = [
    { value: "", label: "All Services" },
    ...mainServices.map((cat) => ({
      value: cat.slug, // Using slug as the unique value
      // label: `(${cat.count}) ${cat.name}`,
      label: `${cat.name}`,
    })),
  ];*/

  return (
    <div className="flex flex-col gap-4">
      <div className="filter-list-radios">
        {mainServices.map((category, index: number) => {
          // console.log(`${category.slug} --- ${selectedMain} ${category.slug === selectedMain}`);

          return (
            <div
              className="form-check form-check-filter"
              key={`filter-list-radio-wrap-${index}`}
            >
              <input
                type="radio"
                name="filter-categories"
                id={`filter-categories-${category.term_id}`}
                className="form-check-input"
                checked={selectedMain === category.slug}
                value={category.slug}
                onChange={(e) => {
                  setSelectedMain(e.target.value);
                  setSelectedCategory(category);
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
                      slug2_category: category.slug,
                      slug3_sub_category: SLUG_DEFAULT_ALL_SUBCATEGORIES,
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
