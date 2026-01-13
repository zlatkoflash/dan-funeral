import Link from 'next/link';
import arrowRightGray from './../../assets/images/icon-arrow-right-gray.svg';
import Image from "next/image";

export interface IZBreadCrumbs {
  links: {
    link: string,
    label: string
  }[]
}

export default function ZBreadCrumbs(data: IZBreadCrumbs) {


  return <ul className="sub-menu-bread-crumbs">

    {
      data.links.map((item, key: number) => {
        return <li key={`item-${key}`}>
          <Link href={item.link}>{item.label}</Link>
          {
            key < data.links.length - 1 ? <Image src={arrowRightGray} alt="Home Arrow" /> : <></>
          }
        </li>
      })
    }
  </ul>
}