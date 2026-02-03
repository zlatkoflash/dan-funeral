"use client";

import Image from 'next/image';

import Link from 'next/link';
import HeadingTitleParagraph, { IHeadingTitleParagraph } from '../headings/HeadingTitleParagraph';
import { useMyLocation } from '@/ContextProvider/LocationProvider';
import { SlugifyThePartOfTheURL } from '@/utils/listing';


export interface IX3DirectoriesPanels {
  type: 'home-page' | 'marketing-page',
  heading: IHeadingTitleParagraph,
  pages: {
    src: any,
    title: string,
    link: string,
    type?: 'home-page' | 'marketing-page',
    paragrpah?: string,
    btnDirLabel?: string,
    post_title?: string,
    post_name: string,
    feature_image: string
    post_excerpt: string,
    // btnDirLink?: string
  }[]
}

export default function X3DirectoriesPanels(data: IX3DirectoriesPanels) {

  const {
    city,
    zip,
    country,
    isp,
    loading,
  } = useMyLocation();

  console.log("X3DirectoriesPanels data:", data);

  /*const data: {
    src: any,
    title: string,
    link: string
  }[] = [
      {
        src: help1,
        title: "Search for your city  ",
        link: "",
      },
      {
        src: help2,
        title: "Compare trusted providers",
        link: "",
      },
      {
        src: help3,
        title: "Connect directly for guidance  ",
        link: "",
      },
    ];*/

  return <section className="x3-directories-panels">

    {/*<HeadingTitleParagraph

      show={true}

      title='How Gentle Road Helps You'
      paragraph='We simplify the planning process in three easy steps.'
    />*/}
    <HeadingTitleParagraph
      {...data.heading}
    />

    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="wrap-white-box">
            <div className="content-inner">


              <div className="grid-panels">
                {
                  data.pages.map((page, key: number) => {
                    return <div className="directory-item" key={`directory-item-${key}`}>


                      <div className="button-holder">
                        <Link
                          // href={`/${page.post_name}`} 
                          href={`/find-providers${city && city !== "" ? `/${SlugifyThePartOfTheURL(city)}` : ''}`}
                          className='btn btn-dark'>
                          {
                            page.btnDirLabel !== undefined ?
                              page.btnDirLabel
                              :
                              "View Directory"
                          }
                        </Link>
                      </div>

                      {
                        // photo-content will be absolute and over the button holder
                      }
                      <div className="photo-content">
                        <div className="image">
                          <Image src={page.feature_image} alt={page.post_title as string} width={327} height={402} />
                        </div>

                        {
                          data.type === 'home-page' || data.type === undefined ?
                            <div className="the-title">
                              <div className="number body-lg">0{key + 1}</div>
                              <div className="title body-lg">{page.post_title}</div>
                            </div>
                            :
                            <></>
                        }
                        {
                          data.type === 'marketing-page' ?
                            <div className="the-title">
                              <div className={`title body-lg ${data.type}`}>
                                <h5>{page.post_title}</h5>
                                {
                                  page.post_excerpt !== undefined && page.post_excerpt !== '' ?
                                    <p>{page.post_excerpt}</p>
                                    :
                                    <></>
                                }
                              </div>
                            </div>
                            :
                            <></>
                        }

                        {
                          data.type === "marketing-page" ?
                            <div className="number-marketing">0{key + 1}</div>
                            :
                            <></>
                        }

                      </div>





                    </div>
                  })
                }
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
}