import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";

export default function HeaderListingCards() {
  return <header className="listing-cards">
    <Container>
      <Row>
        <Col className="content-column">
          <Link href={""} className="header-logo">Gentle Road</Link>
          <div className="right-menu">
            <ul className="menu">
              <li>
                <Link href={""}>Find Provides</Link>
              </li>
              <li>
                <Link href={""}>How It Works</Link>
              </li>
              <li>
                <Link href={""}>Resources</Link>
              </li>
              <li>
                <Link href={""}>About</Link>
              </li>
              <li>
                <Link href={""}>Help</Link>
              </li>
            </ul>

            <div className="buttons-holder">
              <Link href={""} className="btn btn-success">List Your Business </Link>
            </div>

          </div>
        </Col>
      </Row>
    </Container>

    {
      // <div className="line-divider-headeing"></div>
    }

  </header>
}