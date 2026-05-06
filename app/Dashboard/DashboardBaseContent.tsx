"use client"

import ModalUserAuth from "@/components/modals/ModalUserAuth/ModalUserAuth";
import DashboardToasters from "./content/DashboardToasters";
import { DashboardProvider } from "./DashboardProvider";
import { useAuth } from "@/ContextProvider/AuthProviderWrap";

export default function DashboardBaseContent({
  children,
  DashboardData,
  // loggedUserData
}: {
  children: React.ReactNode;
  DashboardData: any;
  // loggedUserData: any;
}) {

  const { user } = useAuth();

  return (
    <>

      {
        <DashboardProvider menuHeaderItems={DashboardData.menu_header_items} menuFooterItems={DashboardData.menu_footer_items}>
          {children}
          <DashboardToasters />
        </DashboardProvider>
      }

      {
        /* user === null &&
        <ModalUserAuth disabledClosing={true} showAlwaysVisible={true} />*/
      }
    </>
  );
}