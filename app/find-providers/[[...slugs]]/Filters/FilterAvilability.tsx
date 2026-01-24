"use client"

import TextInput from "@/components/forms/Input";
import { executeSearchFiltersRedirect } from "@/utils/listing";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function FilterAvailability() {

  const router = useRouter();

  const [availability, setAvailability] = useState<string>("");

  return <>
    <TextInput
      id="availability"
      type="select"
      value={availability}
      onChange={(e: any) => {
        setAvailability(e.target.value);
        // return;
        executeSearchFiltersRedirect({
          paramsArray: [
            { paramName: 'availability', paramValue: e.target.value },
          ],
          router: router,
          currentParams: new URLSearchParams(window.location.search),
          pageIndex: 1
        });
      }}
      options={[
        {
          value: "",
          label: "All"
        },
        {
          value: "available",
          label: "Available"
        },
        {
          value: "not-available",
          label: "Not Available"
        }
      ]}
    />
  </>;
}