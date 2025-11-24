import Link from "next/link";
import ZStars from "../stars/ZStars";

export interface IProductReviews {
  feedbacks: {
    stars: number,
    paragraph: string,
    clientNameLoc: string,
    date: string,
    verified: boolean
  }[]
}

export default function ProductReviews(data: IProductReviews) {
  return <section className="product-reviews">
    <div className="heading-content">
      <div className="left-content">
        <h4>Reviews</h4>
        <ZStars value={5} size="larger" showOutOfText={true} reviewsCount={12} />
      </div>
      <div className="right-content">
        <Link className="btn btn-dark" href={"/"}>Write a review</Link>
      </div>
    </div>


    <div className="feedback-list">
      {
        data.feedbacks.map((item, key: number) => {
          return <div className="item-feedback" key={`itme-feedback-${key}-${Math.random()}`}>
            <ZStars value={item.stars} size="larger" />
            <p>“{item.paragraph}”</p>
            <div className="footer-feedback">
              <strong className="client-location">
                {item.clientNameLoc}
              </strong>
              {
                item.verified ?
                  <span className="verified">
                    Verified review
                  </span>
                  :
                  <></>
              }
              <span className="date">{item.date}</span>
            </div>
          </div>
        })
      }
    </div>

    <div className="footer-buttons">
      <Link href={"/"} className="btn-arrow">
        See All
      </Link>
    </div>


  </section>
}