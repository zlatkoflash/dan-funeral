"use client"

import TextInput from "@/components/forms/Input";


export default function FilterServices() {
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