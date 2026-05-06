import { ILocationItemSelected } from "@/components/forms/InputSearchDropdownAddressesDV2";
import { IWPPost } from "./interfaceWP";

export interface IListingV2 {
  post: IWPPost
}

export interface IListing_IdentityAndNarative {
  business_name: string;
  about_us: string;
  year_business_founded: string;
  // from data it come as string "English,Macedonian,Hebrew"
  languages_spoken: string;
  phone_number: string;
  website: string;
}


export interface IListing_ServicesAreasAndCategories {
  categories_and_subcategories: number[];
  locations: ILocationItemSelected[];
}