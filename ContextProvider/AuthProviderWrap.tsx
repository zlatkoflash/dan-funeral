// context/AuthContext.tsx
"use client";

import { deleteAccessToken, getAccessToken } from '@/utils/apiServer';
import { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { SocialPlatform } from '@/components/forms/ListItemsEdits/ListSocialItemsEditorItem';
import { getApiData } from '@/utils/api';
import { IListing_IdentityAndNarative, IListing_ServicesAreasAndCategories } from '@/utils/interfaceListing';
import { ILocationItemSelected } from '@/components/forms/InputSearchDropdownAddressesDV2';


export interface IUserSocialLink {
  socialType: SocialPlatform,
  link: string,
  id: string,
}
// types/auth.ts
// Define the shape of a User object
export type AuthUser = {
  id: string;
  email: string;
  name: string | null;
  display_name: string,
  profile_photo: string;
  cover_photo: string;
  // Add any other user properties
  roles: string[];

  full_name: string;
  occupation: string;
  phone: string;

  official_business_name: string;
  business_url: string;
  business_email: string;
  business_phone: string;
  business_location: string;
  business_address: string;
  business_description: string;

  /*social_facebook: string;
  social_instagram: string;
  social_youtube: string;
  social_x: string;
  social_linkedin: string;
  social_tiktok: string;
  social_pinterest: string;
  social_snapchat: string;
  social_reddit: string;
  social_github: string;
  social_twitch: string;
  social_discord: string;

  social_links_json_array: string;*/

  // social_links: IUserSocialLink[];
  social_links_json_array: string;


  email_verified: boolean;


  /*stripe_payment_method: string;
  stripe_product_subscription_id: string;
  stripe_subscription_status: string;
  stripe_product_selected_payment_id: string;
  stripe_customer_id: string;*/


  plan: {
    subscription_id: string | null;
    status: 'active' | 'trailing' | 'past_due' | 'canceled' | 'incomplete' | 'none';
    plan_type: 'basic' | 'standard' | 'premium';
    plan_name: string;
    amount: number;
    currency: string;
    interval: 'month' | 'year';
    startedAt: number;
    canceledAt: number | null;
    price_id: string | null;

    max_counts: {
      listings: number,
      request_quote: number,
      gallery_images: number,
    }
  },

  counts: {
    listings: number,
    request_quote: number
  },

  verification: {
    email: boolean;
    isVerifiedByAdmin: boolean;
    isCompleteVerification: boolean;
    verificationEmailsAreSent: boolean;
  },


  defaultListing: {

    id: number,
    name: string,

    planType: "basic" | "standard" | "premium";
    plan_subscribtion_details: {
      customer_id: string | null,
      subscribtion_id: string | null,
      status: string | null,
      plan_slug: string | null,
      product_price_id: string | null,
      plan_type: "basic" | "standard" | "premium",
      plan_period: "monthly" | "yearly",
    },

    rank_subscribtion_id: string | null;
    ranks_count: number | null;

    counts: {
      slots: number,
      photos: number,
      videos: number
    },
    counts_used: {
      slots: number,
      photos: number,
      videos: number
    },

    data: {
      identity_and_narrative: IListing_IdentityAndNarative | null,
      services_areas_and_categories: IListing_ServicesAreasAndCategories,
      location_primary: ILocationItemSelected | null
    },

    isVerified: boolean,

    health: {
      coeficient: number,
      // photos_coeficient: number,
      // videos_coeficient: number,
      // services_coeficient: number,
    },

    quick_stats: {
      count_profile_views: number,
      count_search_appearances: number,
      count_leads: number,
    },

  },

  profile: {
    name: string,
    occupation: string,
    phone_number: string,
  },
  business_profile: {
    official_business_name: string;
    business_url: string;
    business_email: string,
    business_phone_number: string,
    business_location: string,
    business_address: string,
    business_description: string,
  },


  leads: {
    count: number
  }

};

// Define the shape of the Auth Context value
export type AuthContextType = {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  isLoading: boolean;
  signIn: (loggedUser: AuthUser) => Promise<void>; // Replace 'any' with your sign-in payload type
  signOut: () => Promise<void>;

  showAuthModal: boolean;
  setShowAuthModal: (showAuthModal: boolean) => void;

};


// 1. Create the Context
// The default value is set to undefined, and the context type is AuthContextType | undefined.
// We will enforce the existence of a Provider in the custom hook.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 2. Create the Provider Component
type AuthProviderProps = {
  children: ReactNode;
  // loggedUser: AuthUser | null;
};

export function AuthProvider({ children
  // , loggedUser 

}: AuthProviderProps) {

  console.log("AuthProviderWrap.tsx");

  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<AuthUser | null>(
    // loggedUser
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);

  const signIn = async (loggedUser: AuthUser) => {
    setUser(loggedUser);
    // Broadcast the login to other tabs
    localStorage.setItem('login-event', Date.now().toString());
  }
  const signOut = async () => {
    // Simulate an API call to log out, clear session/cookies
    await deleteAccessToken()
    // setUser(null);
    // DoLogout();
    // router.refresh();
    // router.refresh();
    // setShowAuthModal(true);

    // Broadcast the logout to other tabs
    localStorage.setItem('logout-event', Date.now().toString());
    setUser(null)
    // window.location.reload();
    setShowAuthModal(true)
  };

  // const checkedDetailsAboutUser = useRef<boolean>(false);
  const [loadedUserData, setLoadedUserData] = useState<boolean>(false);

  const CheckF = async () => {

    console.log("AuthProviderWrap.tsx useEffect, CheckF()...");

    const token = await getAccessToken();
    console.log("token:", token);

    if (token === null) {
      setUser(null);
      setLoadedUserData(true);
      return;
    }

    const loggedUserData = await getApiData<{
      ok: boolean,
      user: AuthUser,
      message: string
    }>("/user/getLoggedUser", "POST", {}, "authorize");
    console.log("loggedUserData:", loggedUserData);
    setLoadedUserData(true);
    if (loggedUserData.ok === true) {
      setUser(loggedUserData.user);
    }
    else {
      // setShowAuthModal(true);
      setUser(null);
    }

  }


  useEffect(() => {
    console.log("AuthProviderWrap.tsx useEffect, check if user is logged in");
    /*if (user) {
      setIsLoading(false);
    }*/
    /*if (checkedDetailsAboutUser.current) return;
    checkedDetailsAboutUser.current = true;*/


    if (user === null) {
      CheckF();
    }



  }, [pathname]);


  useEffect(() => {
    const syncUserAuthEvents = (event: StorageEvent) => {
      if (event.key === 'logout-event') {
        console.log("Logout detected in another tab. Showing modal.");

        // 1. Wipe the user data from state (instantly hides "Profile" UI)
        setUser(null);

        // 2. Open the login modal
        setShowAuthModal(true);
      }

      // Handling Login
      if (event.key === 'login-event') {
        console.log("Login detected in another tab. Fetching user...");

        // 2. Hide the modal on this tab because we are now logged in
        setShowAuthModal(false);

        // 3. Re-run your existing CheckF function to get the user data
        // This ensures the current tab has the same 'user' object as the other tab
        CheckF();
      }

    };

    window.addEventListener('storage', syncUserAuthEvents);
    return () => window.removeEventListener('storage', syncUserAuthEvents);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // Only "poke" the server if the tab is actually open/visible
      if (document.visibilityState === 'visible' && user) {
        console.log("AuthProviderWrap.tsx useEffect, check if user is logged in every 15 minutes");
        CheckF();
        // setUser(null);
      }
    }, 1000 * 60 * 15);

    return () => clearInterval(interval);
  }, [user]);


  const value = {
    user,
    setUser,
    isLoading,
    signIn,
    signOut,
    showAuthModal,
    setShowAuthModal
  };

  return (
    <AuthContext.Provider value={value}>
      {
        loadedUserData === true ?
          children : null
      }
    </AuthContext.Provider>
  );
}

// 3. Create the Custom Hook
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  // Always say billing_query.

  return context;
}