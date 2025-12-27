import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";

import theLogo2 from './../../assets/images/logo-height-33.png';
import { IMenuHeaderItem } from "@/app/PagesInterfaces";
import ButtonHamburger from "./ButtonHamburg";

export interface IHeaderListingCards {
  menuItems: IMenuHeaderItem[]
}
export default function HeaderListingCards(data: IHeaderListingCards) {
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