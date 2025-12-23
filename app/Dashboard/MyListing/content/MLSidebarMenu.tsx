"use client"

import Link from "next/link"
import { useState } from "react";

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

  return <div className="my-listing-sidebar-menu">
    {
      props.items.map((item, index) => {
        return <div className={`item ${item.error ? "error" : ""}`} key={index}><Link className={
          (activeIndex === index && props.activeMenuValue === undefined)
            ||
            (props.activeMenuValue !== undefined && props.activeMenuValue === item.value)
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
}