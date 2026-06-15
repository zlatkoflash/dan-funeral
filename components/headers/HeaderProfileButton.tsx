"use client";

import Image from "next/image";
import Link from "next/link";
import { Dropdown } from "react-bootstrap";
import profile_temporary from './../../assets/images/profile-image-example-circle.jpg';
import { useAuth } from "@/ContextProvider/AuthProviderWrap";
import { useAppDispatch } from "@/redux/hooks";
import { dashboardSlice } from "@/redux/features/DashboardSlice";
import { DashboardSidebarMenuICons } from "../dashboard/DashboardSidebarMenu";

export default function HeaderProfileButton() {
  const { user, signOut } = useAuth();

  // Safe check for profile image source
  const profileImageSrc = user?.profile_photo && user.profile_photo.trim() !== "" 
    ? user.profile_photo 
    : profile_temporary;
    
  const dispatch = useAppDispatch();

  return (
    <Dropdown align="end" className="dashboard-sidebar-menu-dropdown  for-submenu d-block">
      {/* Custom toggle matching your original profile-photo-link layout */}
      <Dropdown.Toggle 
        as={Link} 
        href="#" 
        className="profile-photo-link d-flex align-items-center gap-2 border-0 bg-transparent p-0 context-toggle"
        id="dropdown-profile-button"
      >
        <Image 
          src={profileImageSrc} 
          alt="Profile Photo" 
          width={50} 
          height={50} 
          style={{ borderRadius: "50%", objectFit: "cover" }}
        />
        <span>{user?.display_name || "Account"}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {/* Item 1: Dashboard */}
        <Dropdown.Item as={Link} href="/DashboardV2/">
          Dashboard
        </Dropdown.Item>

        {/* Item 2: Profile Settings */}
        <Dropdown.Item as={Link} href="/DashboardV2" onClick={(e)=>{
          dispatch(dashboardSlice.actions.setModalShow_ProfileDetails({
              show: true,
              type: "my-profile"
            }))
        }}>
          Profile Settings
        </Dropdown.Item>

        {/* Item 3: Business Details */}
        <Dropdown.Item as={Link} href="/DashboardV2/EditBusiness">
          Business Details
        </Dropdown.Item>

        <Dropdown.Divider />

        {/* Item 4: Logout */}
        <Dropdown.Item 
          as="button" 
          type="button" 
          onClick={() => {
            // if (logout) logout();
            signOut();
          }}
        >
          {DashboardSidebarMenuICons("iconChipExtraction")}
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}