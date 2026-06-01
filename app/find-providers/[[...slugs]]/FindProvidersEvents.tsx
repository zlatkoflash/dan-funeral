"use client";

import { useEffect } from "react";
import { getApiData } from "@/utils/api";
import { getValidDeviceId } from "@/utils/device";

export default function FindProvidersEvents() {
  useEffect(() => {
    getApiData(
      "/listings/count-listings-search-appearance",
      "POST",
      { device_id: getValidDeviceId() },
      "not-authorize",
      "application/json",
    );

    console.log("FindProvidersEvents: device_id", getValidDeviceId());
  }, []);

  return <></>;
}
