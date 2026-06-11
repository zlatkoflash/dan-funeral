import Image from "next/image";
import Link from "next/link";

// import productImageExample from './../../assets/images/example-product-photo.jpg';

import iconDollar from "./../../assets/images/icon-dollar-gray.svg";
import iconLocation from "./../../assets/images/icon-location-gray.svg";
import ZStars, { ZStarsCount } from "../stars/ZStars";
import placeholder from "./../../assets/images/placeholder.svg";
import { AuthUser } from "@/ContextProvider/AuthProviderWrap";
import VerifiedBadge from "../badges/VerifiedBadge";
import { ILocationItemSelected } from "../forms/InputSearchDropdownAddressesDV2";
import { slugify } from "@/utils/strings";

import icon_badge_green from "@/assets/images/icon-badge-green.svg";
import icon_badge_white from "@/assets/images/icon-badge-white.svg";
import { ICategoryLocal } from "@/app/find-providers/[[...slugs]]/Filters/FilterServices";
import {
  SLUG_DEFAULT_ALL_CATEGORIES,
  SLUG_DEFAULT_ALL_SUBCATEGORIES,
} from "@/utils/listing";

export interface IProductPanel {
  id: string;
  image: any;
  title: string;
  stars: number;

  details_item_startsAt: string;
  details_item_location: string;

  description: string;

  categories: ICategoryLocal[];

  url: string;

  owner: AuthUser;

  locations: ILocationItemSelected[];

  rating: {
    rating_count: number;
    rating_value: number;
  };

  is_featured: boolean;
  rank_position: number;

  location_primary: ILocationItemSelected | null;
}

export default function ProductPanel(data: IProductPanel) {
  console.log("Data for the product:", data);

  const location_primary = data.location_primary;

  return (
    <section className="product-panel" data-id={data.id}>
      <div className="image">
        <Link href={data.url}>
          <Image
            src={data.image || placeholder}
            alt={data.title || "Listing Gentle Road"}
            width={1000}
            height={1000}
          />
        </Link>
      </div>

      <div className="content-wrap">
        <div className="heading">
          <Link href={data.url} className="h3">
            <h3>{data.title}</h3>
          </Link>
          {/*<div className="d-flex align-items-center my-2">
            <ZStars value={data.stars} className="mb-0" />
            {data.owner.verification.isVerifiedByAdmin === true && (
              <div className="ml-4">
                <VerifiedBadge />
              </div>
            )}
          </div>*/}
          <ZStarsCount
            value={data.rating.rating_value}
            reviewsCount={data.rating.rating_count}
          />
        </div>

        <ul className="categories">
          {data.categories.map((cat, key: number) => {
            return (
              <li key={`category-${key}`}>
                <Link
                  href={"#"}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  {cat.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <div
          dangerouslySetInnerHTML={{ __html: data.description }}
          className="description"
        />

        <div className="footer-parts">
          <div className="details-items">
            {/*<div className="item"><Image src={iconDollar} alt={data.details_item_startsAt || "Listing Gentle Road"} />{data.details_item_startsAt}</div>*/}
            {/*<div className="item"><Image src={iconLocation} alt={data.details_item_location || "Listing Gentle Road"} />{data.details_item_location}</div>*/}

            {/*data.locations.map((location, key: number) => {
              return (
                <Link
                  className="item link"
                  key={`location-${key}`}
                  href={`/find-providers/${slugify(location.city)}/${SLUG_DEFAULT_ALL_CATEGORIES}/${SLUG_DEFAULT_ALL_SUBCATEGORIES}`}
                >
                  <Image
                    src={iconLocation}
                    alt={location.display_name || "Listing Gentle Road"}
                  />
                  {location.display_name}
                </Link>
              );
            })*/}
            {
              location_primary !== null && <Link
                className="item link product-address"
                key={`location-primary`}
                href={`/find-providers/${slugify(location_primary.city)}/${SLUG_DEFAULT_ALL_CATEGORIES}/${SLUG_DEFAULT_ALL_SUBCATEGORIES}`}
              >
                <Image
                  src={iconLocation}
                  alt={location_primary.display_name || "Listing Gentle Road"}
                />
                <span>{location_primary.display_name}</span>
              </Link>
            }
            

          </div>
          <div className="buttons">
            <Link href={data.url} className="btn btn-outline-success">
              View Profile
            </Link>
          </div>
        </div>
      </div>

      {/*Math.random() > 0.5 ? (
        <div className="badge-rank">
          <img src={icon_badge_green.src} alt="Icon Badge" />{" "}
          <span>Featured</span>
        </div>
      ) : (
        <div className="badge-rank primary">
          <img src={icon_badge_white.src} alt="Icon Ranked" />{" "}
          <span>Top Ranked</span>
        </div>
      )*/}
      {data.is_featured && (
        <div className="badge-rank" data-rank={data.rank_position}>
          <img src={icon_badge_green.src} alt="Icon Badge" />{" "}
          <span>Featured</span>
        </div>
      )}
    </section>
  );
}
