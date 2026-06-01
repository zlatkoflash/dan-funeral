"use client";

import { v4 as uuidv4 } from "uuid";

/**
 * Gets the current device ID. If it is null, it generates a
 * fresh one, stores it permanently, and returns it.
 */
export function getValidDeviceId(): string {
  // Guard for Next.js Server-Side Rendering (SSR) context
  if (typeof window === "undefined") return "";

  // 1. Try to get it from storage
  let deviceId = localStorage.getItem("app_device_id");

  // 2. If it is null, generate it right now!
  if (!deviceId) {
    deviceId = uuidv4(); // Generates a unique string like: "d3b07384-d113-4956-a5dc-725354b0d362"
    localStorage.setItem("app_device_id", deviceId);
    console.log("Fresh device ID generated and stored:", deviceId);
  }

  return deviceId;
}
