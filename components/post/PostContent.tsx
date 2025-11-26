'use client';

import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";


import profileImage from './../../assets/images/jony.jpg';
import featuredImage from './../../assets/images/pricing-hero.jpg';
import Link from "next/link";
import { useState } from "react";

export interface IPostContent {
  intro: {
    title: string,
    paragraph: string,
    profile: {
      photo: any,
      name: string,
      postUpdateDate: string
    }
  },

  featuredImage: any,

  contentItems: string[]
}

export default function PostContent(data: IPostContent) {

  const [selectedIndexContent, set_selectedIndexContent] = useState(0);

  return <section className="post-content">
    <Container>
      <Row>
        <Col>

          <div className="heading-intro">
            <h1>{data.intro.title}</h1>
            <p>{data.intro.paragraph}</p>
            <div className="user-editor">
              <Image src={data.intro.profile.photo !== undefined ? data.intro.profile.photo : profileImage} alt={data.intro.profile.name} />
              <div className="user-editor-content">
                <div className="name">{data.intro.profile.name}</div>
                <div className="date">{data.intro.profile.postUpdateDate}</div>
              </div>
            </div>
          </div>

          <div className="featured-illustration">
            <Image src={data.featuredImage !== undefined ? data.featuredImage : featuredImage} alt={data.intro.title} />
          </div>

          <div className="content-items-wrap">
            {
              data.contentItems.map((itemContent, key: number) => {
                return <div id={`content-${key}`} className="item-content" key={`item-content-${key}`} dangerouslySetInnerHTML={{ __html: itemContent }} />
              })
            }
          </div>

        </Col>
      </Row>
    </Container>

    <div className="post-content-navigation">
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
    </div>

  </section>
}