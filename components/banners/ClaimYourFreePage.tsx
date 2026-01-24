"use client";

import { useAuth } from "@/ContextProvider/AuthProviderWrap";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";

export interface IClaimYourFreePage {
  paragraph_lead: string,
  title: string,
  description: string, // textarea paragraphs <p></p>
  list_items: string, // textarea with <br>
}

export default function ClaimYourFreePage(data: IClaimYourFreePage) {

  const {
    paragraph_lead,
    title,
    description,
    list_items
  } = data;

  const {
    user,
    showAuthModal,
    setShowAuthModal
  } = useAuth();

  return <section className="claim-your-free-page">
    <Container>
      <Row>
        <Col>

          <div className="heading-content">
            {/*<p className="lead">Claim your free page</p>
            <h2>Establish Comfort and Trust for Families</h2>*/}
            <p className="lead">{paragraph_lead}</p>
            <h2>{title}</h2>
          </div>

          <div className="white-content-wrap">
            <div className="description" dangerouslySetInnerHTML={{ __html: description }}>
              {/*<p>Families and loved ones visit Gentle Road every day to find compassionate funeral and memorial services, supportive venues, and resources. </p>

              <p>Connect with these families, help them find solace, and manage your Gentle Road page all for free. Gentle Road was built to help families, but also to help businesses like yours.</p>*/}
            </div>

            <ul className="list-items">
              {/*<li>Update your service information so families can easily find and trust you.</li>
              <li>Respond to family inquiries and messages with care as they come in.</li>
              <li>Add photos to highlight the warmth and support your services provide.</li>*/}
              {
                list_items.split("<br />").map((item, index) => {
                  if (item !== "" && item !== undefined && item !== null) {
                    return <li key={`list-item-${index}`}>{item}</li>
                  }
                  return <></>
                })
              }
            </ul>

            <div className="buttons-footer">
              <Link href={"/Dashboard"} className="btn btn-success" onClick={(e) => {

                if (user === null) {
                  e.preventDefault();
                  setShowAuthModal(true);
                }
                else { }
              }}>
                Claim My Free Business Listing
              </Link>
            </div>

          </div>

        </Col>
      </Row>
    </Container>
  </section>
}