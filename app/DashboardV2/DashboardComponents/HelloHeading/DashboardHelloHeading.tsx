"use client";

import { dashboardSlice } from "@/redux/features/DashboardSlice";
import { useAppDispatch } from "@/redux/hooks";
import Link from "next/link";
import { Button } from "react-bootstrap";

/**
 * Professional greetings based on the 24-hour clock.
 */
const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
};

export default function DashboardHelloHeading() {

  const greeting = getGreeting();

  const dispatch = useAppDispatch();

  return (
    <section className="dashboard-hello-heading">
      <div className="content">
        <h2>{greeting} 👋</h2>
        <p>Here’s an overview of your serenity directory profile.</p>
      </div>
      <div className="right-buttons">
        <Link href="/DashboardV2/EditBusiness" className="btn btn-light" onClick={(e) => {
          e.preventDefault();
          dispatch(dashboardSlice.actions.setModalShow_ProfileDetails({
            show: true,
            type: "my-profile"
          }))
        }}>Edit Profile</Link>
        <Link href="/DashboardV2/EditBusiness" className="btn btn-success">Edit Business</Link>
      </div>
    </section>
  );
}