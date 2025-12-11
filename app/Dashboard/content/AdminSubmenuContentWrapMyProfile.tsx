import AdminSubmenuContentWrap from "../content/AdminSubmenuContentWrap";

export default function AdminSubmenuContentWrapMyProfile({ children }: { children: React.ReactNode }) {
  return <>

    <AdminSubmenuContentWrap menuItems={[
      { label: "My Profile", link: "/Dashboard/MyProfile" },
      { label: "Business Profile", link: "/Dashboard/MyProfile/Business" },
      { label: "Password Change", link: "/Dashboard/MyProfile/PasswordChange" },
      { label: "Social Media", link: "/Dashboard/MyProfile/SocialMedia" },
    ]}>
      {children}
    </AdminSubmenuContentWrap>
  </>
}