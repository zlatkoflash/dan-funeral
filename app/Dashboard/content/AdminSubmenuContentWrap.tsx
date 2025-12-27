"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';
import AdminContentWrap from "./AdminContentWrap"
import { ISubHeaderSearch } from "@/components/headers/SubHeaderSearch";
import { Dropdown, DropdownMenu, DropdownToggle } from "react-bootstrap";

/**
 * 
 * @returns This component will hold submenu navigation and content for it
 */
export interface IAdminSubmenuContentWrap {
  menuItems: {
    label: string,
    link: string
  }[],
  children: React.ReactNode,
  subHeadSearchSettings: ISubHeaderSearch
}
export default function AdminSubmenuContentWrap(data: IAdminSubmenuContentWrap) {

  const pathName = usePathname();

  const getCurrentLink = (): any => {
    return data.menuItems.find((item) => item.link === pathName);
  };

  return <>

    <AdminContentWrap subHeadSearchSettings={data.subHeadSearchSettings}>
      <div className="admin-submenu-content-wrap">
        <div className="menu-wrap">
          <ul>
            {
              data.menuItems.map((item, key: number) => {
                return <li key={`menu-item-${key}`}>
                  <Link href={item.link} className={`${pathName == item.link ? 'active' : ''}`}>{item.label}</Link>
                </li>
              })
            }
          </ul>


        </div>



        <Dropdown className="dashboard-sidebar-menu-dropdown for-submenu">
          <DropdownToggle variant="light" className="w-100">
            <span>{getCurrentLink() !== undefined ? getCurrentLink().label as string : '-'}</span>
          </DropdownToggle>

          <DropdownMenu>
            {
              data.menuItems.map((item, key: number) => {
                return <li key={`dropdown-item-menu-${key}`} className="dropdown-item">
                  <Link href={item.link} className={`${pathName == item.link ? 'active' : ''}`}>{item.label}</Link>
                </li>
              })
            }
          </DropdownMenu>
        </Dropdown>


        <div className="content-wrap">{data.children}</div>
      </div>




    </AdminContentWrap>
  </>
}