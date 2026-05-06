import Image from "next/image";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Table } from "react-bootstrap";

import example_listing_image from "@/assets/images/example-listing-image.jpg";
import icon_x3dots_actions from "@/assets/images/icon-x3-dots-actions.svg";


export default function FeaturedRankingTable() {

  const dataRankings: any[] = [
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
  ];

  return (
    <>
      <div className="featured-ranking-table-wrap">
        <Table>
          <thead>
            <tr>
              <th>Listing Name:</th>
              <th>Rank</th>
              <th>Location</th>
              <th>Service/Product</th>
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
                      <h4>Peaceful Funeral Home</h4>
                      <div className="id">ID: #8821</div>
                    </div>
                  </div>
                </td>
                <td>{ranking.rank}</td>
                <td>{ranking.location}</td>
                <td>
                  <div className="current-plan-label gray">
                    {ranking.serviceProduct}
                  </div>
                </td>
                <td>
                  <div className="current-plan-label big">{ranking.status}</div>
                </td>
                <td>
                  <div className="price">$100</div>
                  <div className="current-plan-label small">
                    Expire Jun 30, 2024
                  </div>
                </td>
                <td>
                  <Dropdown className="x3-dots-actions-dropdown">
                    <DropdownToggle>
                      <img src={icon_x3dots_actions.src} alt="x3dots actions" />
                    </DropdownToggle>

                    <DropdownMenu>
                      <DropdownItem href="#/action-1">Action</DropdownItem>
                      <DropdownItem href="#/action-2">Another action</DropdownItem>
                      <DropdownItem href="#/action-3">Something else</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  )
}