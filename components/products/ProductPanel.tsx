import Image from "next/image";
import Link from "next/link";


// import productImageExample from './../../assets/images/example-product-photo.jpg';

import iconDollar from './../../assets/images/icon-dollar-gray.svg';
import iconLocation from './../../assets/images/icon-location-gray.svg';
import ZStars from "../stars/ZStars";
import placeholder from './../../assets/images/placeholder.svg'
import { AuthUser } from "@/ContextProvider/AuthProviderWrap";
import VerifiedBadge from "../badges/VerifiedBadge";


export interface IProductPanel {
  id: string,
  image: any,
  title: string,
  stars: number,

  details_item_startsAt: string,
  details_item_location: string,

  description: string,

  categories: {
    link: string,
    label: string
  }[],

  url: string,

  owner: AuthUser

}

export default function ProductPanel(
  data: IProductPanel
) {



  return <section className="product-panel">
    <div className="image">
      <Link href={data.url}>
        <Image src={data.image || placeholder} alt={data.title || "Listing Gentle Road"} width={1000} height={1000} />
      </Link>
    </div>
    <div className="content-wrap">
      <Link href={data.url} className="h3">
        <h3>{data.title}</h3>
      </Link>
      <div className="d-flex align-items-center my-2">
        <ZStars value={data.stars} className="mb-0" />
        {
          data.owner.verification.isVerifiedByAdmin === true && <div className="ml-4"><VerifiedBadge /></div>
        }
      </div>
      <div className="details-items">
        {
          /*<div className="item"><Image src={iconDollar} alt={data.details_item_startsAt || "Listing Gentle Road"} />{data.details_item_startsAt}</div>*/
        }
        <div className="item"><Image src={iconLocation} alt={data.details_item_location || "Listing Gentle Road"} />{data.details_item_location}</div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: data.description }} />
      <ul className="categories">
        {/*<li>
          <a href="">Cremation</a>
        </li>
        <li>
          <a href="">Green Burial</a>
        </li>
        <li>
          <a href="">Grief Support</a>
        </li>*/}

        {
          data.categories.map((cat, key: number) => {
            return <li key={`category-${key}`}>
              <Link href={cat.link}>{cat.label}</Link>
            </li>
          })
        }

      </ul>
    </div>
  </section>
}