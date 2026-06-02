"use client";

import verified_star from "@/assets/images/verified-star.svg";
import the_star2 from "@/assets/images/yellow-star.svg";
import info_green_icon from "@/assets/images/icon-info-green.svg";
import { Alert } from "react-bootstrap";
import { useAuth } from "@/ContextProvider/AuthProviderWrap";
import { prettifySlug } from "@/utils/strings";
import { useAppDispatch } from "@/redux/hooks";

export default function MainHealthBox() {
  const { user } = useAuth();

  if (user === null) {
    return <></>;
  }

  const dispatch = useAppDispatch();

  const percent = user.defaultListing.health.coeficient * 100;
  // const size = 200;
  const strokeWidth = 4;
  const radius = 34 - strokeWidth; // Based on viewBox of 100
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <>
      <section className="dashboard-sidebar-menu">
        {
          // template from the design:
          /**
           * <div className="box-cell-content">
          <div className="title">
            Funeral Company
            <img src={verified_star.src} alt="Verified" className="verified-star" />
          </div>
          <div className="star-claim-badge">
            <img src={the_star2.src} alt="Claimed" className="icon" /> Claimed
          </div>
          <div className="current-plan-label">
            {
              // Basic
            }
            {
              prettifySlug(user?.defaultListing.planType || "undefined plan")
            }
          </div>
        </div>
           * 
           */
        }
        <div className="box-cell-content">
          <div className="title">
            {user?.defaultListing.name}
            {user.verification.isVerifiedByAdmin && (
              <img
                src={verified_star.src}
                alt="Verified"
                className="verified-star"
              />
            )}
          </div>
          {user.verification.isVerifiedByAdmin && (
            <div className="star-claim-badge">
              <img src={the_star2.src} alt="Claimed" className="icon" /> Claimed
            </div>
          )}
          <div className="current-plan-label">
            {
              // Basic
            }
            {prettifySlug(user?.defaultListing.planType || "undefined plan")}
          </div>
        </div>

        {user?.defaultListing.plan_subscribtion_details.plan_type === "basic" &&
          !user.defaultListing.isVerified && (
            <div className="box-cell-content">
              <Alert variant="success">
                <img src={info_green_icon.src} alt="Info" className="icon" />
                <span className="content">
                  <a href="/DashboardV2/PricingPlan">Upgrade</a> Your Account to
                  Improve Visibility To Potential Customers.
                </span>
              </Alert>
            </div>
          )}
        {
          // !user?.defaultListing.isVerified &&
          !user.verification.isVerifiedByAdmin && (
            <div className="box-cell-content">
              <Alert variant="success">
                <img src={info_green_icon.src} alt="Info" className="icon" />
                <span className="content">
                  Business is not verified by administrator. You will receive a
                  notification once your verification is completed.
                </span>
              </Alert>
            </div>
          )
        }

        <div className="box-cell-content">
          <div className="completeness-chart">
            <div className="chart">
              <svg
                width={68}
                height={68}
                viewBox="0 0 68 68"
                style={
                  {
                    // transform: 'rotate(-90deg)'
                  }
                } // Rotates start point to the top
              >
                {/* 1. Inner Circle: Filled with light background */}
                <circle cx="34" cy="34" r={24} fill="#ebf2e8" />

                {/* 2. White Space Circle: The "gap" between center and progress */}
                <circle
                  cx="34"
                  cy="34"
                  r={radius}
                  fill="transparent"
                  stroke="white"
                  strokeWidth={0}
                />

                <circle
                  cx="34"
                  cy="34"
                  r={34 - strokeWidth}
                  fill="transparent"
                  stroke="#ebf2e8"
                  strokeWidth={strokeWidth}
                  // strokeDasharray={circumference}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 0.5s ease" }}
                />

                {/* 3. Progress Track: Dark green bar */}
                <circle
                  cx="34"
                  cy="34"
                  r={34 - strokeWidth}
                  fill="transparent"
                  stroke="#224724"
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  style={{
                    transition: "stroke-dashoffset 0.5s ease",
                    transform: "rotate(-90deg)",
                    transformOrigin: "center",
                  }}
                />

                {/* 4. Text: Centered and rotated back to upright */}
                <text
                  x="34"
                  y="34"
                  fontFamily="sans-serif"
                  fontSize="16"
                  fontWeight="bold"
                  textAnchor="middle"
                  // alignmentBaseline="middle"
                  dominantBaseline="central"
                  fill="#224724"
                  dx={2}
                >
                  {Math.round(user.defaultListing.health.coeficient * 100)}%
                </text>
              </svg>
            </div>
            <div className="content">
              <div className="title">Profile Health</div>
              <div className="action">
                {user.defaultListing.health.coeficient === 1
                  ? "Profile is complete and we are recommending it to families"
                  : "Higher Profile Health Helps You Increase Search Rankings and Results"}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
