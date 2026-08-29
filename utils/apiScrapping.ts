import { zsettings } from "@/settings/ZSettings";

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiCallOptions {
  method?: HttpMethod;
  body?: any;
  headers?: Record<string, string>;
  timeoutMs?: number;
}

/**
 * 
 * @param path must be like /slug/slug
 * @param options 
 * @returns 
 */
export async function apiCallScrapping<T = any>(
  path: string,
  options: ApiCallOptions = {}
): Promise<T> {
  const baseUrl = zsettings.scraping.server;

  // Cleanly combine base URL and path
  const cleanBase = baseUrl.replace(/\/$/, '');
  const cleanPath = path.replace(/^\//, '');
  const url = `${cleanBase}/${cleanPath}`;

  const method = options.method || (options.body ? 'POST' : 'GET');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const controller = new AbortController();
  const timeout = options.timeoutMs || 1000 * 10 * 60 * 60;
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const fetchOptions: RequestInit = {
      method,
      headers,
      signal: controller.signal,
    };

    if (options.body && method !== 'GET') {
      fetchOptions.body = JSON.stringify(options.body);
    }

    const response = await fetch(url, fetchOptions);
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorBody}`);
    }

    return (await response.json()) as T;
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error(`Request to ${url} timed out after ${timeout}ms`);
    }
    throw new Error(`API call failed: ${error.message}`);
  }
}