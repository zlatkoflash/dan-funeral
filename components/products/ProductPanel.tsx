import Image from "next/image";
import Link from "next/link";


// import productImageExample from './../../assets/images/example-product-photo.jpg';

import iconDollar from './../../assets/images/icon-dollar-gray.svg';
import iconLocation from './../../assets/images/icon-location-gray.svg';
import ZStars from "../stars/ZStars";


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
  }[]

}

export default function ProductPanel(
  data: IProductPanel
) {
  return <section className="product-panel">
    <div className="image">
      <Link href="/ProductDetails">
        <Image src={data.image} alt="Peaceful Memorial Home" />
      </Link>
    </div>
    <div className="content-wrap">
      <Link href="/ProductDetails" className="h3">
        <h3>{data.title}</h3>
      </Link>
      <ZStars value={data.stars} />
      <div className="details-items">
        <div className="item"><Image src={iconDollar} alt={data.details_item_startsAt} />{data.details_item_startsAt}</div>
        <div className="item"><Image src={iconLocation} alt={data.details_item_location} />{data.details_item_location}</div>
      </div>
      <p>{data.description}</p>
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