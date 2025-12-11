import DashboardProfileImage from "./DashboardProfileImage";
import DashboardSidebarMenu from "./DashboardSidebarMenu";

export default function DashboardSidebar() {
  return <div className="sidebar-admin">
    <DashboardProfileImage />
    <DashboardSidebarMenu />
  </div>;
}