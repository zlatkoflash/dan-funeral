"use client";

import { useMyListing } from "@/app/Dashboard/MyListing/AddNewListing/MyListingProviderEditor";
import ProductReviews, { IListingReview } from "./ProductReviews";
import { useEffect, useState } from "react";
import { getApiData } from "@/utils/api";
import ProductReviewAddModal from "./ProductReviewAddModal";

export default function ProductReviewsWrap() {
  const { listing } = useMyListing();

  const [reviews, setReviews] = useState<IListingReview[]>([]);
  const [isThereForLoading, setIsThereForLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchReviewsLoad = async () => {
    // TODO: Implement API call to fetch reviews
    // For now, using mock data
    const result = await getApiData<{
      ok: boolean;
      reviews: IListingReview[];
      max_count: number;
    }>(
      "/listings/LoadReviews",
      "POST",
      {
        listing_id: listing.id,
        loaded_length: reviews.length,
      },
      "not-authorize",
      "application/json",
    );

    if (result.ok) {
      const newArrayReviews = [...reviews, ...result.reviews];

      setReviews(newArrayReviews);

      if (Number(result.max_count) > newArrayReviews.length) {
        setIsThereForLoading(true);
      } else {
        setIsThereForLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchReviewsLoad();
  }, []);

  return (
    <>
      <ProductReviews
        rating={listing.rating_value}
        rating_count={listing.rating_count}
        feedbacks={reviews}
        onSeeMoreClicked={() => {
          fetchReviewsLoad();
        }}
        onAddReviewClicked={() => {
          // TODO: Open review modal
          setShowModal(true);
        }}
        isThereForLoading={isThereForLoading}
      />

      <ProductReviewAddModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onAfterAddedReview={(review) => {
          // TODO: Add the new review to the list
          console.log("New review added:", review);
          setReviews([review, ...reviews]);
        }}
      />
    </>
  );
}
