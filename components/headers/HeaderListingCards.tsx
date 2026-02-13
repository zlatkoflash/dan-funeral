"use client";

import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";

import theLogo2 from './../../assets/images/logo-height-33.png';
import { IMenuHeaderItem } from "@/app/PagesInterfaces";
import ButtonHamburger from "./ButtonHamburg";
import { useAuth } from "@/ContextProvider/AuthProviderWrap";

import profile_temporary from './../../assets/images/profile-image-example-circle.jpg';
import icon_sign_in from './../../assets/images/icon-sign-in.svg';

export interface IHeaderListingCards {
  menuItems: IMenuHeaderItem[]
}
export default function HeaderListingCards(data: IHeaderListingCards) {

  const { setShowAuthModal, user } = useAuth();

  const { menuItems } = data;

  return <header className="listing-cards">
    <Container>
      <Row>
        <Col className="content-column">

          <Link href={"/"} className="header-logo">
            {/*Gentle Road*/}
            <Image
              src={theLogo2} alt="Gentle Road"
              unoptimized
              priority
            />
          </Link>


          <div className="right-menu">
            <ul className="menu">
              {
                menuItems.map((item) => {
                  return <li key={'menu-item-' + item.slug}>
                    <Link href={"/" + item.slug}>{item.title}</Link>
                  </li>
                })
              }
              {
                user === null ?
                  <li>
                    <Link href={"/"} onClick={(e) => {
                      e.preventDefault();
                      setShowAuthModal(true);
                    }}>
                      <Image className="icon-sign-in" src={icon_sign_in} alt="Sign In" width={50} height={50} />
                      Login
                    </Link>
                  </li>
                  :
                  <li>
                    <Link className="profile-photo-link" href={"/Dashboard/MyProfile"}>
                      <Image src={user?.profile_photo !== "" && user?.profile_photo !== null && user?.profile_photo !== undefined ? user?.profile_photo : profile_temporary} alt="Profile Photo" width={50} height={50} />
                    </Link>
                  </li>
              }
            </ul>

            <div className="buttons-holder">
              <Link href={"/Dashboard/MyListing"} className="btn btn-success">List Your Business </Link>
            </div>


          </div>

          <ButtonHamburger />
        </Col>
      </Row>
    </Container>

    {
      // <div className="line-divider-headeing"></div>
    }

  </header>
}