"use state"

import { IE13Language } from "@/app/Dashboard/MyListing/content/ListingEditor/content/LE13Languages";
import TextInput from "@/components/forms/Input";
import { getApiData } from "@/utils/api";
import { executeSearchFiltersRedirect } from "@/utils/listing";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function FilterLanguage() {

  const router = useRouter();

  const [languages, setLanguages] = useState<IE13Language[]>([]);
  const [languagesOptions, setLanguagesOptions] = useState<{ value: string; label: string }[]>([]);
  const [selectedLanguageId, setSelectedLanguageId] = useState("");

  const getLanguages = async () => {
    const languages = await getApiData<{ languages: IE13Language[] }>('/listings/get-all-languages', 'GET');
    // languages.languages[0].
    setLanguages(languages.languages);
    setLanguagesOptions(languages.languages.map((language: IE13Language) => ({
      value: language.id.toString(),
      label: language.name,
    })));
  };
  useEffect(() => {


    getLanguages();

  }, []);

  return <>

    <div className="flex flex-col gap-4">
      {/* Main Services Dropdown */}
      <TextInput
        id="main-services"
        type="select"
        value={selectedLanguageId}
        onChange={(e: any) => {
          setSelectedLanguageId(e.target.value);
          // alert("changing the main service");
          // ___LoadTheSubServices(e.target.value as string);
          executeSearchFiltersRedirect(
            {
              pageIndex: 1,
              paramsArray: [
                {
                  paramName: "languageId",
                  paramValue: e.target.value
                },
                {
                  paramName: "language",
                  paramValue: e.target.options[e.target.selectedIndex].text
                }
              ],
              router: router,
            }
          )
        }}
        options={languagesOptions}
      />



    </div>

  </>
}