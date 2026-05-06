"use client";

import PhotosEditor, { IFileDetailsV2 } from "@/app/DashboardV2/DashboardComponents/PhotosEditor/PhotosEditor";
import VideosEditor, { IVideoDetails } from "@/app/DashboardV2/DashboardComponents/VideosEditor/VideosEditor";
import ZProgressBar from "@/components/zprogressbar/ZProgressBar";
import { useAuth } from "@/ContextProvider/AuthProviderWrap";
import { getApiData } from "@/utils/api";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

export default function BusinessMedia() {

  const { user } = useAuth();

  if (user === null) return <></>;

  const countTotalPhotos = user.defaultListing.counts.photos;
  const countTotalUsedPhotosSlots = user.defaultListing.counts_used.photos;
  const countTotalVideos = user.defaultListing.counts.videos;
  const countTotalUsedVideosSlots = user.defaultListing.counts_used.videos;

  // const progressPhotos = Math.round((countTotalUsedPhotosSlots / countTotalPhotos) * 100);
  // const progressVideos = Math.round((countTotalUsedVideosSlots / countTotalVideos) * 100);


  const [photos, setPhotos] = useState<IFileDetailsV2[]>([]);
  const progressPhotos = () => {

    return Math.round((photos.length / countTotalPhotos) * 100);

  }

  const [videos, setVideos] = useState<IVideoDetails[]>([]);
  const progressVideos = () => {
    return Math.round((videos.length / countTotalVideos) * 100);
  }


  const [loading, setLoading] = useState(false);

  const SaveThePhotosDetails = async () => {
    setLoading(true)
    const resultsSaving = await getApiData("/listings/UPDATE_UploadPhotoFile_Details", "POST", {
      listing_id: user.defaultListing.id,
      photos: photos
    }, "authorize", "application/json");
    console.log("resultsSaving:", resultsSaving);
    setLoading(false)
  }
  const SaveTheVideosDetails = async () => {
    setLoading(true)
    const resultsSaving = await getApiData("/listings/UPDATE_UploadVideoFile_Details", "POST", {
      listing_id: user.defaultListing.id,
      videos: videos
    }, "authorize", "application/json");
    console.log("resultsSaving:", resultsSaving);
    setLoading(false)
  }
  const ___Save = async () => {
    setLoading(true);
    await SaveThePhotosDetails();
    await SaveTheVideosDetails();
    setLoading(false);
  }

  return <>
    <div className="panel-content-wrap">


      <div className="heading">
        <h3>Media Gallery</h3>
        <p>Photos and videos help families feel comfortable before they visit. Quality media increases enquiries.</p>
      </div>


      <section className="dashboard-sidebar-menu">
        {
          /*<div className="box-cell-content">
          <div className="title">Plan Usage</div>
        </div>*/
        }

        <div className="box-cell-content">
          <ZProgressBar
            progress={progressPhotos()}
            variant={progressPhotos() >= 100 ? 'warning' : 'success'}
            labels={{
              start: "Photos",
              end: `${photos.length}/${countTotalPhotos}`
            }}
          />
        </div>

        {
          countTotalVideos > 0 && (
            <div className="box-cell-content">
              <ZProgressBar
                progress={progressVideos()}
                variant="success"
                labels={{
                  start: "Video",
                  end: `${videos.length}/${countTotalVideos}`
                }}
              />
            </div>
          )
        }

      </section>


      <form onSubmit={() => { }} className="form-dashboard">
        <Container>

          <Row>
            <Col>
              <PhotosEditor onCHangePhotos={(photos) => {
                console.log("Photos: ", photos);
                setPhotos(photos);
                // SaveThePhotosDetails();
              }} />
            </Col>
          </Row>

          <Row>
            <Col>
              <VideosEditor
                onChangeVideos={(videos) => {
                  console.log("Videos: ", videos);
                  setVideos(videos);
                  // SaveTheVideosDetails();
                }}
              />
            </Col>
          </Row>

          <Row className="row-buttons">
            <Col>
              <Button variant="light" type="button" className={loading ? "loading" : ""} onClick={() => {
                ___Save()
              }}>
                Save The Draft
              </Button>

              <Button variant="success" type="button" className={loading ? "loading" : ""} onClick={() => {
                ___Save()
              }}>
                Save & Continue
              </Button>
            </Col>
          </Row>
        </Container>
      </form>

    </div>
  </>
}