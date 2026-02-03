// context/AuthContext.tsx
"use client";

import { deleteAccessToken } from '@/utils/apiServer';
import { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { SocialPlatform } from '@/components/forms/ListItemsEdits/ListSocialItemsEditorItem';
import { getApiData } from '@/utils/api';


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
    plan_type: 'basic' | 'normal' | 'premium';
    plan_name: string;
    amount: number;
    currency: string;
    interval: 'month' | 'year';
    startedAt: number;
    canceledAt: number | null;
    price_id: string | null;
  }

};

// Define the shape of the Auth Context value
export type AuthContextType = {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  isLoading: boolean;
  signIn: (credentials: any) => Promise<void>; // Replace 'any' with your sign-in payload type
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

  const signIn = async (credentials: any) => { }
  const signOut = async () => {
    // Simulate an API call to log out, clear session/cookies
    await deleteAccessToken()
    // setUser(null);
    // DoLogout();
    // router.refresh();
    // router.refresh();
    setShowAuthModal(true);
  };

  // const checkedDetailsAboutUser = useRef<boolean>(false);
  const [loadedUserData, setLoadedUserData] = useState<boolean>(false);

  useEffect(() => {
    console.log("AuthProviderWrap.tsx useEffect, check if user is logged in");
    /*if (user) {
      setIsLoading(false);
    }*/
    /*if (checkedDetailsAboutUser.current) return;
    checkedDetailsAboutUser.current = true;*/

    const CheckF = async () => {

      console.log("AuthProviderWrap.tsx useEffect, CheckF()...");

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

    }

    if (user === null) {
      CheckF();
    }



  }, [pathname]);


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