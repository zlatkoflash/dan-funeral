"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import exammple_thumbnail from "@/assets/images/gallery-1.jpg";
import { Button } from "react-bootstrap";
import icon_lock_green from "@/assets/images/icon-lock-green.svg";
import icon_lock_white from "@/assets/images/icon-lock-white.svg";
import { useAppDispatch } from "@/redux/hooks";
import { dashboardSlice } from "@/redux/features/DashboardSlice";
import { useAuth } from "@/ContextProvider/AuthProviderWrap";
import VideosEditorAttachFiles from "./VideosEditorAttachFiles";
import { IFileDetailsV2 } from "../PhotosEditor/PhotosEditor";
import { getApiData } from "@/utils/api";

export interface IVideoDetails {
  type: "youtube_id" | "mp4";
  youtube_id?: string;

  // it contain the same details for the IFileDetailsV2
  mp4_file: IFileDetailsV2;
}

export default function VideosEditor({
  // videos,
  onChangeVideos,
}: {
  // videos: IVideoDetails[],
  onChangeVideos: (videos: IVideoDetails[]) => void;
}) {
  // const r:IFileDetailsV2 = null;

  const { user } = useAuth();

  if (user === null) return <></>;

  const [videos, setVideos] = useState<IVideoDetails[]>([]);

  const dispatch = useAppDispatch();

  const ___DeleteTheVideo = (video: IVideoDetails) => {
    console.log("Delete the video: ", video);

    setVideos((prevVideos) =>
      prevVideos.filter((v) => v.mp4_file.url !== video.mp4_file.url),
    );
  };

  const __LOadTheVideos = async () => {
    const result = await getApiData<{
      ok: boolean;
      media_gallery_videos: IVideoDetails[];
    }>(
      "/listings/GetVideosDetails",
      "POST",
      { listing_id: user.defaultListing.id },
      "authorize",
    );
    console.log("result videos:", result);

    if (result.ok && result.media_gallery_videos) {
      setVideos(result.media_gallery_videos);
    }
  };

  useEffect(() => {
    __LOadTheVideos();
  }, []);

  useEffect(() => {
    onChangeVideos(videos);
  }, [videos, onChangeVideos]);

  return (
    <>
      <div className="media-editor text-input-wrap">
        {user?.defaultListing.planType !== "basic" && (
          <>
            <label htmlFor="videos" className="form-label">
              Videos
            </label>
            <div className="media-editor-grid">
              {videos.map((video, index) => (
                <div key={index} className="media-editor-grid-item">
                  {/* <Image src={exammple_thumbnail} alt="video" width={310} height={310} /> */}
                  {/* <video src={video.mp4_file.url} alt="video" width={310} height={310} /> */}
                  <video src={video.mp4_file.url} controls></video>

                  <button
                    type="button"
                    className="z-btn-close"
                    onClick={() => {
                      ___DeleteTheVideo(video);
                    }}
                  />
                </div>
              ))}

              {user.defaultListing.planType === "standard" &&
                videos.length >= user.defaultListing.counts.videos && (
                  <div
                    className="media-editor-grid-item add-photo-item"
                    onClick={() => {
                      dispatch(
                        dashboardSlice.actions.setModalUpgradePlanShow({
                          show: true,
                          type: "videos-count-reached-content-for-standard",
                        }),
                      );
                    }}
                  >
                    <div className="add-photo-control">
                      <div className="locked-icon">
                        <div className="icon">
                          <img src={icon_lock_green.src} alt="lock" />
                        </div>
                        <span>Locked</span>
                      </div>
                    </div>
                  </div>
                )}

              {videos.length < user.defaultListing.counts.videos && (
                <VideosEditorAttachFiles
                  onUploadingFile={(video) => {
                    setVideos((prevVideos) => [...prevVideos, video]);
                  }}
                  videos={videos}
                />
              )}
            </div>
          </>
        )}

        {user?.defaultListing.planType === "basic" && (
          <div className="video-editor-locked">
            <div className="icon">
              <img src={icon_lock_white.src} alt="lock" />
            </div>
            <div className="h4">Video header is locked on Basic.</div>
            <div className="buttons">
              <Button
                variant="warning"
                type="button"
                onClick={() => {
                  dispatch(
                    dashboardSlice.actions.setModalUpgradePlanShow({
                      show: true,
                      type: "videos-upload-available-after-basic",
                    }),
                  );
                }}
              >
                Unlock
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
