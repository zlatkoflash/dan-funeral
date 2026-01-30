"use client";

import Image from "next/image";
import HeadingTitleParagraph, { IHeadingTitleParagraph } from "../headings/HeadingTitleParagraph";



import Link from "next/link";


import placeholder from './../../assets/images/placeholder.svg';
import { useState } from "react";
import { getApiData } from "@/utils/api";


export interface IGuidsGrid {
  heading: IHeadingTitleParagraph,
  found_posts?: number,
  load_more_posts?: boolean,
  categories_ids?: number[],
  items: {
    src: any,
    title: string,
    paragraph: string,
    readmorelink: string,

    post_name: string,
    post_title: string,
    acf: {
      featured_thumbnail: string,
      paragraph: string
    }
  }[];
}


export default function GuidsGrid(data: IGuidsGrid) {


  const [items, set_items] = useState<any[]>(data.items);
  const [loading, set_loading] = useState<boolean>(false);

  const ____LoadMorePosts = async () => {
    set_loading(true);
    const newPostsData = await getApiData<{
      ok: boolean,
      items: any[],
    }>("/get-posts-by-categories-ids", "POST", {
      categories_ids: data.categories_ids,
      offset: items.length
    }, "not-authorize", "application/json");
    console.log("newPostsData:", newPostsData);
    set_loading(false);
    if (newPostsData.ok) {
      set_items([...items, ...newPostsData.items]);
    }
  }

  return <section className="guids-grid">

    <HeadingTitleParagraph
      // show={true}
      // title="Guides to Help You Plan with Confidence"
      // paragraph="Explore our most-read resources — simple, compassionate guides to help you make informed decisions and find peace of mind at every step."
      {...data.heading}
      show={true}
    />

    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="grid-wrap">
            <div className="grid">
              {
                items.map((itemData, key: number) => {
                  return <div className="guid-item" key={`guid-item-${key}`}>
                    <div className="image-title-wrap">
                      <div className="image">
                        <Image src={

                          itemData.acf.featured_thumbnail !== "" && itemData.acf.featured_thumbnail !== null && itemData.acf.featured_thumbnail !== undefined ? itemData.acf.featured_thumbnail : placeholder

                        } alt={itemData.post_title} width={315} height={210} />
                      </div>
                      <p className="title body-lg">
                        {
                          itemData.post_title
                        }
                      </p>
                    </div>
                    <p className="description body-md" dangerouslySetInnerHTML={{ __html: itemData.acf.paragraph }} />
                    <div className="link-wrap">
                      <Link className="btn-read-more" href={`/resources/${itemData.post_name}`}>Read More</Link>
                    </div>
                  </div>
                })
              }
            </div>

            {
              items.length < (data.found_posts as number) && data.load_more_posts && <div className="load-more-button-wrap">
                <button type="button" className={`btn btn-success ${loading ? "loading" : ""}`} onClick={() => {
                  ____LoadMorePosts();
                }}>Load More</button>


              </div>
            }

          </div>
        </div>
      </div>
    </div>
  </section>
}