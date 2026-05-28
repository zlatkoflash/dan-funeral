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
import { MyLocationProvider } from "@/ContextProvider/LocationProvider";
import ReduxProvider from "@/ContextProvider/ReduxProvider";

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




  console.log("Root Layout rendering...");

  return (
    <html lang="en">
      <body
        className={`${lora.variable} ${lato.variable} ${inter.variable} antialiased`}
      >
{
  /*
        <MyLocationProvider>
          
        </MyLocationProvider>*/
}

        <AuthProvider
          /*loggedUser={
            loggedUserData.ok === true ? loggedUserData.user as AuthUser : null
          }*/
          >


            <ReduxProvider>

              {children}


              <ModalUserAuth forLandingPage={true} />

            </ReduxProvider>


          </AuthProvider>

      </body>
    </html >
  );
}
