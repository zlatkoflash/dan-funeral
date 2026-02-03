import { ChangeEvent } from "react";
// import { getAccessToken } from "./apiServer";
// import { zsettings } from "@/settings/ZSettings";
import { getApiData } from "./api";

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const CheckFileSize = (file: File) => {
  if (file.size > MAX_FILE_SIZE) {
    return false;
  }
  return true;
}

/**
 * Core function to handle file packaging and server upload, including extra data.
 *
 * @param {Event} event The change event from the file input element.
 * @param {string} uploadUrl The server endpoint to send the file to (e.g., '/api/upload/profile').
 * @param {string} fileFieldName The name of the form field the server expects for the file (e.g., 'imageFile').
 * @param {object} additionalDetails An object containing key-value pairs of extra data (e.g., { userId: 123, title: "New Photo" }).
 * @returns {Promise<object | null>} A promise that resolves to the server's response JSON on success, or null on failure.
 */
export const MyFileUploading = async (event: ChangeEvent<HTMLInputElement>, routePath: string, fileFieldName: string = 'file', additionalDetails: any = {}) => {
  // 1. Get the file object from the event
  const file = event.target.files?.[0];
  if (!file) {
    console.warn("MyFileUploading: No file selected.");
    return null;
  }

  // 2. Prepare the data using FormData
  const formData = new FormData();

  // Append the actual file
  formData.append(fileFieldName, file);

  // ⭐️ NEW: Loop through the additional details object and append each piece of data
  for (const key in additionalDetails) {
    if (Object.prototype.hasOwnProperty.call(additionalDetails, key)) {
      // Converts non-string values (like numbers or booleans) to strings for FormData
      const value = typeof additionalDetails[key] !== 'string'
        ? String(additionalDetails[key])
        : additionalDetails[key];

      formData.append(key, value);
    }
  }

  // const phpPathRouteFOrUpload = zsettings.apiURL + routePath;
  // console.log("phpPathRouteFOrUpload:", phpPathRouteFOrUpload);


  /*const testRoute = '/test';
  const response2 = await getApiData(testRoute, 'GET');
  console.log("response2:", response2, testRoute);
  return;*/


  try {
    // const token = await getAccessToken();
    // 3. Send the POST request
    /*const response = await fetch(phpPathRouteFOrUpload, {
      method: 'POST',
      body: formData,
      // You can add your Authorization header here if needed
      headers: { 'Authorization': `Bearer ${token}` }
    });*/

    const response = await getApiData<{ file: { url: string }, ok: boolean, status: number, message: string }>(routePath, 'POST', formData, 'authorize', "multipart/form-data");

    // 4. Handle the server response
    if (response.ok) {
      // const result = await response.json();
      // console.log(`File and details uploaded successfully to ${phpPathRouteFOrUpload}:`, response);
      return response;
    } else {
      // const errorText = await response.text();
      console.error(`Upload failed to ${routePath} (Status: ${response.status}):`, response.message);
      return null;
    }
  } catch (error) {
    console.error('Network or system error during upload:', error);
    return null;
  }
};



export const UploadFile = async (file: File, folder: string) => {
  console.log("Uploading file init...");
  const formData = new FormData();
  formData.append('file', file);
  formData.append('directory', folder);
  console.log(formData);
  const response = await getApiData<{ url: string, status: boolean, message: string }>('/files/upload', 'POST', formData, 'authorize', "multipart/form-data");

  return response;
}