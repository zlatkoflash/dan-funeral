'use client'

import Image from "next/image";

import exampleProfileImage from './../../assets/images/dashboard-profile.jpg';
import ZButtonEdit from "../forms/ZButtonEdit";

export default function DashboardProfileImage() {
  return <div className="dashboard-profile-image">
    <div className="image-wrap">
      <Image src={exampleProfileImage} alt="David R., Seattle, WA" />
      <ZButtonEdit onClick={(e) => {
        console.log("Edit");
      }} />
    </div>
    <div className="user-name-wrap">
      David R., Seattle, WA
    </div>
  </div>
}