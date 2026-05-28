"use client";

import { useMyListing } from "@/app/Dashboard/MyListing/AddNewListing/MyListingProviderEditor";
import Link from "next/link";
import ZDropdown from "../forms/ZDropdown";
import { useState } from "react";

export default function ProductAboutVideoPlayer() {
  const { listing } = useMyListing();

  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

  // Dynamically pull the video source or fallback to an empty string
  const videoSrc =
    listing?.media_gallery_videos?.[selectedVideoIndex]?.mp4_file?.url || "";
  console.log("listing?.media_gallery_videos:", listing?.media_gallery_videos);

  return (
    <section className="product-about video-player container my-4 max-w-4xl">
      <div className="heading-video-index-selecting">
        <ZDropdown
          variant="dropdown-for-sort"
          data={listing?.media_gallery_videos?.map((video, index) => ({
            value: index.toString(),
            text: `Video ${index + 1}`,
          }))}
          value={selectedVideoIndex.toString()}
          onChange={(value) => {
            // Handle video index change if needed
            setSelectedVideoIndex(Number(value));
          }}
        />
      </div>

      {videoSrc ? (
        /* Bootstrap 5 Ratio component for standard 16:9 widescreen */
        <div className="ratio ratio-16x9 rounded shadow-sm overflow-hidden bg-black">
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        /* Clean placeholder card fallback if no video is present */
        <div className="card text-center border-secondary border-dashed bg-light py-5 px-3">
          <div className="card-body d-flex flex-column align-items-center justify-content-center">
            <svg
              className="text-muted mb-3"
              width="48"
              height="48"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              style={{ opacity: 0.6 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="card-text text-muted small mb-0">
              No video uploaded for this listing yet.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
