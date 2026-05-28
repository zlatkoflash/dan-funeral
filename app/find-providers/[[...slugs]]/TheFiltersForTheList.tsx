"use client";

import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
} from "react-bootstrap";
import FilterPriceRange from "./Filters/FilterPriceRange";
import FilterServices, { ICategoryLocal } from "./Filters/FilterServices";
import FilterAvailability from "./Filters/FilterAvilability";
import FilterDistanceYelp from "./Filters/FilterDistanceYelp";
import FilterSubServices from "./Filters/FilterSubServices";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ICategory } from "@/components/directoriesgrid/HomeDirectory";
import { getApiData } from "@/utils/api";
import FilterLanguage from "./Filters/FilterLanguage";
import icon_filters from "@/assets/images/icon-filters.svg";

const STORAGE_KEY = "last-opened-filter-tab";

export default function TheFiltersForTheList() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const ServiceSlug = segments[2];

  // const [selectedCategoryTitle, setSelectedCategoryTitle] = useState("");
  // Start with null to prevent hydration mismatch between Server and Client
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<ICategoryLocal | null>(null);

  const router = useRouter();
  // 1. Load preference from LocalStorage on Mount
  useEffect(() => {
    const savedKey = localStorage.getItem(STORAGE_KEY);
    // If no saved key, default to "services"
    setActiveKey(savedKey || "services");
  }, []);

  // 2. Fetch Category logic
  /*const ____LoadTheCategory = async () => {
    if (!ServiceSlug) return;
    const response = await getApiData<{ ok: boolean; category: ICategory }>(
      `/listings/get-category-by-slug`,
      "POST",
      { slug: ServiceSlug },
      "not-authorize",
      "application/json"
    );
    if (response.ok) {
      setSelectedCategoryTitle(response.category.name);
    }
  };

  useEffect(() => {
    ____LoadTheCategory();
  }, [ServiceSlug]);*/

  // 3. Handle Tab Change
  const handleToggle = (key: any) => {
    if (key) {
      setActiveKey(key);
      localStorage.setItem(STORAGE_KEY, key);
    }
  };

  const ___ResetTheFilters = () => {
    // router.push(`/find-providers`);
    window.history.pushState(null, "", "/find-providers");
  };

  // Don't render the Accordion until we know the activeKey from localStorage
  // This prevents the "flash" of the wrong tab opening
  if (activeKey === null) return null;

  return (
    <div className="the-filters-panel version-2">
      <div className="heading">
        <img src={icon_filters.src} alt="filters-icon" />
        <h4>Filters</h4>
      </div>

      <Accordion alwaysOpen activeKey={activeKey} onSelect={handleToggle}>
        {/*Price logic not defined yet
          <AccordionItem eventKey="price-range">
          <AccordionHeader>Price Range</AccordionHeader>
          <AccordionBody>
            <FilterPriceRange />
          </AccordionBody>
        </AccordionItem>
          */}

        <AccordionItem eventKey="services">
          <AccordionHeader>Services</AccordionHeader>
          <AccordionBody>
            <FilterServices
              onCategoryChange={(category: ICategoryLocal | null) => {
                // alert(12);
                console.log("category:", category);
                setSelectedCategory(category);
              }}
            />
          </AccordionBody>
        </AccordionItem>

        {selectedCategory !== null && selectedCategory.children.length > 0 && (
          <AccordionItem eventKey="sub-services">
            <AccordionHeader>{selectedCategory.name}</AccordionHeader>
            <AccordionBody>
              <FilterSubServices />
            </AccordionBody>
          </AccordionItem>
        )}

        {
          /*
          We need map on the left*/
          <AccordionItem eventKey="distance">
            <AccordionHeader>Distance</AccordionHeader>
            <AccordionBody>
              <FilterDistanceYelp />
            </AccordionBody>
          </AccordionItem>
        }

        {/*
          <AccordionItem eventKey="availability">
          <AccordionHeader>Availability</AccordionHeader>
          <AccordionBody>
            <FilterAvailability />
          </AccordionBody>
        </AccordionItem>
          */}
        <AccordionItem eventKey="price-range">
          <AccordionHeader>Price Range</AccordionHeader>
          <AccordionBody>
            <FilterPriceRange />
          </AccordionBody>
        </AccordionItem>

        <AccordionItem eventKey="preferred-language">
          <AccordionHeader>Preffered Language</AccordionHeader>
          <AccordionBody>
            <FilterLanguage />
          </AccordionBody>
        </AccordionItem>

        {/*
          If client ask
          <AccordionItem eventKey="language">
            <AccordionHeader>Preffered Language</AccordionHeader>
            <AccordionBody>
              <FilterLanguage />
            </AccordionBody>
          </AccordionItem>*/}
      </Accordion>

      <div className="buttons-footer">
        <Button
          variant="dark"
          type="button"
          className="w-100"
          onClick={() => {
            ___ResetTheFilters();
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
