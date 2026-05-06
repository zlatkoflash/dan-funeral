import { Button } from "react-bootstrap";
import icon_rank_eye from '@/assets/images/icon-eye-rank.svg';
import icon_delete from '@/assets/images/icon-delete-green.svg';
import icon_edit from '@/assets/images/icon-edit.svg';
import Image from "next/image";
import example_listing_thumbnail from "@/assets/images/example-listing-thumbnail.jpg";
import Link from "next/link";

export default function RankingItemsForCard() {

  const ranking_items = [
    "", ""
  ];

  return <>
    <div className="ranking-items-for-card">

      <div className="ranking-items-heading">
        <div className="left-content">
          <img src={icon_rank_eye.src} alt="Ad Preview" />
          <h5>
            Ad Preview
          </h5>
        </div>
        <div className="right-content-buttons">
          <Link href="/DashboardV2/FeaturedRanking/AddNewRanking" className="btn btn-light ">
            Add New
          </Link>
        </div>
      </div>


      <div className="ranking-items-list">
        {
          ranking_items.map((item, index) => {
            return <div className="item-ranking-card" key={index}>
              <div className="add-preview-panel">
                <div className="heading">
                  <div className="left-content">
                    <h5>"Home Renovation"</h5>
                  </div>
                  <div className="right-content">
                    <div className="current-plan-label success">1st AD</div>
                  </div>
                </div>
                <div className="content-inner">
                  <div className="left-content">
                    <Image src={example_listing_thumbnail} alt="image" width={250} height={250} />
                    <div className="inner-titles-and-paragraphs">
                      <h5>Peaceful Funeral Home</h5>
                      <p>ID: #8821</p>
                    </div>
                  </div>
                  <div className="right-content">
                    <Button type="button" variant="light" className="btn-circle-icon">
                      <img src={icon_edit.src} alt="icon-edit" />
                    </Button>
                    <Button type="button" variant="light" className="btn-circle-icon">
                      <img src={icon_delete.src} alt="icon-delete" />
                    </Button>
                  </div>
                </div>
                <div className="footer-for">
                  <p>Per Month $20</p>
                </div>
              </div>
            </div>
          })
        }
      </div>


    </div>
  </>
} 