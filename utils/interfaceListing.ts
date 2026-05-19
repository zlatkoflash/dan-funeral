import { ILocationItemSelected } from "@/components/forms/InputSearchDropdownAddressesDV2";
import { IWPPost } from "./interfaceWP";

export interface IListingV2 {
  post: IWPPost,
  basic: {
    data: {
      identity_and_narrative: {
        about_us: string
      }
    }
  }
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



export interface IRankData {
  id?: number;
  type?: 'category' | 'location' | string;

  /** 
   * Stored as TEXT in DB. Usually a JSON string containing lat/lng or address components.
   * Parse this as a specific object in your logic.
   */
  location_data?: string | null;

  service_id?: number | null;

  /** Stripe Subscription Status (active, past_due, canceled, etc.) */
  subscribtion_status?: 'item-card' | 'removed-from-card' | 'active' | 'past_due' | 'unpaid' | 'canceled' | 'incomplete' | 'removed-from-php-server' | string | null;

  /** Stripe Subscription ID (sub_...) */
  subscribtion_id?: string | null;
  subscribtion_item_id?: string | null;

  /** Stripe Product ID (prod_...) */
  stripe_product_id?: string | null;

  /** Stripe Price ID (price_...) */
  stripe_product_price_id?: string | null;

  listing_id?: number;
  user_id?: number | null;

  title?: string,
  description?: string,

  rank_position?: number;

  amount?: number;
  current_period_start?: number;
  current_period_end?: number;



}