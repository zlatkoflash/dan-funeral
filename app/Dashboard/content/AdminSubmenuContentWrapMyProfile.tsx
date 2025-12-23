import AdminSubmenuContentWrap from "../content/AdminSubmenuContentWrap";
import { ISubHeaderSearch } from "@/components/headers/SubHeaderSearch";

export default function AdminSubmenuContentWrapMyProfile({ children, subHeadSearchSettings }: { children: React.ReactNode, subHeadSearchSettings: ISubHeaderSearch }) {
  return <>

    <AdminSubmenuContentWrap subHeadSearchSettings={subHeadSearchSettings} menuItems={[
      { label: "My Profile", link: "/Dashboard/MyProfile" },
      { label: "Business Profile", link: "/Dashboard/MyProfile/Business" },
      { label: "Password Change", link: "/Dashboard/MyProfile/PasswordChange" },
      { label: "Social Media", link: "/Dashboard/MyProfile/SocialMedia" },
    ]} >
      {children}
    </AdminSubmenuContentWrap>
  </>
}