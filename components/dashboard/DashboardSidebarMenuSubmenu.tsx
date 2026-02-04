"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { IDashboardSidebarMenuItem } from "./DashboardSidebarMenu";

import icon_arrow_dashboard_sidebar_submenu from './../../assets/images/icon-arrow-dashboard-sidebar-submenu.svg'
import { useState } from "react";


export default function DashboardSidebarMenuSubmenu({ item }: {
  item: IDashboardSidebarMenuItem
}) {
  const currentPath = usePathname();

  const someSubItemIsActive = item.subItems?.some((subItem) => subItem.link === currentPath);

  const [isOpen, setIsOpen] = useState(someSubItemIsActive);

  return (
    <>
      <li className={`${isOpen ? 'submenu-is-opened' : ''}`} onClick={() => {

      }}>
        <Link href={item.link} className={`${someSubItemIsActive ? 'active' : ''}`} onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}>
          {
            someSubItemIsActive ?
              <Image src={item.icon_active as string} alt={item.label} width={20} height={20} />
              :
              item.icon
          }
          <span>{item.label}</span>

          <span className="icon-arrow">
            <Image src={icon_arrow_dashboard_sidebar_submenu} alt="arrow" width={20} height={20} />
          </span>

        </Link>
        {
          item.subItems && item.subItems.length > 0 && (
            <ul className="submenu" style={{ display: isOpen ? 'block' : 'none' }}>
              {item.subItems.map((subItem, index) => {
                const isActiveLink = currentPath === subItem.link && subItem.link !== '/Dashboard';
                return <li key={`submenu-item-${index}`}>
                  <Link href={subItem.link} className={`${isActiveLink ? 'active' : ''}`} onClick={(e) => {
                    // e.preventDefault();

                  }}>
                    <span>{subItem.label}</span>
                  </Link>
                </li>
              })}
            </ul>
          )
        }
      </li>
    </>
  )
}