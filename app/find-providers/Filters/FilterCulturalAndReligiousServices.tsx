"use client"

import TextInput from "@/components/forms/Input";


export default function FilterCulturalAndReligiousServices() {
  return <>
    <TextInput
      id="services"
      type="select"
      value=""
      onChange={(e: any) => { }}
      options={[
        {
          value: "",
          label: "All"
        },
        {
          value: "service",
          label: "Service Temp 1"
        }
      ]}
    />
  </>;
}