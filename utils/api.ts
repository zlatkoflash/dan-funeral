/**
 * This is server too
 */
"use server"

import { IPageInterface } from "@/app/PagesInterfaces";
import { zsettings } from "@/settings/ZSettings";
import { getAccessToken } from "./apiServer";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

/**
 * 
 * @param slug 
 * @returns Get api data from the server
 */
export const getApiData = async <T = IPageInterface>(
  slug: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data: any = {},
  authorize: "not-authorize" | "authorize" = "not-authorize",
  contentType: "application/json" | "multipart/form-data" = "application/json"
): Promise<T> => {
  let rawData, json: any;



  // console.log(process.env.WP_APP_PASSWORD);

  const routeURL = zsettings.apiURL + slug;
  let jsonForFeedback = null;

  try {
    // example:
    // rawData = await fetch(zsettings.apiURL + "/get_page_data/home");

    const username = process.env.WP_API_USER; // e.g., "admin"
    const appPassword = process.env.WP_APP_PASSWORD; // e.g., "abcd efgh..."
    // const appPassword = "abcd efgh...";
    // 1. Combine and Encode to Base64
    const credentials = `${username}:${appPassword}`;
    const base64Credentials = Buffer.from(credentials).toString('base64');

    const options: any = {
      method: method,
      headers: {
        // this auth is for the REST-API, the REST-API must be accesible only from next.js
        "Authorization": `Basic ${base64Credentials}`
      },
      // credentials: 'include',
      // body: JSON.stringify(data)
    }
    // 🛑 CRITICAL STEP: Add Authorization header if a token is passed
    if (authorize === "authorize") {
      const authToken = await getAccessToken();
      console.log("authToken:", authToken);
      // Authorization is reserved for api wp password
      // options.headers['Authorization'] = `Bearer ${authToken}`;
      options.headers['X-User-Token'] = `User-Token-Authorization ${authToken}`;
    }
    if (method === "POST") {
      if (contentType === "application/json") {
        options.headers['Content-Type'] = "application/json";
        options.body = JSON.stringify(data);
      } else {
        // options.headers['Content-Type'] = "multipart/form-data";
        options.body = data;
      }
    }
    /*console.log("options for the route:", options);
    console.log("routeURL:", routeURL);
    console.log(zsettings.apiURL, slug);*/
    rawData = await fetch(routeURL, options);

    // const text = await rawData.text();console.log("text:", text); //debugging

    try {
      json = await rawData.json();
    }
    catch (error) {
      console.log("error:", error);
      json = {
        ok: false,
        status: 500,
        message: "API route Internal server error 2",
        errorJson500: error
      };
    }

    // console.log("Row json:", json);

    if (["jwt_missing", "jwt_expired", "jwt_invalid", "jwt_revoked", "jwt_user_not_found"].indexOf(json.code as string) !== -1) {

      // redirect('/Dashboard/Login?redirect=');

      /*return {
        ok: false,
        status: 401,
        message: "Unauthorized",
        errorJson401: json
      } as T;*/
      jsonForFeedback = {
        ok: false,
        status: 401,
        message: "Unauthorized",
        errorJson401: json
      };
    }
    else if (json.status === 404) {
      /*return {
        ok: false,
        status: 404,
        message: "API route Not found",
      } as T;*/
      jsonForFeedback = {
        ok: false,
        status: 404,
        message: "API route Not found",
      };
    }
    else if (json.status === 500) {
      /*return {
        ok: false,
        status: 500,
        message: "API route Internal server error",
        errorJson500: json
      } as T;*/
      jsonForFeedback = {
        ok: false,
        status: 500,
        message: "API route Internal server error",
        errorJson500: json
      };
    }
    else {
      // we are okay and return json
      return json;
    }

  }
  catch (error) {
    console.log("Next.js internal 501 error:", error);
    return {
      ok: false,
      status: 501,
      message: "Next.js internal error",
      error: error,
      routeURL: routeURL
    } as T;
  }

  if (jsonForFeedback !== null && jsonForFeedback.status === 401) {

    const headerList = await headers();
    const currentPath = headerList.get("referer") || "";

    const the_link = '/Dashboard/Login?redirect=' + encodeURIComponent(currentPath);
    console.log("The link:", the_link);

    // redirect(the_link);
  }

  return jsonForFeedback as T;
}


