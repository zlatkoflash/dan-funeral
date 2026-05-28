"use client";

import { FAQItem } from "@/components/grids/FAQsEditor";
import { TeamMember } from "@/components/grids/TeamManager";
import {
  DAYS_OF_WEEK,
  DaySchedule,
  DEFAULT_DAY_SCHEDULE,
} from "@/components/grids/WeeklyScheduler";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { ILE1AboutListing } from "../content/ListingEditor/content/LE1AboutListing";
import { ILE2ListingCategory } from "../content/ListingEditor/content/LE2ListingCategory";
import { ILE3ListingLocation } from "../content/ListingEditor/content/LE3ListingLocation";
import { IL43UploadImages } from "../content/ListingEditor/content/LE4UploadImages";
import { IL5Pricing } from "../content/ListingEditor/content/LE5Pricing";
import { ILE7ListingVideo } from "../content/ListingEditor/content/LE7ListingVideo";
import { ILE12PreferredVendor } from "../content/ListingEditor/content/LE12PreferredVendors";
import { useRouter } from "next/navigation";
import { ILE10ServiceOffering } from "../content/ListingEditor/content/LE10ServiceOffering";
import { IE13Language } from "../content/ListingEditor/content/LE13Languages";
import { AuthUser } from "@/ContextProvider/AuthProviderWrap";
import { IListingCompleteDetails } from "@/utils/interfaceListing";
import { IBusinessHour } from "@/app/DashboardV2/EditBusiness/components/editors/BusinessHoursEditor";

export interface IListing extends IListingCompleteDetails {
  // authorId?: number;

  id?: number;

  phone_number?: string;
  email_verified?: boolean;

  about: ILE1AboutListing;
  category: ILE2ListingCategory;
  location: ILE3ListingLocation;
  media: IL43UploadImages;

  pricing: IL5Pricing[];

  businessHours: DaySchedule[];
  businessHoursV2: IBusinessHour[];

  video: ILE7ListingVideo;

  team_members: TeamMember[];

  faqs: FAQItem[];

  vendor: ILE12PreferredVendor;

  serviceOffering: ILE10ServiceOffering[];

  languages: IE13Language[];

  owner: AuthUser;
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
  email_verified?: boolean;
  phone_number?: string;
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
    languagesHasErrors: boolean;
  };
  hasErrors: boolean;

  LE1About: ILE1AboutListing;
  setLE1About: (about: ILE1AboutListing) => void;

  LE2Category: ILE2ListingCategory;
  setLE2Category: (category: ILE2ListingCategory) => void;

  LE3Location: ILE3ListingLocation;
  setLE3Location: (location: ILE3ListingLocation) => void;

  LE4UploadImages: IL43UploadImages;
  setLE4UploadImages: (images: IL43UploadImages) => void;

  LE5Pricing: IL5Pricing[];
  setLE5Pricing: (pricing: IL5Pricing[]) => void;

  LE6BusinessHours: DaySchedule[];
  setLE6BusinessHours: (businessHours: DaySchedule[]) => void;

  LE7ListingVideo: ILE7ListingVideo;
  setLE7ListingVideo: (video: ILE7ListingVideo) => void;

  LE8MyTeam: TeamMember[];
  setLE8MyTeam: (teamMembers: TeamMember[]) => void;

  LE9FAQs: FAQItem[];
  setLE9FAQs: (faqs: FAQItem[]) => void;

  LE10ServiceOffering: ILE10ServiceOffering[];
  setLE10ServiceOffering: (serviceOffering: ILE10ServiceOffering[]) => void;

  LE12PreferredVendor: ILE12PreferredVendor;
  setLE12PreferredVendor: (preferredVendor: ILE12PreferredVendor) => void;

  LE13Languages: IE13Language[];
  setLE13Languages: (languages: IE13Language[]) => void;

  /**
   * I will use listing for saving the data to the server
   */
  listing: IListing;
  setListing: (listing: IListing) => void;

  /**
   * They willcome from the server
   */
  listingSettings?: IListingSettings;

  locationIndex: number;
  setLocationIndex: (index: number) => void;
}

// 1. Create the Context
const MyListingContext = createContext<MyListingContextType | undefined>(
  undefined,
);

const DEFAULT_LISTING: IListing = {
  about: {
    title: "",
    description: "",
    year_founded: "1950",
  },
  category: {
    term_id: 0,
  },
  location: {
    location: "",
    listing_address: "",
    listing_pincode_zipcode: "",
    map_address: "",
    map_lat: 39.95185892663005,
    map_lng: -75.13000488281251,
    map_zoom: 0,
    map_city: "",
    map_postcode: "",
  },
  media: {
    featured_image: {
      file: null,
      preview: "",
    },
    gallery: [],
  },
  pricing: [],

  businessHours: DAYS_OF_WEEK.map((day) => ({ ...DEFAULT_DAY_SCHEDULE, day })),
  businessHoursV2: [],

  video: {
    url: "",
    thumbnail: "",
  },

  team_members: [],

  faqs: [],

  serviceOffering: [],

  vendor: {
    id: "",
  },

  languages: [],

  owner: {} as AuthUser,

  frequent_asked_questions: [],
  identity_and_narrative: {
    business_name: "",
    about_us: "",
    year_business_founded: "1950",
    languages_spoken: "",
    phone_number: "",
    website: "",
    rating_count: 0,
    rating_value: 0,
  },
  media_gallery_photos: [],
  media_gallery_videos: [],
  other_services: [],
  services_areas_and_categories: {
    categories_and_subcategories: [],
    locations: [],
  },

  rating_count: 0,
  rating_value: 0,
};

// 2. Create the Provider Component
export function MyListingProviderEditor({
  children,
  listingSettings,
  actualListingId,
  listingInit,
}: {
  children: ReactNode;
  listingSettings?: IListingSettings;
  actualListingId?: string;
  listingInit?: IListing | undefined;
}) {
  const [activeMyListingSlug, setActiveMyListingSlug] = useState<string>("");

  /*const [location_map_lat, setLocationMapLat] = useState<number>(0);
  const [location_map_lng, setLocationMapLng] = useState<number>(0);
  const [location_map_address, setLocationMapAddress] = useState<string>("");*/

  const [listing, setListing] = useState<IListing>(
    listingInit || DEFAULT_LISTING,
  );

  const [LE1About, setLE1About] = useState<ILE1AboutListing>(
    listingInit !== undefined ? listingInit.about : DEFAULT_LISTING.about,
  );
  const [LE2Category, setLE2Category] = useState<ILE2ListingCategory>(
    listingInit !== undefined ? listingInit.category : DEFAULT_LISTING.category,
  );
  const [LE3Location, setLE3Location] = useState<ILE3ListingLocation>(
    listingInit !== undefined ? listingInit.location : DEFAULT_LISTING.location,
  );
  const [LE4UploadImages, setLE4UploadImages] = useState<IL43UploadImages>(
    listingInit !== undefined ? listingInit.media : DEFAULT_LISTING.media,
  );
  const [LE5Pricing, setLE5Pricing] = useState<IL5Pricing[]>(
    listingInit !== undefined ? listingInit.pricing : DEFAULT_LISTING.pricing,
  );
  const [LE6BusinessHours, setLE6BusinessHours] = useState<DaySchedule[]>(
    listingInit !== undefined
      ? listingInit.businessHours
      : DEFAULT_LISTING.businessHours,
  );
  const [LE7ListingVideo, setLE7ListingVideo] = useState<ILE7ListingVideo>(
    listingInit !== undefined ? listingInit.video : DEFAULT_LISTING.video,
  );
  const [LE8MyTeam, setLE8MyTeam] = useState<TeamMember[]>(
    listingInit !== undefined
      ? listingInit.team_members
      : DEFAULT_LISTING.team_members,
  );
  const [LE9FAQs, setLE9FAQs] = useState<FAQItem[]>(
    listingInit !== undefined ? listingInit.faqs : DEFAULT_LISTING.faqs,
  );
  const [LE12PreferredVendor, setLE12PreferredVendor] =
    useState<ILE12PreferredVendor>(
      listingInit !== undefined ? listingInit.vendor : DEFAULT_LISTING.vendor,
    );
  const [LE10ServiceOffering, setLE10ServiceOffering] = useState<
    ILE10ServiceOffering[]
  >(
    listingInit !== undefined
      ? listingInit.serviceOffering
      : DEFAULT_LISTING.serviceOffering,
  );
  const [LE13Languages, setLE13Languages] = useState<IE13Language[]>(
    listingInit !== undefined
      ? listingInit.languages
      : DEFAULT_LISTING.languages,
  );

  const [locationIndex, setLocationIndex] = useState(0);

  const validation = useMemo(() => {
    /**/
    // console.log("Validation is updating...");
    return {
      aboutHasErrors: !LE1About.title,
      categoryHasErrors: LE2Category.term_id === 0,
      locationHasErrors:
        LE3Location.map_address === "" ||
        LE3Location.listing_address === "" ||
        LE3Location.listing_pincode_zipcode === "" ||
        LE3Location.location === "",
      mediaHasErrors:
        LE4UploadImages.gallery.length === 0 ||
        LE4UploadImages.featured_image.preview === "",
      pricingHasErrors: LE5Pricing.length === 0,

      teamMembersHasErrors: LE8MyTeam.length === 0,
      faqsHasErrors: LE9FAQs.length === 0,
      vendorHasErrors:
        LE12PreferredVendor.id === "" ||
        LE12PreferredVendor.id === (0).toString(),
      languagesHasErrors: LE13Languages.length === 0,
    };
  }, [
    LE1About,
    LE2Category,
    LE3Location,
    LE4UploadImages,
    LE5Pricing,
    LE6BusinessHours,
    LE7ListingVideo,
    LE8MyTeam,
    LE9FAQs,
    LE12PreferredVendor,
    LE13Languages,
  ]);
  const hasErrors = useMemo(
    () => Object.values(validation).some((error) => error === true),
    [validation],
  );
  // const hasErrors = false;

  return (
    <MyListingContext.Provider
      value={{
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

        LE1About,
        setLE1About,
        LE2Category,
        setLE2Category,
        LE3Location,
        setLE3Location,
        LE4UploadImages,
        setLE4UploadImages,
        LE5Pricing,
        setLE5Pricing,
        LE6BusinessHours,
        setLE6BusinessHours,
        LE7ListingVideo,
        setLE7ListingVideo,
        LE8MyTeam,
        setLE8MyTeam,
        LE9FAQs,
        setLE9FAQs,
        LE10ServiceOffering,
        setLE10ServiceOffering,
        LE12PreferredVendor,
        setLE12PreferredVendor,

        LE13Languages,
        setLE13Languages,

        locationIndex,
        setLocationIndex,
      }}
    >
      {children}
    </MyListingContext.Provider>
  );
}

// 3. Create a custom hook for easy access
export function useMyListing() {
  const context = useContext(MyListingContext);
  if (context === undefined) {
    throw new Error("useMyListing must be used within a MyListingProvider");
  }
  return context;
}
