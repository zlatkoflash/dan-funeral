'use client'

import Image from "next/image";

import exampleProfileImage from './../../assets/images/dashboard-profile.jpg';
import ZButtonEdit from "../forms/ZButtonEdit";
import { AuthUser, useAuth } from "@/ContextProvider/AuthProviderWrap";
import { ChangeEvent, useRef, useState } from "react";
import { MyFileUploading } from "@/utils/files";

export default function DashboardProfileImage() {

  const { user, setUser } = useAuth();

  const fileInputRefProfilePhoto = useRef<HTMLInputElement>(null);
  const [uploadingProfilePhoto, setUploadingProfilePhoto] = useState(false);

  return <div className="dashboard-profile-image">
    <div className={`image-wrap ${uploadingProfilePhoto === true ? 'element-is-preloading' : ''}`}>
      <Image src={user?.profile_photo !== "" ? user?.profile_photo as string : exampleProfileImage} alt="David R., Seattle, WA" width={500} height={800} />


      <input ref={fileInputRefProfilePhoto} type="file" onChange={async (e: ChangeEvent<HTMLInputElement>) => {
        // e.preventDefault();
        setUploadingProfilePhoto(true);
        const result = await MyFileUploading(e, '/user/UpdateUserProfilePhoto', 'profile_photo_custom_avatar', {});
        console.log(result);
        if (result?.file !== null) {
          // setNewLoadedProfilePhoto(result.file.url);
          setUser({
            ...user,
            profile_photo: result?.file.url
          } as AuthUser)
        }
        setUploadingProfilePhoto(false);
      }} id="profileImage" accept="image/*" className="d-none" />

      <ZButtonEdit onClick={(e) => {
        console.log("Edit");
        fileInputRefProfilePhoto.current?.click();
      }} />
    </div>
    <div className="user-name-wrap">
      {
        // David R., Seattle, WA
        user?.full_name + ", " + user?.business_location
      }
    </div>
  </div>
}