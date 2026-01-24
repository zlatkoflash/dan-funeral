import type { Metadata } from "next";
import ModalUserAuth from "@/components/modals/ModalUserAuth/ModalUserAuth";
import {
  // Geist, Geist_Mono
  Lora,
  Lato,
  Inter
} from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
// import './../assets/css/Style.scss';
import './../assets/css/Style-Template.scss';
import './../assets/css/Style-mobile.scss';
import { AuthProvider, AuthUser } from "@/ContextProvider/AuthProviderWrap";
import HeaderSmallForLoggedUser from "@/components/headers/HeaderSmallForLoggedUser";
import { getAccessToken } from "@/utils/apiServer";
import { getApiData } from "@/utils/api";
import { log } from "console";

/*const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});*/

// Define the font
const lora = Lora({
  variable: "--google-font-lora",
  subsets: ['latin'],
  weight: ['400', '500'], // Use a single weight, or an array: ['400', '700']
  style: ["normal", "italic"]
});
const lato = Lato({
  variable: "--google-font-lato",
  subsets: ['latin'],
  weight: ['400', '700'], // Use a single weight, or an array: ['400', '700']
});
const inter = Inter({
  variable: "--google-font-inter",
  subsets: ['latin'],
  weight: ['400'], // Use a single weight, or an array: ['400', '700']
});

export const metadata: Metadata = {
  title: "Gentle Road",
  description: "Find trusted funeral and memorial services — all in one peaceful place.",
  keywords: "funeral, memorial, services, peaceful place, funeral services, memorial services, funeral home, memorial home, funeral home services, memorial home services"
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  // const tokenForLoggedUser = await getAccessToken();
  // let loggedUser = null;
  /**/
  const loggedUserData = await getApiData<{
    ok: boolean,
    user: AuthUser,
    message: string
  }>("/user/getLoggedUser", "POST", {}, "authorize");
  console.log("loggedUserData:", loggedUserData);

  console.log("base layout.tsx");

  console.log(`
    When using WordPress as a backend, your Next.js app will be making many API calls to wp-json. To keep it fast and cheap:

Use ISR (Incremental Static Regeneration): Don't fetch data from WordPress every time a user visits. Tell Next.js to cache the WordPress response for a few minutes.

JavaScript

// In your Next.js fetch call
const res = await fetch('https://your-wp-site.com/wp-json/my-cover/v1/data', { 
  next: { revalidate: 300 } // Cache for 5 minutes
});
Why? This prevents your cheap WordPress server from crashing if you get a lot of visitors, because Next.js will serve the "cached" version instead of hitting the database every time.
    
    `);


  console.log("Root Layout rendering...");

  return (
    <html lang="en">
      <body
        className={`${lora.variable} ${lato.variable} ${inter.variable} antialiased`}
      >

        <AuthProvider
          loggedUser={
            loggedUserData.ok === true ? loggedUserData.user as AuthUser : null
          }>
          {children}

          <ModalUserAuth forLandingPage={true} />


        </AuthProvider>

      </body>
    </html >
  );
}
