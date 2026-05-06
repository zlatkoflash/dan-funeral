import { IPageInterface } from "@/app/PagesInterfaces";
import { zsettings } from "@/settings/ZSettings";

/**
 * Client-side API caller
 * Note: Sensitive WP_APP_PASSWORD should NOT be used here.
 * We rely on the User Token (JWT) for client-side authorization.
 */
export const getApiDataClient = async <T = IPageInterface>(
  slug: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data: any = {},
  authorize: "not-authorize" | "authorize" = "not-authorize",
  contentType: "application/json" | "multipart/form-data" = "application/json",
  userToken?: string // Pass the token from your Auth Context
): Promise<T> => {
  const routeURL = zsettings.apiURL + slug;
  let json: any;

  try {
    const options: RequestInit = {
      method: method,
      headers: {} as Record<string, string>,
    };

    // 1. Setup Headers based on Auth
    if (authorize === "authorize" && userToken) {
      // Use the token passed from your React state/context
      (options.headers as Record<string, string>)['X-User-Token'] = `User-Token-Authorization ${userToken}`;
    }

    // 2. Handle Body and Content-Type
    if (method !== "GET") {
      if (contentType === "application/json") {
        (options.headers as Record<string, string>)['Content-Type'] = "application/json";
        options.body = JSON.stringify(data);
      } else {
        // IMPORTANT: For multipart/form-data (files), 
        // we MUST NOT set the Content-Type header. 
        // The browser will automatically set it with the correct boundary.
        options.body = data;
      }
    }

    const response = await fetch(routeURL, options);

    // Try to parse JSON
    try {
      json = await response.json();
    } catch (err) {
      return {
        ok: false,
        status: 500,
        message: "Failed to parse JSON response",
        error: err
      } as T;
    }

    // 3. Handle specific WP/JWT error codes
    if (["jwt_missing", "jwt_expired", "jwt_invalid", "jwt_revoked", "jwt_user_not_found"].includes(json.code)) {
      // In client side, we can't 'redirect' inside a function easily.
      // We return the error so the Component can handle the redirect.
      return {
        ok: false,
        status: 401,
        message: "Unauthorized",
        errorJson401: json
      } as T;
    }

    // Return the successful JSON or specific status errors
    return json;

  } catch (error) {
    console.error("Client API Error:", error);
    return {
      ok: false,
      status: 501,
      message: "Network or Client error",
      error: error,
      routeURL: routeURL
    } as T;
  }
};