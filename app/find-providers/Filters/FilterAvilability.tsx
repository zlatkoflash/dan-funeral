"use client"

import TextInput from "@/components/forms/Input";


export default function FilterAvailability() {
  return <>
    <TextInput
      id="availability"
      type="select"
      value=""
      onChange={(e: any) => { }}
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