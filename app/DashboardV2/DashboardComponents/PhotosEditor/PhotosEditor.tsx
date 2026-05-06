"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import exammple_thumbnail from '@/assets/images/gallery-1.jpg';
import icon_lock_green from '@/assets/images/icon-lock-green.svg';
import placeholder from "@/assets/images/placeholder.svg";
import { useAuth } from "@/ContextProvider/AuthProviderWrap";
import PhotoEditorAttachFiles from "./PhotoEditorAttachFiles";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { dashboardSlice } from "@/redux/features/DashboardSlice";
import { getApiData } from "@/utils/api";

export interface IFileDetailsV2 {
  status: boolean;
  message: string;
  /** The sanitized, randomized filename (e.g., peaceful-funeral-home-in-chicago-2-10e8...jpg) */
  filename: string;
  /** * Internal server file path. 
   * Note: Useful for server-side cleanup/unlinking, but usually ignored by the Next.js frontend.
   */
  path: string;
  /** The public-facing URL to be used in the src of your <Image /> component or saved to ACF */
  url: string;
}

export default function PhotosEditor(
  {
    onCHangePhotos
  }
    :
    {
      onCHangePhotos: (photos: IFileDetailsV2[]) => void
    }
) {

  const { user } = useAuth();

  if (user === null) return <></>;

  const countTotalPhotos = user.defaultListing.counts.photos;
  const countTotalUsedPhotosSlots = user.defaultListing.counts_used.photos;

  const [photos, setPhotos] = useState<IFileDetailsV2[]>([]);

  useEffect(() => {
    onCHangePhotos(photos);
  }, [photos, onCHangePhotos]);

  const ___LoadThePhotos = async () => {
    // get api data 
    const result_loading_photo_details = await getApiData<{
      ok: boolean,
      result_loading_photo_details: IFileDetailsV2[]
    }>("/listings/GET_PhotoDetails", "POST", { listing_id: user.defaultListing.id }, "authorize");
    console.log("result_loading_photo_details:", result_loading_photo_details);
    console.log("result_loading_photo_details:", result_loading_photo_details);

    if (result_loading_photo_details.ok === true) {
      setPhotos(result_loading_photo_details.result_loading_photo_details);
    }

  }

  const ___DeleteThePhoto = async (photo: IFileDetailsV2) => {
    console.log("delete the photo: ", photo);
    setPhotos((prevPhotos) => prevPhotos.filter((p) => p.filename !== photo.filename));
    onCHangePhotos(photos.filter((p) => p.filename !== photo.filename));
  }

  useEffect(() => {
    // console.log("Total Photos: ", photos.length);
    ___LoadThePhotos();
  }, []);


  const dashboardState = useAppSelector((state) => state.dashboard);
  const dispatch = useAppDispatch()

  return <>
    <div className="media-editor text-input-wrap">
      <label htmlFor="photos" className="form-label">Photos</label>
      <div className="media-editor-grid">
        {
          photos.map((photo, index) => (
            <div key={index} className="media-editor-grid-item">
              <Image src={photo.url} alt="photo" width={310} height={310} />
              <button type="button" className="z-btn-close" onClick={() => {
                ___DeleteThePhoto(photo);
              }} />
            </div>
          ))
        }

        {
          (
            photos.length >= countTotalPhotos && user.defaultListing.planType !== "premium"
          ) && <div className="media-editor-grid-item add-photo-item" onClick={() => {
            dispatch(dashboardSlice.actions.setModalUpgradePlanShow({
              show: true,
              type: "photos-count-reached-content"
            }))
          }}>
            <div className="add-photo-control">
              <div className="locked-icon">
                <div className="icon">
                  <img src={icon_lock_green.src} alt="lock" />
                </div>
                <span>Locked</span>
              </div>
            </div>
          </div>
        }

        {
          photos.length < countTotalPhotos && <PhotoEditorAttachFiles
            photos={photos}
            onUploadingFile={(photo) => {
              console.log("Last uploaded photo: ", photo);
              /*setPhotos([...photos, photo]);
              onCHangePhotos([...photos, photo]);*/

              // 1. Update local state using the functional 'prev' pattern
              setPhotos((prevPhotos) => {
                const updatedPhotos = [...prevPhotos, photo];

                // 2. Trigger the callback with the NEWly created array
                // onCHangePhotos(updatedPhotos);

                return updatedPhotos;
              });

            }} />
        }





      </div>
    </div>
  </>
}