import { cookies } from "next/headers";

/**
 * The cookie for this is generated in the middleware.ts file
 * @returns 
 */
export async function getOrCreateTimedSeedFromCookie() {
  const STORAGE_KEY = 'seed_data';
  const cookieStore = await cookies();
  const stored = cookieStore.get(STORAGE_KEY);

  if (stored) {
    try {
      const { seed, timestamp } = JSON.parse(stored.value);
      const now = Date.now();

      if (now - timestamp < 24 * 60 * 60 * 1000) {
        // Seed is less than 24 hours old
        return seed;
      }
    } catch (e) {
      // Invalid JSON fallback
    }
  }

  // Fallback value if middleware hasn't run yet for some edge case
  return Math.round(Math.random() * 10000);
}