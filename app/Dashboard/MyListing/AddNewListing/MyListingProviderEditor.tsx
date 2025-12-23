"use client";

import { FAQItem } from '@/components/grids/FAQsEditor';
import { TeamMember } from '@/components/grids/TeamManager';
import { DAYS_OF_WEEK, DaySchedule, DEFAULT_DAY_SCHEDULE } from '@/components/grids/WeeklyScheduler';
import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';


export interface IListing {
  about: {
    title: string,
    description: string,
    // error?: boolean
  },
  category: {
    term_id: number;
    // error?: boolean
  },
  location: {
    location: string,
    listing_address: string,
    listing_pincode_zipcode: string,
    map_address: string,
    map_lat: number,
    map_lng: number,
    map_zoom: number
  },
  media: {
    featured_image: {
      file: File | null,
      preview: string,
      isNew?: boolean,
      id?: string
    },
    gallery: {
      // file: File | null,
      preview: string,
      // isNew?: boolean,
      // id?: string
    }[]
  },

  pricing: {
    id: string,
    description: string,
    price: number,

  }[],

  businessHours: DaySchedule[],

  video: {
    url: string,
    thumbnail?: string
  },

  team_members: TeamMember[],

  faqs: FAQItem[],

  vendor: {
    id: string
  }
}

export interface IWPCategory {
  term_id: number;
  name: string;
  slug: string;
  term_group: number;
  term_taxonomy_id: number;
  taxonomy: "category" | string;
  description: string;
  parent: number;
  count: number;
  filter: "raw" | string;
}
export interface IWPListingPost {
  ID: number;
  post_author: string;
  post_date: string;
  post_date_gmt: string;
  post_content: string;
  post_title: string;
  post_excerpt: string;
  post_status: string;
  comment_status: string;
  ping_status: string;
  post_password: string;
  post_name: string;
  to_ping: string;
  pinged: string;
  post_modified: string;
  post_modified_gmt: string;
  post_content_filtered: string;
  post_parent: number;
  guid: string;
  menu_order: number;
  post_type: string;
  post_mime_type: string;
  comment_count: number;
  filter: string;
}
export interface IListingSettings {
  categories: IWPCategory[];
  listings?: IWPListingPost[];
}

// Define the shape of our context
interface MyListingContextType {

  actualListingId: string | undefined;

  activeMyListingSlug: string;
  setActiveMyListingSlug: (slug: string) => void;

  validation: {
    aboutHasErrors: boolean;
    categoryHasErrors: boolean;
    locationHasErrors: boolean;
    mediaHasErrors: boolean;
    pricingHasErrors: boolean;
    // businessHoursHasErrors: boolean;
    // videoHasErrors: boolean;
    teamMembersHasErrors: boolean;
    faqsHasErrors: boolean;
    vendorHasErrors: boolean;
  },
  hasErrors: boolean;



  /// those below should be deleted
  /*location_map_lat: number;
  location_map_lng: number;
  location_map_address: string;

  setLocationMapLat: (lat: number) => void;
  setLocationMapLng: (lng: number) => void;
  setLocationMapAddress: (address: string) => void;*/
  /// those above should be deleted

  /**
   * I will use listing for saving the data to the server
  */
  listing: IListing;
  setListing: (listing: IListing) => void;

  /**
   * They willcome from the server
   */
  listingSettings?: IListingSettings;
}

// 1. Create the Context
const MyListingContext = createContext<MyListingContextType | undefined>(undefined);

const DEFAULT_LISTING: IListing = {
  about: {
    title: "",
    description: "",
  },
  category: {
    term_id: 0
  },
  location: {
    location: "",
    listing_address: "",
    listing_pincode_zipcode: "",
    map_address: "",
    map_lat: 39.95185892663005,
    map_lng: -75.13000488281251,
    map_zoom: 0
  },
  media: {
    featured_image: {
      file: null,
      preview: ""
    },
    gallery: []
  },
  pricing: [],

  businessHours: DAYS_OF_WEEK.map(day => ({ ...DEFAULT_DAY_SCHEDULE, day })),

  video: {
    url: "",
    thumbnail: ""
  },

  team_members: [],

  faqs: [],

  vendor: {
    id: ""
  }
};

// 2. Create the Provider Component
export function MyListingProviderEditor({
  children,
  listingSettings,
  actualListingId,
  listingInit
}: {
  children: ReactNode,
  listingSettings?: IListingSettings,
  actualListingId?: string,
  listingInit?: IListing | undefined
}) {
  const [activeMyListingSlug, setActiveMyListingSlug] = useState<string>("");

  /*const [location_map_lat, setLocationMapLat] = useState<number>(0);
  const [location_map_lng, setLocationMapLng] = useState<number>(0);
  const [location_map_address, setLocationMapAddress] = useState<string>("");*/

  const [listing, setListing] = useState<IListing>(listingInit || DEFAULT_LISTING);

  const validation = useMemo(() => {
    return {
      aboutHasErrors: !listing.about.title,
      categoryHasErrors: listing.category.term_id === 0,
      locationHasErrors: listing.location.map_address === "" || listing.location.listing_address === "" || listing.location.listing_pincode_zipcode === "" || listing.location.location === "",
      mediaHasErrors: listing.media.gallery.length === 0 || listing.media.featured_image.preview === "",
      pricingHasErrors: listing.pricing.length === 0,
      // businessHoursHasErrors: listing.businessHours.some(day => day.open_time === "" || day.close_time === ""),
      // videoHasErrors: listing.video.url === "",
      teamMembersHasErrors: listing.team_members.length === 0,
      faqsHasErrors: listing.faqs.length === 0,
      vendorHasErrors: listing.vendor.id === "" || listing.vendor.id === (0).toString()
    };
  }, [listing]);
  const hasErrors = useMemo(() => Object.values(validation).some((error) => error === true), [validation]);
  // const hasErrors = false;


  return (
    <MyListingContext.Provider value={{

      /**
       * when we have listing opened then we will use this: actualListingId and actualListingId will have value
       */
      actualListingId,

      activeMyListingSlug,
      setActiveMyListingSlug,

      validation,
      hasErrors,

      /*location_map_lat,
      location_map_lng,
      location_map_address,
      setLocationMapLat,
      setLocationMapLng,
      setLocationMapAddress,*/

      listing,
      setListing,

      listingSettings,
    }}>
      {children}
    </MyListingContext.Provider>
  );
}

// 3. Create a custom hook for easy access
export function useMyListing() {
  const context = useContext(MyListingContext);
  if (context === undefined) {
    throw new Error('useMyListing must be used within a MyListingProvider');
  }
  return context;
}