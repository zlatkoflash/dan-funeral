import { cookies } from "next/headers";

/**
 * The cookie for this is generated in the middleware.ts file
 * @returns 
 */
export async function getValidDeviceId(): Promise<string> {
  const COOKIE_NAME = 'app_device_id';
  const cookieStore = await cookies();

  // 1. Try to get it from the cookies (set by middleware)
  let deviceId = cookieStore.get(COOKIE_NAME)?.value;

  // 2. Fallback if cookie isn't present yet
  if (!deviceId) {
    deviceId = crypto.randomUUID();
  }

  return deviceId;
}