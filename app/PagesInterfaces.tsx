import { IBannerFindSupport } from "@/components/banners/BannerFindSupport";
import { IBannerMoment } from "@/components/banners/BannerMoment";
import { IClaimYourFreePage } from "@/components/banners/ClaimYourFreePage";
import { IFooterBanner } from "@/components/banners/FooterBanner";
import { IGuidsGrid } from "@/components/directoriesgrid/GuidsGrid";
import { IHomeDirectory } from "@/components/directoriesgrid/HomeDirectory";
import { IOurMissionGrid } from "@/components/directoriesgrid/OurMissionGrid";
import { IX3DirectoriesPanels } from "@/components/directoriesgrid/X3DirectoriesPanels";
import { IX3PanelsWithServices } from "@/components/directoriesgrid/X3PanelsWithServices";
import { IHeadingTitleParagraph } from "@/components/headings/HeadingTitleParagraph";
import { IHeroHeader } from "@/components/heroes/HeroHeader";
import { IPlansAndPricing } from "@/components/pricing/PlansAndPricing";
import { IOurStory } from "@/components/testimonials/OurStory";
import { ITestimonialsPanel } from "@/components/testimonials/TestimonialsPanel";
import { AuthUser } from "@/ContextProvider/AuthProviderWrap";

export interface IMenuHeaderItem {
  title: string;
  url: string;
  slug: string;
}

export interface IPageInterface {
  status: number,
  ok: boolean,
  error?: any,
  code?: string,
  errorJson401?: any,
  // auth part: 
  user?: AuthUser,
  expiresIn?: number, // seconds
  token?: string,
  // auth part end
  message: string,
  menu_header_items: IMenuHeaderItem[];
  menu_footer_items: IMenuHeaderItem[];
  acf: {
    home_hero_big_image: {
      title: string;
      paragraph: string;
      background_image: string;
    },
    home_directory: IHomeDirectory,
    x3_directories: IX3DirectoriesPanels,
    x3_directories_panels: IX3DirectoriesPanels,
    search_based_on_your_needs: IX3PanelsWithServices,
    testimonials_home: ITestimonialsPanel,
    guids_grid: IGuidsGrid,
    posts_grid_guids_grid: IGuidsGrid,
    footer_banner: IFooterBanner,
    banner_support: IBannerFindSupport,
    hero_header: IHeroHeader,
    claim_your_free_page: IClaimYourFreePage,
    plans_and_pricing: IPlansAndPricing,
    our_story_block: IOurStory,
    banner_moment: IBannerMoment,
    our_mission: IOurMissionGrid,

    hero_image: string,
    post__page_template: "default" | "resource-detail-template",
    // banner
  },

  post_content_global: {
    /** The introductory data block. */
    intro: {
      /** The main title of the article. */
      title: string;
      /** A brief summary or opening paragraph. */
      paragraph: string;
      /** The nested object containing the author's details. */
      profile: {
        /** The name of the article author. */
        name: string;
        /** The date the post was last updated, in string format (e.g., "May 18, 2023"). */
        postUpdateDate: string;
        /** The URL or path to the author's photo/avatar. */
        photo: string | undefined; // 'undefined' matches your example data
      };
    };
    /** The URL or path to the main image of the article. */
    featuredImage: string | undefined; // 'undefined' matches your example data
    /** An array of content segments, where each segment is a string containing HTML markup. */
    contentItems: string[];
  }


  page_creator_profile_details: {
    name: string,
    // postUpdateDate: "May 18, 2023",
    postUpdateDate: string,
    photo: string
  }

  page: {
    /** The unique ID of the post/page. */
    ID: number;

    /** The ID of the post author. */
    post_author: string;

    /** The date the post was published (YYYY-MM-DD HH:MM:SS). */
    post_date: string;

    /** The GMT date the post was published (YYYY-MM-DD HH:MM:SS). */
    post_date_gmt: string;

    /** The main content of the post. */
    post_content: string;

    /** The title of the post. */
    post_title: string;

    /** The post excerpt (summary). */
    post_excerpt: string;

    /** The status of the post (e.g., 'publish', 'draft'). */
    post_status: string;

    /** Comment status ('open' or 'closed'). */
    comment_status: 'open' | 'closed';

    /** Ping status ('open' or 'closed'). */
    ping_status: 'open' | 'closed';

    /** Post password (usually empty). */
    post_password: string;

    /** The post slug/name (URL-friendly version). */
    post_name: string;

    /** Trackbacks/pingbacks to send. */
    to_ping: string;

    /** Trackbacks/pingbacks already sent. */
    pinged: string;

    /** The date the post was last modified (YYYY-MM-DD HH:MM:SS). */
    post_modified: string;

    /** The GMT date the post was last modified (YYYY-MM-DD HH:MM:SS). */
    post_modified_gmt: string;

    /** Post content filtered (usually empty). */
    post_content_filtered: string;

    /** ID of the parent post (0 for top-level pages). */
    post_parent: number;

    /** The global unique identifier for the post. */
    guid: string;

    /** Menu order (used for ordering pages/menu items). */
    menu_order: number;

    /** The type of the post (e.g., 'post', 'page', 'custom_post_type'). */
    post_type: string;

    /** Mime type for attachments. */
    post_mime_type: string;

    /** The number of comments. */
    comment_count: string;

    /** Filter status (usually 'raw'). */
    filter: string;

    acf: {
      featured_thumbnail: string,
      paragraph: string,
      hero_image: string
    }
  }
}