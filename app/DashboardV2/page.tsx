import { Col, Container, Row } from "react-bootstrap";
import DashboardHeader from "@/app/DashboardV2/DashboardComponents/Header";
import MainHealthBox from "@/app/DashboardV2/DashboardComponents/SidebarBoxes/MainHealthBox";
import PlanUsageBox from "@/app/DashboardV2/DashboardComponents/SidebarBoxes/PlanUsageBox";
import QuickStatsBox from "@/app/DashboardV2/DashboardComponents/SidebarBoxes/QuickStatsBox";
import DashboardFooter from "./DashboardComponents/Footer";
import DashboardHelloHeading from "./DashboardComponents/HelloHeading/DashboardHelloHeading";
import RecentLeads from "./DashboardComponents/RecentLeads/RecentLeads";
import FeaturedRanking from "./DashboardComponents/FeatureRanking/FeaturedRanking";
import StartVerificationPanel from "./DashboardComponents/StartVerificationPanel/StartVerificationPanel";
import RankYourServiceEmptyPanel from "./DashboardComponents/RankYourServiceEmptyPanel/RankYourServiceEmptyPanel";

export default function DashboardV2() {
  return (
    <>
      <DashboardHeader />

      <section className="dashboard-main-container">
        <Container>
          <Row>
            <Col className="content-wrap">

              <div className="sidebar-admin dashboard-v2">
                <MainHealthBox />
                <PlanUsageBox />
                <QuickStatsBox />
              </div>
              <div className="content-admin">
                <DashboardHelloHeading />
                <RecentLeads />
                <FeaturedRanking />
                <StartVerificationPanel />
                <RankYourServiceEmptyPanel />
              </div>

            </Col>
          </Row>
        </Container>
      </section>

      <DashboardFooter />

    </>
  )
}