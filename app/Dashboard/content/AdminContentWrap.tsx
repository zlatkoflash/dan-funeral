'use client'

import DashboardMainContainer from "@/components/dashboard/DashboardMainContainer";
import FooterLanding from "@/components/footers/FooterLanding";
import HeaderListingCards from "@/components/headers/HeaderListingCards";
import SubHeaderSearch, { ISubHeaderSearch } from "@/components/headers/SubHeaderSearch";
import { useDashboard } from "../DashboardProvider";

export default function AdminContentWrap({ children, subHeadSearchSettings, haveSidebar = true }: { children: React.ReactNode, subHeadSearchSettings: ISubHeaderSearch, haveSidebar?: boolean }) {

  const {
    menuFooterItems,
    menuHeaderItems
  } = useDashboard();

  return <>
    <HeaderListingCards menuItems={menuHeaderItems} />
    <SubHeaderSearch {...subHeadSearchSettings} />

    <DashboardMainContainer haveSidebar={haveSidebar}>
      {children}
    </DashboardMainContainer>

    <FooterLanding menu_footer_items={menuFooterItems} />
  </>
}