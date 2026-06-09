"use client";

import { Button, Col, Container, Modal, ModalBody, Row } from "react-bootstrap";
import TextInput, { TextInputSelect } from "../forms/Input";
import { useState } from "react";
import { getApiData } from "@/utils/api";
import { useMyListing } from "@/app/Dashboard/MyListing/AddNewListing/MyListingProviderEditor";
import { IListingReview } from "./ProductReviews";

export default function ProductReviewAddModal({
  show,
  onClose,
  onAfterAddedReview,
}: {
  show: boolean;
  onClose: () => void;
  onAfterAddedReview: (review: IListingReview) => void;
}) {
  const { listing } = useMyListing();

  const [rating, setRating] = useState<number | string>("");
  const [reviewerName, setReviewerName] = useState("");
  const [reviewerEmail, setReviewerEmail] = useState("");
  const [reviewerPlace, setReviewerPlace] = useState("");
  const [review, setReview] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const __SubmitReview = async () => {
    setLoading(true);
    setError("");

    // TODO: Implement API call to submit review
    const result = await getApiData<{
      ok: boolean;
      latest_added: IListingReview;
      message: string;
      errorJson500: {
        message: string;
      };
      status: number;
    }>(
      "/listings/AddReview",
      "POST",
      {
        listing_id: listing.id,
        rating,
        reviewerName,
        reviewerEmail,
        reviewerPlace,
        review,
      },
      "authorize",
      "application/json",
    );

    if (result.ok !== true) {
      if (result.status === 500) {
        setError(result.errorJson500.message);
      } else setError(result.message);
    } else {
      onAfterAddedReview(result.latest_added);
      onClose();
      setRating("");
      setReviewerName("");
      setReviewerEmail("");
      setReviewerPlace("");
      setReview("");
    }
    setLoading(false);

    console.log("result:", result);
  };

  return (
    <>
      <Modal
        show={show}
        centered
        // backdrop="static" // User cannot click outside to close
        keyboard={false} // User cannot press Esc to close
        className="modal-z modal-upgrade-plan"
        onHide={() => {
          /*dispatch(
            dashboardSlice.actions.setModalUpgradePlanShow({
              show: false,
              type: "unlock-leads-content",
            }),
          );*/
          onClose();
        }}
      >
        <div className="header-buttons">
          {
            <button
              className="z-btn-close-modal"
              type="button"
              onClick={() => {
                /*dispatch(
                  dashboardSlice.actions.setModalUpgradePlanShow({
                    show: false,
                    type: "unlock-leads-content",
                  }),
                );*/
                onClose();
              }}
            ></button>
          }
        </div>

        <ModalBody className="p-4">
          <div className="content-inner">
            <h2>Add Your Review</h2>
            <p>
              Share your experience with this product to help others make
              informed decisions.
            </p>
            <form onSubmit={() => {}} className="form-dashboard">
              <Container>
                <Row>
                  <Col md={6}>
                    <TextInput
                      id="reviewer-name"
                      label=""
                      onChange={(e) => {
                        setReviewerName(e.target.value);
                      }}
                      type="text"
                      value={reviewerName}
                      placeholder="Your Name *"
                    />
                  </Col>
                  <Col md={6}>
                    <TextInput
                      id="reviewer-email"
                      label=""
                      onChange={(e) => {
                        setReviewerEmail(e.target.value);
                      }}
                      type="text"
                      value={reviewerEmail}
                      placeholder="Your Email *"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <TextInput
                      id="reviewer-place"
                      label=""
                      onChange={(e) => {
                        setReviewerPlace(e.target.value);
                      }}
                      type="text"
                      value={reviewerPlace}
                      placeholder="Your Place"
                    />
                  </Col>
                  <Col md={6}>
                    <TextInput
                      id="reviewer-rating"
                      label=""
                      onChange={(e) => {
                        setRating(Number(e.target.value));
                      }}
                      type="select"
                      value={rating.toString()}
                      placeholder="Your Email"
                      options={[
                        { label: "Select Rating *", value: "" },
                        { label: "Rating 1", value: "1" },
                        { label: "Rating 2", value: "2" },
                        { label: "Rating 3", value: "3" },
                        { label: "Rating 4", value: "4" },
                        { label: "Rating 5", value: "5" },
                      ]}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <TextInput
                      id="review-text"
                      label=""
                      onChange={(e) => {
                        setReview(e.target.value);
                      }}
                      type="textarea"
                      value={review}
                      placeholder="Your Review *"
                    />
                  </Col>
                </Row>

                {error !== "" && (
                  <Row>
                    <Col md={12}>
                      <div className="text-danger">{error}</div>
                    </Col>
                  </Row>
                )}
              </Container>
            </form>
          </div>
          <div className="buttons-wrap">
            <Button
              variant="light"
              onClick={() => {
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button
              variant="warning"
              className={`${loading ? "loading" : ""}`}
              onClick={() => {
                __SubmitReview();
              }}
            >
              Submit The Review
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
