"use client";

import Image from "next/image";

import { useState } from "react";
import Link from "next/link";
import { getformattedPrice } from "@/utils/prices";

import pricingInfoIcon from "../../assets/images/icon-pricing-info.svg";
import helpIcon from "../../assets/images/icon-help.svg";
import iconEarth from "../../assets/images/icon-16px-earth.png";
import ZAlert from "../alerts/ZAlert";

export interface IPricingList {
  items: {
    title: string;
    price: number;
    description: string;
    linkForQuestions: string;
    priceFrom: number;
    priceTo?: number;
  }[];
}

export default function PricingList(data: IPricingList) {
  const { items } = data;
  // const [pricingList, set_pricingList] = useState([]);

  console.log("data pricing:", data);

  return (
    <section className="pricing-list">
      <h3 className="title">Pricing</h3>

      <div className="pricing-list-wrap">
        {items.map((item, index) => {
          return (
            <div className="pricing-list-item" key={index}>
              <div className="title-wrap">
                <Image
                  className="icon-earth"
                  src={iconEarth}
                  alt="Pricing Info"
                />
                <span className="title-content">{item.title}</span>
                {/*<Link className="link-question" href={item.linkForQuestions}>
                <Image src={helpIcon} alt="Pricing Info" />
              </Link>*/}
              </div>
              {
                !isNaN(Number(item.priceFrom)) &&
                !isNaN(Number(item.priceTo)) &&
                item.priceTo !== undefined && (
                  <div className="price">
                    <strong>
                      {
                        // getformattedPrice(item.price)
                        getformattedPrice(item.priceFrom)
                      }
                    </strong>
                    <span className="price-separator d-inline-block mx-1">
                      -
                    </span>
                    <strong>
                      {
                        // getformattedPrice(item.price)
                        getformattedPrice(item.priceTo as number)
                      }
                    </strong>
                  </div>
                )}
              {(Number(item.priceFrom) > 0 && !isNaN(Number(item.priceTo)) && item.priceTo !== undefined) && (
                <div className="price">
                  <strong>
                    {
                      // getformattedPrice(item.price)
                      getformattedPrice(item.priceFrom)
                    }
                  </strong>
                </div>
              )}
              {(Number(item.priceFrom) === 0 || !item.priceFrom) && (!item.priceTo || Number(item.priceTo) === 0) && (
                <div className="price">
                  <strong>
                    {
                      // getformattedPrice(item.price)
                      "TBD"
                    }
                  </strong>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
