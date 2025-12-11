import { Col, Container, Row } from "react-bootstrap";

export interface IOurStory {
  storycontent: string,
  quote: string,
  image?: any,
  author: string,
  heading: IHeadingTitleParagraph
}

import ourStoryIllustration from './../../assets/images/pricing-hero.jpg';
import Image from "next/image";
import HeadingTitleParagraph, { IHeadingTitleParagraph } from "../headings/HeadingTitleParagraph";

export default function OurStory(data: IOurStory) {

  /*const story = [
    "Like many, our journey began with the passing of a beloved family member. Amid the grief, we were suddenly expected to be project managers for one of life's most complex and time-sensitive events.",
    "We spent days making dozens of calls, trying to compare services we didn't understand.",
    "The process was tedious, the information was fragmented, and we constantly felt vulnerable to high-pressure sales tactics. We were being over-sold at a time when we were at our lowest.",
    "We just wanted one place to see our options clearly, so we could focus on our family."
  ];

  // The testimonial/quote content
  const testimonial = {
    quote: "I credit three major strategic decisions this year to insights I first encountered in Letterhead—it's like having a brilliant analyst working exclusively for me.",
    author: "Alex Chen, VP of Strategy",
    graveyardImage: "https://placehold.co/800x600/f8f0dc/5c3a21?text=Graveyard+Illustration"
  };*/

  return (
    // Mandatory section tag with the required class "our-story"
    <section className="our-story">
      <Container>
        <Row>
          <Col>

            <HeadingTitleParagraph
              {...data.heading}
              show={true}
            />


            {/* Content Section (Mimicking React Bootstrap Row/Cols) */}
            <div className="content-wrap">

              {/* Left Column: The Story Text */}
              <div className="left-content" dangerouslySetInnerHTML={{ __html: data.storycontent }} />

              {/* Right Column: The Testimonial/Quote Card */}
              <div className="right-content">

                <div className="illustration">
                  <Image src={data.image !== undefined ? data.image : ourStoryIllustration} alt="Our Story" width={1920} height={800} />
                </div>

                <div className="quote-content">
                  <p>
                    {data.quote}
                  </p>
                  <p className="author">
                    {data.author}
                  </p>
                </div>
              </div>

            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}