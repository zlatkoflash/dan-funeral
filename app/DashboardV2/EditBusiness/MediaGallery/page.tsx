import DashboardFooter from "@/app/DashboardV2/DashboardComponents/Footer";
import DashboardHeader from "@/app/DashboardV2/DashboardComponents/Header";
import HeaderBack from "@/app/DashboardV2/DashboardComponents/HeaderBack";
import BusinessTabs from "@/app/DashboardV2/EditBusiness/components/BusinessTabs";

export default function EditBusiness() {
  return <>
    <DashboardHeader />

    <HeaderBack />

    <BusinessTabs activeTab="media-gallery" />

    <DashboardFooter />
  </>
}