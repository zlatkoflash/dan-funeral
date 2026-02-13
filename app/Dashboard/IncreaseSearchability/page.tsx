"use client"

import FormSearch from "@/components/forms/ReadyForms/FormSearch";
import AdminContentWrap from "../content/AdminContentWrap";
import D1PricingPlanHome from "../PricingPlan/content/D1PricingPlanHome";
import MLCotentWrap from "../MyListing/content/MLCotentWrap";
import { Button, Table } from "react-bootstrap";
import DashboardTableRankings from "./content/DashboardTableRankings";

export default function DashboardIncreaseSearchability() {


  console.log("listing_filters and listing_filters_edited are repeating, you need to ask Dan, what here actually will be shown.");

  const listing_filters = [
    { value: 'all', title: 'All Listings', count: 0 },
    { value: 'approved', title: 'Approved', count: 0 },
    { value: 'pending', title: 'Pending', count: 0 },
    { value: 'removed', title: 'Removed', count: 0 },
    { value: 'expired', title: 'Expired', count: 0 },
    { value: 'spotlight', title: 'Spotlight', count: 0 },
    { value: 'featured', title: 'Featured', count: 0 },
    { value: 'professionally', title: 'Professionally', count: 0 }
  ];


  const listing_filters_edited = () => {
    return listing_filters.map((item, index) => {
      return {
        ...item,
        onclick: () => {
          console.log(item.title);
        }
      }
    })
  }

  return (
    <AdminContentWrap subHeadSearchSettings={{
      breads: [
        {
          label: "Home",
          link: "/",
        },
        {
          label: "Dashboard",
          link: "/Dashboard",
        },
        {
          label: "Featured Rankings",
          link: "",
        },
      ],
      title: "Increase Rankings on Searches",
      right_content: <FormSearch buttonSearchType="btn-text" />
    }}>
      {
        // <C1DashboardHome />
      }
      {
        // <D1PricingPlanHome />
      }
      <>

        <MLCotentWrap sidebarItems={{
          items: listing_filters_edited()
        }}>
          <>

            <div className="d-heading-with-button">
              <div className="title">
                <h2>
                  Featured Rankings
                </h2>
                <small>Available Slot 3/3 </small>
              </div>
              <div className="right-buttons">
                <Button variant="success">Add</Button>
              </div>
            </div>

            <DashboardTableRankings />

          </>
        </MLCotentWrap>
      </>
    </AdminContentWrap>
  )
}