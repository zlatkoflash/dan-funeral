import { IPageInterface } from "@/app/PagesInterfaces";
import { zsettings } from "@/settings/ZSettings";
import { getAccessToken } from "./apiServer";

/**
 * 
 * @param slug 
 * @returns Get api data from the server
 */
export const getApiData = async (
  slug: string,
  $method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data: any = {},
  authorize: "not-authorize" | "authorize" = "not-authorize"
) => {
  let rawData, json: IPageInterface;
  try {
    // example:
    // rawData = await fetch(zsettings.apiURL + "/get_page_data/home");
    const options: any = {
      method: $method,
      headers: {
        "Content-Type": "application/json",
      },
      // credentials: 'include',
      // body: JSON.stringify(data)
    }
    // 🛑 CRITICAL STEP: Add Authorization header if a token is passed
    if (authorize === "authorize") {
      const authToken = await getAccessToken();
      console.log("authToken:", authToken);
      options.headers['Authorization'] = `Bearer ${authToken}`;
    }
    if ($method === "POST") {
      options.body = JSON.stringify(data);
    }
    console.log("options for the route:", options);
    rawData = await fetch(zsettings.apiURL + slug, options);
    json = await rawData.json();

    // console.log("Row json:", json);

    if (["jwt_missing", "jwt_expired", "jwt_invalid", "jwt_revoked", "jwt_user_not_found"].indexOf(json.code as string) !== -1) {
      return {
        ok: false,
        status: 401,
        message: "Unauthorized",
        errorJson401: json
      } as IPageInterface;
    }
    else if (json.status === 404) {
      return {
        ok: false,
        status: 404,
        message: "API route Not found",
      } as IPageInterface;
    }
    else if (json.status === 500) {
      return {
        ok: false,
        status: 500,
        message: "API route Internal server error",
      } as IPageInterface;
    }

    return json;
  }
  catch (error) {
    console.log("Next.js internal 501 error:", error);
    return {
      ok: false,
      status: 501,
      message: "Next.js internal error",
      error: error,
    } as IPageInterface;
  }
}