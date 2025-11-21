import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";

import socialLinkedIn from './../../assets/images/social-linkedin.svg';
import socialX from './../../assets/images/social-x.svg';
import socialYoutube from './../../assets/images/social-youtube.svg';
import socialFacebook from './../../assets/images/social-facebook.svg';


export default function FooterLanding() {
  return <footer className="footer-landing">
    <Container>
      <Row>
        <Col>
          <div className="menu-wrap">
            <div className="left-wrap">
              <Link href={""} className="footer-logo">Gentle Road</Link>
            </div>
            <ul className="menu">
              <li>
                <Link href={""}>About</Link>
              </li>
              <li>
                <Link href={""}>Contact</Link>
              </li>
              <li>
                <Link href={""}>FAQs</Link>
              </li>
              <li>
                <Link href={""}>Privacy Policy</Link>
              </li>
              <li>
                <Link href={""}>Terms of Service</Link>
              </li>
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