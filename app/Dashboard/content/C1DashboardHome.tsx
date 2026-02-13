'use client'
import Image from "next/image";
import { Button } from "react-bootstrap";
import ZButtonEdit from "@/components/forms/ZButtonEdit";
import Link from "next/link";

import profileImageExample from './../../../assets/images/profile-image-example-circle.jpg';
import coverExample from './../../../assets/images/cover-example-2.jpg';
import iconEditWhite from './../../../assets/images/icon-edit-white.svg';
import iconStar from './../../../assets/images/icon-star.svg';
import DashPlanStats from "@/components/dashboard/DashPlanStats";
import { ChangeEvent, useRef, useState } from "react";
import { MyFileUploading } from "@/utils/files";
import { AuthUser, useAuth } from "@/ContextProvider/AuthProviderWrap";
import ProfileImageChanger from "@/components/forms/ButtonProfileImageChanger";
import { getApiData } from "@/utils/api";
import { get_PlanStatsForActiveSubscribtion, useStripePlans } from "@/ContextProvider/StripePlansProvider";
import { SendVerifyTheEmailAddress } from "@/utils/user";
import BtnBecomeVerified from "./BtnBecomeVerified";

export default function C1DashboardHome() {

  // const { activeSubscription } = useStripePlans();

  const {
    user,
    setUser,
  } = useAuth();
  const fileInputRefProfilePhoto = useRef<HTMLInputElement>(null);
  const fileRefCoverInput = useRef<HTMLInputElement>(null);

  const [uploadingProfilePhoto, setUploadingProfilePhoto] = useState(false);
  const [uploadingCoverPhoto, setUploadingCoverPhoto] = useState(false);

  const [loadingSendingVerificationEmail, setLoadingSendingVerificationEmail] = useState(false);
  const [messageAfterSendingVerificationEmail, setMessageAfterSendingVerificationEmail] = useState<string>("");

  const userStats = [
    { count: user?.counts?.listings !== undefined && user?.counts?.listings !== null ? user?.counts?.listings > 99 ? 99 : user?.counts?.listings : 0, title: "Listed Item", link: "/Dashboard/MyListing" },
    { count: user?.counts?.request_quote !== undefined && user?.counts?.request_quote !== null ? user?.counts?.request_quote > 99 ? 99 : user?.counts?.request_quote : 0, title: "Request quote", link: "/Dashboard/RequestQuote" },
  ];
  /*const userPlanStats = [
    { label: "Plan Name", value: "Lite Plan (Free)" },
    { label: "Plan Started", value: "Sept 26, 2025" },
    { label: "Plan Expires", value: "Sept 26, 2026" },
  ];*/

  // const [newLoadedProfilePhoto, setNewLoadedProfilePhoto] = useState<string>("");
  const __profilePhoto = () => {
    // if (newLoadedProfilePhoto !== "") return newLoadedProfilePhoto;
    return user?.profile_photo !== "" ? user?.profile_photo as string : profileImageExample;
  }

  return <>
    <div className={`profile-image-and-cover-change ${uploadingCoverPhoto ? 'element-is-preloading-transparent' : ''}`}>
      <Image src={user?.cover_photo !== "" ? user?.cover_photo as string : coverExample} alt="Cover Profile" className="cover" onClick={async (e) => {
        e.preventDefault();
        console.log("it is working");
        fileRefCoverInput.current?.click();
      }} width={1920} height={1080} title="Cover Profile" />


      <input ref={fileRefCoverInput} type="file" onChange={async (e: ChangeEvent<HTMLInputElement>) => {
        // e.preventDefault();
        setUploadingCoverPhoto(true);
        const result = await MyFileUploading(e, '/user/UpdateUserCoverPhoto', 'cover_photo', {});
        console.log(result);
        if (result?.file !== null) {
          // setNewLoadedProfilePhoto(result.file.url);
          setUser({
            ...user,
            cover_photo: result?.file.url
          } as AuthUser)
        }
        setUploadingCoverPhoto(false);
      }} id="profileCoverPhoto" accept="image/*" className="d-none" />

      <div className="buttons-footer">

        <div className="profile-image-changer-wrap">

          <ProfileImageChanger
            id="profileImage"
            profilePhotoUrl={__profilePhoto()}
            isUploading={uploadingProfilePhoto}
            onFileSelect={async (e: ChangeEvent<HTMLInputElement>) => {
              // e.preventDefault();
              setUploadingProfilePhoto(true);
              const result = await MyFileUploading(e, '/user/UpdateUserProfilePhoto', 'profile_photo', {});
              console.log(result);
              if (result?.file !== null) {
                // setNewLoadedProfilePhoto(result.file.url);
                setUser({
                  ...user,
                  profile_photo: result?.file?.url
                } as AuthUser)
              }
              setUploadingProfilePhoto(false);
            }}
          />


          <div className="info">
            <h5>Upload Brand Image</h5>
            <p>Best image size 150 x 150</p>
          </div>
        </div>

        <Button type="button" variant="success" className="btn-edit-cover" onClick={(e) => {
          e.preventDefault();
          fileRefCoverInput.current?.click();
        }}>
          <Image src={iconEditWhite} alt="Edit" className="icon" />  Edit
        </Button>
      </div>
    </div>


    <div className="dashboard-user-stats">
      {
        userStats.map((itemCount, key: number) => {
          return <div className="stat-item-count" key={`item-stat-${key}`}>
            <div className="span count">{itemCount.count < 10 ? '0' : ''}{itemCount.count}</div>
            <div className="right-content">
              <h5>{itemCount.title}</h5>
              <Link href={itemCount.link} className="btn-read-more">View All</Link>
            </div>
          </div>
        })
      }
    </div>


    <DashPlanStats
      stats={get_PlanStatsForActiveSubscribtion(user as AuthUser)}
      additionalElement={
        <>
          {user?.email_verified === true && <div className={`badge-active-plan ${
            // activeSubscription !== null && activeSubscription.status !== "active" 
            user.plan.status !== "active"
              ? "error-plan" : ""}`}>
            {
              // activeSubscription !== null ? activeSubscription?.status : "-"
              user.plan.status
            }
          </div>}
          {
            // user?.email_verified !== true 
            (
              user?.plan.plan_type === "standard"
              ||
              user?.plan.plan_type === "premium")
            &&

            <BtnBecomeVerified />
          }
        </>
      }
    />



  </>
}