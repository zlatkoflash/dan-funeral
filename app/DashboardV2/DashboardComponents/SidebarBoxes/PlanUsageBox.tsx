"use client";

import ZProgressBar from "@/components/zprogressbar/ZProgressBar";
import Link from "next/link";
import { useAuth } from "@/ContextProvider/AuthProviderWrap";

export default function PlanUsageBox() {

  const {
    user
  } = useAuth();

  if (!user) {
    return null;
  }

  const total_slots = user?.defaultListing.counts.slots > 0 ? user?.defaultListing.counts.slots : 1;
  const total_photos = user?.defaultListing.counts.photos > 0 ? user?.defaultListing.counts.photos : 1;
  const total_videos = user?.defaultListing.counts.videos > 0 ? user?.defaultListing.counts.videos : 1;

  const used_slots = user?.defaultListing.counts_used.slots as number;
  const used_photos = user?.defaultListing.counts_used.photos as number;
  const used_videos = user?.defaultListing.counts_used.videos as number;

  const slots_progress = (used_slots / total_slots) * 100;
  const photos_progress = (used_photos / total_photos) * 100;
  const videos_progress = (used_videos / total_videos) * 100;


  return (
    <>
      <section className="dashboard-sidebar-menu">
        <div className="box-cell-content">
          <div className="title">Plan Usage</div>
        </div>

        <div className="box-cell-content">
          <ZProgressBar
            progress={slots_progress}
            variant="success"
            labels={{
              start: "Slots",
              end: `${used_slots}/${total_slots}`
            }}
          />
        </div>
        <div className="box-cell-content">
          <ZProgressBar
            progress={photos_progress}
            variant="success"
            labels={{
              start: "Photos",
              end: `${used_photos}/${total_photos}`
            }}
          />
        </div>


        <div className="box-cell-content">
          <ZProgressBar
            progress={videos_progress}
            variant="success"
            labels={{
              start: "Video",
              end: `${used_videos}/${total_videos}`
            }}
          />
        </div>

        <div className="box-cell-content">
          <Link href={"/Dashboard/PricingPlan"} className="btn btn-warning d-flex">Upgrade Plan</Link>
        </div>

      </section>
    </>
  )
}