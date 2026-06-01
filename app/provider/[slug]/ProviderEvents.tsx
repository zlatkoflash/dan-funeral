"use client";

import { getApiData } from "@/utils/api";
import { getValidDeviceId } from "@/utils/device";
import { useEffect } from "react";

export default function ProviderEvents({ listing_id }: { listing_id: string }) {
  useEffect(() => {
    getApiData(
      "/listings/count-listing-view",
      "POST",
      { listing_id: listing_id, device_id: getValidDeviceId() },
      "not-authorize",
      "application/json",
    );

    console.log("ProviderEvents: listing_id", listing_id);
  }, []);

  return <></>;
}
