import { IUserSocialLink } from "@/ContextProvider/AuthProviderWrap";
import { getApiData } from "./api";

export const UpdateWPUserMetas = async (values: { var: string, val: string }[]) => {
  const response = await getApiData("/user/UpdateWPUserMetas", "POST", {
    values: values
  }, "authorize");
  return response;
}


export const GetSocialLinksFromJSONString = (jsonString: string): IUserSocialLink[] => {
  try {
    // 1. If string is empty or null, return empty array immediately
    if (!jsonString) return [];

    const decoded = JSON.parse(jsonString);

    // 2. Check if the result is actually an array
    if (Array.isArray(decoded)) {
      return decoded as IUserSocialLink[];
    }

    // 3. If it's valid JSON but not an array (e.g. an object or number), return empty
    return [];
  } catch (error) {
    // 4. If JSON is malformed, catch the error and return empty array
    console.error("Failed to parse social links:", error);
    return [];
  }
}

export const SendVerifyTheEmailAddress = async () => {
  const response = await getApiData('/user/SendVerifyTheEmailAddress', 'POST', {
  }, "authorize");
  return response;
}



export const getIP = async () => {


  /**
   * We need absolute path because we are calling this from the server side and also from client side
   */
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const response = await fetch(`${baseUrl}/api/system/get-ip`);
  const data = await response.json();
  console.log('Client IP:', data.ip, data);
  return data.ip;
}

