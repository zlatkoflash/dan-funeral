import type { Metadata } from "next";
import ModalUserAuth from "@/components/modals/ModalUserAuth/ModalUserAuth";
/*import {
  // Geist, Geist_Mono
  Lora,
  Lato,
  Inter
} from "next/font/google";*/
import "./../globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
// import './../../assets/css/Style.scss';
import './../../assets/css/Style-Template.scss';
import './../../assets/css/Style-mobile.scss';
import { AuthProvider, AuthUser } from "@/ContextProvider/AuthProviderWrap";
// import HeaderSmallForLoggedUser from "@/components/headers/HeaderSmallForLoggedUser";
// import { getAccessToken } from "@/utils/apiServer";
import { getApiData } from "@/utils/api";
// import { log } from "console";
import ZError from "../errors/ZError";
import { DashboardProvider } from "./DashboardProvider";
import DashboardToasters from "./content/DashboardToasters";
import DashboardBaseContent from "./DashboardBaseContent";


// Define the font
/*const lora = Lora({
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
});*/

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


  console.log("dashboard layout.tsx")

  // const tokenForLoggedUser = await getAccessToken();
  // let loggedUser = null;
  // const loggedUserData = await getApiData("/user/getLoggedUser", "POST", {}, "authorize");
  // console.log("loggedUserData:", loggedUserData);


  // this is public data
  const DashboardData = await getApiData("/dashboard/GetBasicData", "GET", {});
  // console.log("DashboardData:", DashboardData);


  if (DashboardData.status === 404) {
    // this is not found from the server
    // notFound();
    return <ZError status={405} />
  }
  else if (DashboardData.status === 500) {
    // server error
    return <ZError status={500} />
  }
  else if (DashboardData.status === 501) {
    // internal error
    return <ZError status={501} />
  }
  else if (DashboardData.ok === undefined) {
    return <ZError status={404} />
  }



  console.log("Dashboard Layout.tsx rendering");

  /*
  No need for 
    <html lang="en">
      <body here because they come from the route layout :)
  */

  return (
    <>
      {
        /*
         <AuthProvider
          loggedUser={
            loggedUserData.ok === true ? loggedUserData.user as AuthUser : null
          }>
        */
      }



      <DashboardBaseContent DashboardData={DashboardData}>
        {children}
      </DashboardBaseContent>


      {
        // </AuthProvider>
      }
    </>
  );
}
