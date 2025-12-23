"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';
import AdminContentWrap from "./AdminContentWrap"
import { ISubHeaderSearch } from "@/components/headers/SubHeaderSearch";

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
        <div className="content-wrap">{data.children}</div>
      </div>
    </AdminContentWrap>
  </>
}