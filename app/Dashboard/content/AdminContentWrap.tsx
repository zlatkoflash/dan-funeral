'use client'

import DashboardMainContainer from "@/components/dashboard/DashboardMainContainer";
import FooterLanding from "@/components/footers/FooterLanding";
import HeaderListingCards from "@/components/headers/HeaderListingCards";
import SubHeaderSearch from "@/components/headers/SubHeaderSearch";
import { useDashboard } from "../DashboardProvider";

export default function AdminContentWrap({ children }: { children: React.ReactNode }) {

  const {
    menuFooterItems,
    menuHeaderItems
  } = useDashboard();

  return <>
    <HeaderListingCards menuItems={menuHeaderItems} />
    <SubHeaderSearch />

    <DashboardMainContainer>
      {/*<DashboardContent />*/}
      {/*<C1DashboardHome />*/}
      {children}
    </DashboardMainContainer>

    <FooterLanding menu_footer_items={menuFooterItems} />
  </>
}