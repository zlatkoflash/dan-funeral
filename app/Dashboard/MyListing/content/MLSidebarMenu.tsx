"use client"

import Link from "next/link"
import { useState } from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "react-bootstrap";

export interface IMLSidebarMenuItem {
  title: string,
  link?: string,
  count?: number,
  onclick?: (e: any) => void,
  value?: string,
  error?: boolean
}
export interface IMLSidebarMenu {
  items: IMLSidebarMenuItem[],
  activeMenuValue?: string
}

export default function MLSidebarMenu(props: IMLSidebarMenu) {

  const [activeIndex, setActiveIndex] = useState<number>(0);
  console.log("props.activeMenuValue", props.activeMenuValue);

  const getCurrentLink = () => {
    console.log("activeIndex:", activeIndex);
    return props.items.find((item) => item.title === props.items[activeIndex].title);
  }

  return <>

    <Dropdown className="dashboard-sidebar-menu-dropdown my-listing-sidebar-menu-a">
      <DropdownToggle variant="light" className="w-100">
        <span>{getCurrentLink()?.title}</span>
      </DropdownToggle>

      <DropdownMenu>
        {
          props.items.map((item, index) => {

            console.log(item.title, props.items[activeIndex].title);

            return <DropdownItem className={` ${getCurrentLink()?.title === item.title ? "active" : ""}`} key={`dropdown-item-menu-${index}`} onClick={(e: any) => {
              e.preventDefault();
              item.onclick && item.onclick(e);
              setActiveIndex(index);
            }}>
              <div className="title">{item.title}</div>
              {
                item.count !== undefined && !isNaN(Number(item.count)) && <span className="count">{item.count < 10 ? '0' + item.count : item.count}</span>
              }

            </DropdownItem>
            /*return <li key={`dropdown-item-menu-${index}`} className="dropdown-item">

              <Link href={"/"} className={
                
            getCurrentLink()?.title === item.title
              ?
              "active" : ""
          }
                onClick = {(e: any) => {
          item.onclick && item.onclick(e);
        setActiveIndex(index);
                }}
              // href={item.link ? item.link : "#"}
              >

        <div className="title">{item.title}</div>
        {
          item.count !== undefined && !isNaN(Number(item.count)) && <span className="count">{item.count < 10 ? '0' + item.count : item.count}</span>
        }

      </Link>
    </li>*/
          })
        }
      </DropdownMenu >
    </Dropdown >

    <div className="my-listing-sidebar-menu">
      {
        props.items.map((item, index) => {
          return <div className={`item ${item.error ? "error" : ""}`} key={index}><Link className={
            /*(activeIndex === index && props.activeMenuValue === undefined)
              ||
              (props.activeMenuValue !== undefined && props.activeMenuValue === item.value)*/
            getCurrentLink()?.title === item.title
              ?
              "active" : ""}
            onClick={(e: any) => {
              item.onclick && item.onclick(e);
              setActiveIndex(index);
            }}
            href={item.link ? item.link : "#"}
          >

            <div className="title">{item.title}</div>
            {
              item.count !== undefined && !isNaN(Number(item.count)) && <span className="count">{item.count < 10 ? '0' + item.count : item.count}</span>
            }

          </Link>
          </div>
        })
      }
    </div>
  </>
}