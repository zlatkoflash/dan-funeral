"use client";

import Link from "next/link"
import iconBusinessBuilding from '@/assets/images/icon-business-building.svg';
import { useState } from "react";
import { IListingV2 } from "@/utils/interfaceListing";


export default function ClaimBusinessList({
  list,
  afterSelecting
}: {
  list: IListingV2[],
  afterSelecting: (listing_id: number) => void
}) {


  const [selectedBussiness, setSelectedBussiness] = useState<any>(null);


  return <>
    <div className="claim-business-list">
      <div className="search-results">
        {list.map((item: IListingV2, key) => (
          <div key={'index-claim-' + key} className={`search-result-item ${selectedBussiness === item.post.ID ? 'selected' : ''}`}>
            <div className="icon">
              <img src={iconBusinessBuilding.src} alt="Business Building" />
            </div>
            <div className="content">
              <div className="search-company-name">{item.post.post_title}</div>
              <div className="search-company-address">Unclaimed 123 Maple St, Chicago, IL</div>
            </div>
            <div className="actions">
              <Link href={`/Dashboard/User/ClaimTheBusiness`} className="claim-link" onClick={(e) => {
                e.preventDefault();
                setSelectedBussiness(item.post.ID);
                afterSelecting(item.post.ID)
              }}>Claim</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
}