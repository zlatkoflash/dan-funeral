"use client"

import TextInput from "@/components/forms/Input";
import { getApiData } from "@/utils/api";
import { executeSearchFiltersRedirect, getSlugsForListings } from "@/utils/listing";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ICategoryLocal {
  term_id: number;
  slug: string;
  name: string;
  count: number;
}

export default function FilterSubServices() {


  const pathname = usePathname(); // e.g., "/services/marketing/seo"

  // Split by "/" and filter out empty strings
  /*const segments = pathname.split('/').filter(Boolean);

  // Access the 3rd segment (index 2)
  const ServicesSlug = segments[2];
  const SubServicesSlug = segments[3];*/

  const { CitySlug, ServicesSlug, SubServicesSlug } = getSlugsForListings(pathname);


  const router = useRouter();

  // const [mainServices, setMainServices] = useState<ICategoryLocal[]>([]);
  const [subServices, setSubServices] = useState<ICategoryLocal[]>([]);
  // const [selectedMain, setSelectedMain] = useState(ServicesSlug);
  const [selectedSub, setSelectedSub] = useState(SubServicesSlug);



  /*const ___LoadTheMainServices = async () => {


    const response = await getApiData<{
      ok: boolean;
      categories: ICategoryLocal[];
    }>("/listings/get-main-services", "GET", {}, "not-authorize", "application/json");

    console.log("Main services responsie:", response);

    if (response.ok) {
      setMainServices(response.categories);
    }
  };*/

  const ___LoadTheSubServices = async () => {
    const dataForSubServices = await getApiData<{
      ok: boolean;
      categories: ICategoryLocal[];
    }>('/listings/get-sub-services', 'POST', {
      main_service_slug: ServicesSlug
    }, 'not-authorize', 'application/json');
    console.log("dataForSubServices:", dataForSubServices);
    if (dataForSubServices.ok && dataForSubServices.categories !== undefined) {
      setSubServices(dataForSubServices.categories);
    }
    else {
      setSubServices([]);
      console.log("Error loading sub services");
    }
    /*if (response.ok) {
      setSubServices(response.categories);
    }*/
  };

  useEffect(() => {
    ___LoadTheSubServices();
  }, []);

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
      {/* Main Services Dropdown */}
      {
        /*<TextInput
        id="main-services"
        type="select"
        value={selectedMain}
        onChange={(e: any) => {
          setSelectedMain(e.target.value);
          // alert("changing the main service");
          ___LoadTheSubServices(e.target.value as string);
          executeSearchFiltersRedirect(
            {
              pageIndex: 1,
              paramsArray: [
                {
                  paramName: "expanded-services",
                  paramValue: "true"
                }
              ],
              router: router,
              slugsForChange: {
                // slug1_city: "",
                slug2_category: e.target.value,
                // slug3_sub_category: "",
                // slug4_sub_service: ""
              }
            }
          )
        }}
        options={mainServiceOptions}
      />*/
      }

      {/* Sub-Services Dropdown (Placeholder for now) */}
      <TextInput
        id="sub-services"
        type="select"
        value={selectedSub}
        // disabled={selectedMain === ""}
        onChange={(e: any) => {
          setSelectedSub(e.target.value)
          executeSearchFiltersRedirect(
            {
              pageIndex: 1,
              paramsArray: [
                {
                  paramName: "expanded-services",
                  paramValue: "true"
                }
              ],
              router: router,
              slugsForChange: {
                // slug1_city: "",
                // slug2_category: selectedMain,
                slug3_sub_category: e.target.value === "" ? "all-subcategories" : e.target.value,
                // slug4_sub_service: ""
              }
            }
          )
        }}
        options={subServiceOptions}
      />
    </div>
  );
}