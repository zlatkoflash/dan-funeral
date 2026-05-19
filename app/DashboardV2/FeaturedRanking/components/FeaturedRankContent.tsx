"use client";


import { Col, Container, Row } from "react-bootstrap";
import BtnPaymentSections from "@/app/DashboardV2/ChangePlan/components/BtnPaymentSections";
import RankingItemsForCard from "@/app/DashboardV2/FeaturedRanking/components/RankingItemsForCard";
import AddNewRanking from "@/app/DashboardV2/FeaturedRanking/components/AddNewRanking";
import { IRankData } from "@/utils/interfaceListing";

export default function FeaturedRankContent(
  {
    leftPanelContentType = "ranking-items-for-card",
    initialRankData

  }
    :
    {
      leftPanelContentType?: 'ranking-items-for-card' | 'add-ranking'
      | 'edit-ranking',
      initialRankData?: IRankData
    }
) {


  // const [leftPanelContentType, setLeftPanelContentType] = useState<'ranking-items-for-card' | 'add-ranking'>('ranking-items-for-card');


  return <>
    <div className="dashboard-main-container">
      <Container>
        <Row>
          <Col>
            <div className="main-wrap-chnage-plan">
              <div className="cards-content-wrap">
                {
                  leftPanelContentType === "ranking-items-for-card" && <RankingItemsForCard />
                }
                {
                  leftPanelContentType === "add-ranking" && <AddNewRanking />
                }
                {
                  // AddNewRanking will be used for editing also
                  leftPanelContentType === "edit-ranking" && <AddNewRanking initialData={initialRankData} />
                }
              </div>
              <div className="payment-content-wrap">

                <BtnPaymentSections />

              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  </>;
}