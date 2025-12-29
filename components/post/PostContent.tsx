'use client';

import Image from "next/image";
import { Button, Col, Container, Row } from "react-bootstrap";


import profileImage from './../../assets/images/jony.jpg';
import featuredImage from './../../assets/images/pricing-hero.jpg';
import Link from "next/link";
import { useState } from "react";
import ZButtonShare from "../forms/ZButtonShare";

export interface IPostContent {
  intro: {
    title: string,
    paragraph: string,
    profile?: {
      photo: any,
      name: string,
      postUpdateDate: string
    }
  },

  featuredImage?: any,

  contentItems?: string[],
  contentHTMLPage?: string
}

export default function PostContent(data: IPostContent) {

  const [selectedIndexContent, set_selectedIndexContent] = useState(0);

  return <section className="post-content">
    <Container>
      <Row>
        <Col>

          <div className="heading-intro">
            <h1>{data.intro.title}</h1>
            <p dangerouslySetInnerHTML={{ __html: data.intro.paragraph }} />
            {
              data.intro.profile !== undefined && (<div className="user-editor">
                <Image src={data.intro.profile.photo ? data.intro.profile.photo : profileImage} alt={data.intro.profile.name} width={1920} height={800} />
                <div className="user-editor-content">
                  <div className="name">{data.intro.profile.name}</div>
                  <div className="date">{data.intro.profile.postUpdateDate}</div>
                </div>
              </div>)
            }

          </div>

          {
            data.featuredImage !== undefined && data.featuredImage !== "" && data.featuredImage !== null && data.featuredImage !== false && (<div className="featured-illustration">
              <Image src={data.featuredImage !== undefined ? data.featuredImage : featuredImage} alt={data.intro.title} width={1200} height={500} />
            </div>)
          }

          {
            data.contentItems !== undefined && data.contentItems.length > 0 && (<div className="content-items-wrap">
              {
                data.contentItems.map((itemContent, key: number) => {
                  return <div id={`content-${key}`} className="item-content" key={`item-content-${key}`} dangerouslySetInnerHTML={{ __html: itemContent }} />
                })
              }
            </div>)
          }

          {
            data.contentHTMLPage !== undefined && data.contentHTMLPage !== "" && (<div className="content-items-wrap"><div className="item-content" dangerouslySetInnerHTML={{ __html: data.contentHTMLPage }} /></div>)
          }




        </Col>
      </Row>

      <Row>
        <Col>
          <div className="share-post-wrap">
            <ZButtonShare />
          </div>
        </Col>
      </Row>

    </Container>

    {
      data.contentItems !== undefined && data.contentItems.length > 0 && (<div className="post-content-navigation">
        <ul>
          {
            data.contentItems.map((itemContent, key: number) => {
              return <li className="item-nav-for-section" key={`item-content-${key}`} >
                <Link href={`#content-${key}`} className={key === selectedIndexContent ? `active` : ''} onClick={(e) => {
                  set_selectedIndexContent(key)
                }}></Link>
              </li>
            })
          }
        </ul>
      </div>)
    }


  </section>
}