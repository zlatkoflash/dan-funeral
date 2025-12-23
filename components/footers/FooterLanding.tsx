import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";

import socialLinkedIn from './../../assets/images/social-linkedin.svg';
import socialX from './../../assets/images/social-x.svg';
import socialYoutube from './../../assets/images/social-youtube.svg';
import socialFacebook from './../../assets/images/social-facebook.svg';
import theLogo from './../../assets/images/logo-new-h33.png';
import { IMenuHeaderItem } from "@/app/PagesInterfaces";


export interface IFooterLanding {
  menu_footer_items: IMenuHeaderItem[];
}

export default function FooterLanding(data: IFooterLanding) {

  const { menu_footer_items } = data;

  return <footer className="footer-landing">
    <Container>
      <Row>
        <Col>
          <div className="menu-wrap">
            <div className="left-wrap">
              <Link href={"/"} className="footer-logo">
                <Image src={theLogo} alt="Gentle Road" unoptimized priority />
              </Link>
            </div>
            <ul className="menu">
              {
                menu_footer_items.map((item, index) => (
                  <li key={`menu-item-${index}`}>
                    <Link href={"/" + item.slug}>{item.title}</Link>
                  </li>
                ))
              /*<li>
                <Link href={"/about"}>About</Link>
              </li>
              <li>
                <Link href={"/contact"}>Contact</Link>
              </li>
              <li>
                <Link href={"/faqs"}>FAQs</Link>
              </li>
              <li>
                <Link href={"/privacy-policy"}>Privacy Policy</Link>
              </li>
              <li>
                <Link href={"/terms-of-service"}>Terms of Service</Link>
              </li>*/}
            </ul>
            <div className="right-wrap">
              <ul className="social-icons">
                <li>
                  <Link href="#social" target="_blank">
                    <Image src={socialLinkedIn} alt="LinkedIn" />
                  </Link>
                </li>
                <li>
                  <Link href="#social" target="_blank">
                    <Image src={socialX} alt="X" />
                  </Link>
                </li>
                <li>
                  <Link href="#social" target="_blank">
                    <Image src={socialYoutube} alt="Youtube" />
                  </Link>
                </li>
                <li>
                  <Link href="#social" target="_blank">
                    <Image src={socialFacebook} alt="Facebook" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <hr />
          <div className="coypright-wrap">
            <p>Copyright ©  All rights reserved</p>
          </div>
        </Col>
      </Row>
    </Container>
  </footer>
}