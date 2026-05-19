"use client";

import { useState } from "react";
import { Button } from "react-bootstrap";
import icon_box from "@/assets/images/icon-rank-your-service-empty-panel.png";
import { useAuth } from "@/ContextProvider/AuthProviderWrap";
import { useRouter } from "next/navigation";

export default function RankYourServiceEmptyPanel() {

  const { user } = useAuth();
  const ranks_count = user?.defaultListing.ranks_count as number;
  if (ranks_count !== null && ranks_count > 0) {
    return <></>;
  }
  const router = useRouter();

  return (
    <>
      <section className="rank-your-service-empty-panel">
        <div className="icon">
          <img src={icon_box.src} alt="icon_check_star" />
        </div>
        <div className="content">
          <div className="title">Get Featured in Your Preferred Locations or category </div>
          <div className="description">Rank your services by city or category to appear at the top and reach more families when it matters most.</div>
          <div className="actions">
            <Button variant="success" type="button" onClick={() => { router.push("/DashboardV2/FeaturedRanking/AddNewRanking"); }}>Rank Your Services</Button>
          </div>
        </div>
      </section>
    </>
  )
}