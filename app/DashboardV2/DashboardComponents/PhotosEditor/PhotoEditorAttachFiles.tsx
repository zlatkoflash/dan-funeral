import React, { useState, useRef, ChangeEvent } from "react";
import Image from "next/image";
import placeholder from "@/assets/images/placeholder.svg";
import checkSuccess from "@/assets/images/check-success.svg";
import iconCheck from '@/assets/images/circle-green-Icon-check.svg';
import { getApiData } from "@/utils/api";
import { useAuth } from "@/ContextProvider/AuthProviderWrap";
import { IFileDetailsV2 } from "@/app/DashboardV2/DashboardComponents/PhotosEditor/PhotosEditor";
import { getApiDataClient } from "@/utils/apiClient";
import { getAccessToken } from "@/utils/apiServer";

export default function PhotoEditorAttachFiles(
  {
    onUploadingFile,
    photos
  }
    :
    {
      onUploadingFile: (photo: IFileDetailsV2) => void,
      photos: IFileDetailsV2[]
    }
) {

  const { user } = useAuth();

  if (user === null) return <></>;

  const totalPhotos = user.defaultListing.counts.photos;

  const [uploading, setUploading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false); // New state
  const [progress, setProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setIsCompleted(false);
    // setTotalFiles(files.length);
    setTotalFiles(files.length + photos.length > totalPhotos ? totalPhotos - photos.length : files.length);
    setProgress(0);

    // const total_length_allowed = files.length + photos.length;

    for (let i = 0; i < files.length; i++) if (i + photos.length < totalPhotos) {
      setCurrentIndex(i + 1);

      const formData = new FormData();
      formData.append("file", files[i]);
      formData.append("listing_id", user.defaultListing.id.toString())


      try {

        const authToken = await getAccessToken();

        console.log("starting uploading....");
        const resultUploading = await getApiDataClient<{
          ok: boolean,
          result_uploading_file: IFileDetailsV2
        }>("/listings/UPDATE_UploadPhotoFile", "POST", formData, "authorize", "multipart/form-data", authToken as string);
        console.log("resultUploading:", resultUploading);
        if (resultUploading.ok === true) {
          onUploadingFile(resultUploading.result_uploading_file);
        }
      } catch (error) {
        console.error(`Error uploading file ${i + 1}:`, error);
      }

      setProgress(Math.round(i / (files.length) * 100));
      console.log("I loading image:", i);

    }

    setUploading(false);
    setIsCompleted(true); // Mark as finished
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Helper to reset and open picker
  const triggerPicker = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`media-editor-grid-item add-photo-item border rounded d-flex align-items-center justify-content-center p-3 ${uploading ? "pe-none bg-light" : ""
        }`}
      onClick={() => !uploading && fileInputRef.current?.click()}
      style={{
        cursor: uploading ? "wait" : "pointer",
        minHeight: "180px",
        transition: "all 0.3s ease",
        borderColor: isCompleted ? "#198754" : "#dee2e6"
      }}
    >
      <input
        type="file"
        accept="image/png, image/jpeg"
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
        className="d-none"
      />

      <div className="w-100 text-center">
        {uploading ? (
          /* UPLOADING STATE */
          <div className="upload-progress-container px-2">
            <p className="small mb-2 fw-bold text-secondary text-uppercase" style={{ fontSize: "0.75rem" }}>
              Uploading {currentIndex} of {totalFiles}
            </p>
            <div className="progress" style={{ height: "12px" }}>
              <div
                className="progress-bar progress-bar-striped progress-bar-animated bg-success"
                role="progressbar"
                style={{ width: `${progress}%` }}
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              ></div>
            </div>
            <div className="mt-1 small text-muted">{progress}%</div>
          </div>
        ) : isCompleted ? (
          /* COMPLETED STATE */
          <div className="completed-state animate__animated animate__fadeIn">
            <div className="icon mb-2 m-inline-auto" style={{ opacity: 0.7 }}>
              <Image src={iconCheck} alt="placeholder" className="mx-auto" width={48} height={48} />
            </div>
            <h6 className="text-success fw-bold">Upload Complete!</h6>
            <p className="small text-muted mb-2">{totalFiles} images added successfully.</p>
            <button
              className="btn btn-sm btn-success"
              onClick={triggerPicker}
              type="button"
            >
              Upload More
            </button>
          </div>
        ) : (
          /* INITIAL STATE */
          <div className="add-photo-control">
            <div className="locked-icon d-flex flex-column align-items-center">
              <div className="icon mb-2" style={{ opacity: 0.7 }}>
                <Image src={placeholder} alt="placeholder" width={48} height={48} />
              </div>
              <span className="fw-medium text-dark">Upload Images</span>
              <small className="text-muted">PNG, JPG only</small>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}