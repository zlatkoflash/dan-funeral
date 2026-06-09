import Link from "next/link";
import ZStars from "../stars/ZStars";
import { FriendlyDates } from "@/utils/strings";
import { useAuth } from "@/ContextProvider/AuthProviderWrap";

/*export interface IProductReviewsFeedback {
  stars: number;
  paragraph: string;
  clientNameLoc: string;
  date: string;
  verified: boolean;
}*/

export interface IListingReview {
  id: number;
  listing_id: number;
  review_date: string; // ISO string format from datetime
  /**
   * @min 1
   * @max 5
   */
  rating: number;
  reviewer_name: string;
  reviewer_place: string | null; // NULL in DB
  is_verified_review: boolean; // tinyint(1) mapping to boolean
  reviewer_email: string | null; // NULL in DB
  comment: string | null; // NULL in DB
}

export interface IProductReviews {
  onSeeMoreClicked?: () => void;
  onAddReviewClicked?: () => void;
  rating: number;
  rating_count: number;
  feedbacks: IListingReview[];
  isThereForLoading: boolean;
}

export default function ProductReviews(data: IProductReviews) {
  console.log("ProductReviews data:", data);

  const {user, setShowAuthModal} = useAuth();

  return (
    <section className="product-reviews">
      <div className="heading-content">
        <div className="left-content">
          <h4>Reviews</h4>
          <ZStars
            value={data.rating}
            size="larger"
            showOutOfText={true}
            reviewsCount={data.rating_count}
          />
        </div>
        <div className="right-content">
          <Link
            className="btn btn-dark"
            href={"/"}
            onClick={(e) => {
              e.preventDefault();
              if(user!==null){
                data.onAddReviewClicked?.();
              }
              else{
                setShowAuthModal(true);
              }
            }}
          >
            Write a review
          </Link>
        </div>
      </div>

      <div className="feedback-list">
        {data.feedbacks.map((item, key: number) => {
          return (
            <div
              className="item-feedback"
              key={`itme-feedback-${key}-${Math.random()}`}
            >
              <ZStars value={Number(item.rating)} size="larger" />
              <p>“{item.comment}”</p>
              <div className="footer-feedback">
                <strong className="client-location">
                  {item.reviewer_name}
                </strong>
                {Number(item.is_verified_review) === 1 ? (
                  <span className="verified">Verified review</span>
                ) : (
                  <></>
                )}
                <span className="date">
                  {FriendlyDates(new Date(item.review_date))}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {data.isThereForLoading && (
        <div className="footer-buttons">
          <Link
            href={"/"}
            className="btn-arrow"
            onClick={(e) => {
              e.preventDefault();
              data.onSeeMoreClicked?.();
            }}
          >
            See More
          </Link>
        </div>
      )}
    </section>
  );
}
