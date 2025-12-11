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

export default function C1DashboardHome() {

  const userStats = [
    { count: 0, title: "Listed Item", link: "/" },
    { count: 0, title: "Request quote", link: "/" },
  ];
  const userPlanStats = [
    { label: "Plan Name", value: "Lite Plan (Free)" },
    { label: "Plan Started", value: "Sept 26, 2025" },
    { label: "Plan Expires", value: "Sept 26, 2026" },
  ];

  return <>
    <div className="profile-image-and-cover-change">
      <Image src={coverExample} alt="Cover Profile" className="cover" />
      <div className="buttons-footer">

        <div className="profile-image-changer-wrap">
          <div className="profile-image-changer">
            <Image src={profileImageExample} alt="Profile Image" />
            <ZButtonEdit onClick={(e) => { }} />
          </div>
          <div className="info">
            <h5>Upload Brand Image</h5>
            <p>Best image size 150 x 150</p>
          </div>
        </div>

        <Button variant="success" className="btn-edit-cover">
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


    {/*<div className="dashboard-plan-stats">

      {
        userPlanStats.map((item, key: number) => {
          return <div className="plan-stats-item" key={`item-plan-stats-${key}`}>
            <h5>{item.label}</h5>
            <h4>{item.value}</h4>
          </div>
        })
      }
      <Button type="button" variant="success">
        Become Verified
        <Image src={iconStar} className="icon-right" alt="Become Verified" />
      </Button>
    </div>*/}
    <DashPlanStats
      stats={userPlanStats}
      additionalElement={
        <Button type="button" variant="success">
          Become Verified
          <Image src={iconStar} className="icon-right" alt="Become Verified" />
        </Button>
      }
    />


  </>
}