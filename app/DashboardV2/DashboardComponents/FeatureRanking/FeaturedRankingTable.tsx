"use client";

import Image from "next/image";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Table } from "react-bootstrap";

import example_listing_image from "@/assets/images/example-listing-image.jpg";
import icon_x3dots_actions from "@/assets/images/icon-x3-dots-actions.svg";
import { IRankData } from "@/utils/interfaceListing";
import { useAuth } from "@/ContextProvider/AuthProviderWrap";
import { formatPrice, FriendlyDates } from "@/utils/strings";
import { RemoveItemsToStripeGroupSubscription } from "@/utils/stripe";
import ModalForRemovingFeaturedRanking from "./ModalForRemovingFeaturedRanking";
import { useState } from "react";


export default function FeaturedRankingTable({ dataRankings, onRemoveRank }: { dataRankings: IRankData[], onRemoveRank: (ranking: IRankData) => void }) {

  /*const dataRankings: any[] = [
    {
      id: 1,
      listingName: "Mark",
      rank: "Rank 1",
      location: "Chicago, IL",
      serviceProduct: "Funeral Services",
      status: "responded",
      priceMonthly: "$100",
      action: "@mdo",
    },
    {
      id: 2,
      listingName: "Jacob",
      rank: "Thornton",
      location: "@fat",
      serviceProduct: "@fat",
      status: "@fat",
      priceMonthly: "@fat",
      action: "@fat",
    },
    {
      id: 3,
      listingName: "Larry the Bird",
      rank: "@twitter",
      location: "@twitter",
      serviceProduct: "@twitter",
      status: "@twitter",
      priceMonthly: "@twitter",
      action: "@twitter",
    },
  ];*/

  const { user } = useAuth();

  if (!user) {
    return <></>;
  }

  const RemoveTheRanksData = async (ranking: IRankData) => {

    await RemoveItemsToStripeGroupSubscription(ranking.subscribtion_item_id as string);

    onRemoveRank(ranking);

  }

  const [showModalRemove, setShowModalRemove] = useState(false);
  const [selectedRanking, setSelectedRanking] = useState<IRankData | null>(null);


  return (
    <>
      <div className="featured-ranking-table-wrap">
        <Table responsive>
          <thead>
            <tr>
              <th>Listing Name:</th>
              <th>Rank</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Price (Monthly)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataRankings.map((ranking) => (
              <tr key={ranking.id}>
                <td>
                  <div className="listing-name-details">
                    <Image src={example_listing_image} alt="Peaceful Funeral Home" />
                    <div className="content">
                      <h4>{user.defaultListing.name}</h4>
                      <div className="id">ID: #{user.defaultListing.id}</div>
                    </div>
                  </div>
                </td>
                <td>{ranking.rank_position}</td>
                <td>
                  <div className="current-plan-label gray">
                    {ranking.title}
                  </div>
                </td>
                <td>{ranking.description}</td>
                <td>
                  <div className={`current-plan-label big ${ranking.subscribtion_status !== "active" ? "gray" : ""}`}>{ranking.subscribtion_status}</div>
                </td>
                <td>
                  {
                    // ranking.subscribtion_status
                  }
                  {
                    ranking.subscribtion_status === "active"
                      ?
                      <>
                        <div className="price">{formatPrice(ranking.amount as number / 100)}</div>
                        <div className="current-plan-label small">
                          Renew on {FriendlyDates(new Date(ranking.current_period_end as number * 1000))}
                        </div>
                      </>
                      :
                      <>-</>
                  }
                </td>
                <td>
                  {
                    ranking.subscribtion_status === "active" && <Dropdown className="x3-dots-actions-dropdown">
                      <DropdownToggle>
                        <img src={icon_x3dots_actions.src} alt="x3dots actions" />
                      </DropdownToggle>

                      <DropdownMenu>
                        <DropdownItem href="#/action-1" onClick={(e) => {
                          e.preventDefault();

                          // RemoveTheRanksData(ranking);

                          setSelectedRanking(ranking);
                          setShowModalRemove(true);

                        }}>Remove This Featured Ranking</DropdownItem>
                        {
                          /*<DropdownItem href="#/action-2">Another action</DropdownItem>
                        <DropdownItem href="#/action-3">Something else</DropdownItem>*/
                        }
                      </DropdownMenu>
                    </Dropdown>
                  }

                </td>
              </tr>
            ))}

            {
              dataRankings.length === 0 && <>
                <tr>
                  <td colSpan={7}>
                    <div className="text-center">No data found</div>
                  </td>
                </tr>
              </>
            }
          </tbody>
        </Table>
      </div>

      <ModalForRemovingFeaturedRanking
        show={showModalRemove}
        setShow={setShowModalRemove}
        confirmRemoving={() => {

          RemoveTheRanksData(selectedRanking as IRankData);

        }}
      />
    </>
  )
}