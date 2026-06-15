"use client";

import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
// import theLogo2 from '@/assets/images/logo-height-33.png';
import theLogo2 from '@/assets/images/logo-upper-height-33.png';

import { useAuth } from "@/ContextProvider/AuthProviderWrap";
import profile_temporary from '@/assets/images/profile-image-example-circle.jpg';
import { dashboardSlice } from "@/redux/features/DashboardSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import HeaderProfileButton from "@/components/headers/HeaderProfileButton";
import ButtonHamburger from "@/components/headers/ButtonHamburg";
import { title } from "process";

export default function DashboardHeader() {

  const {
    user
  } = useAuth();

  const dispatch = useAppDispatch();
  const modalShow_ProfileDetails = useAppSelector((state: RootState) => state.dashboard);

  const menuItems = [
    {
      slug: "/DashboardV2/EditBusiness",
      title: "Business Identity"
    },
    {
      slug: "/DashboardV2/EditBusiness/LocationsAndCategories",
      title: "Location & Categories"
    },
    {
      slug: "/DashboardV2/EditBusiness/MediaGallery",
      title: "Media Gallery"
    },
    {
      slug: "/DashboardV2/EditBusiness/ServicesAndPrices",
      title: "Services & Prices"
    },
    {
      slug: "/DashboardV2/EditBusiness/QuestionsAndAnswers",
      title: "Questions & Answers"
    },
    {
      slug: "/DashboardV2/EditBusiness/BusinessHours",
      title: "Business Hours"
    }
  ];

  return (
    <>
      <header className="listing-cards">
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
                      return <li key={'menu-item-' + item.slug} className="show-only-in-mobile">
                        <Link href={"/" + item.slug}>{item.title}</Link>
                      </li>
                    })
                  }
                  {
                    /*user === null ?
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
                      </li>*/
                  }
                  <li>
                    {
                      /*<Link className="profile-photo-link" href={"/Dashboard/MyProfile"} onClick={(e) => {
                      e.preventDefault();
                      dispatch(dashboardSlice.actions.setModalShow_ProfileDetails({
                        show: true,
                        type: modalShow_ProfileDetails.modalShow_ProfileDetails.type
                      }));
                    }}>
                      <Image src={user?.profile_photo !== "" && user?.profile_photo !== null && user?.profile_photo !== undefined ? user?.profile_photo : profile_temporary} alt="Profile Photo" width={50} height={50} />
                      <span>{user?.display_name}</span>
                    </Link>*/
                    }
                    <HeaderProfileButton />
                  </li>
                </ul>

                {
                  /*<div className="buttons-holder">
                  <Link href={"/Dashboard/MyListing"} className="btn btn-success">List Your Business </Link>
                </div>*/
                }


              </div>

              {
                // <ButtonHamburger />
              }
              <ButtonHamburger />
            </Col>
          </Row>
        </Container>

        {
          // <div className="line-divider-headeing"></div>
        }

      </header>
    </>
  )
}