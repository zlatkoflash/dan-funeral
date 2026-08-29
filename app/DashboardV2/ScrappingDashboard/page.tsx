import { Col, Container, Row } from "react-bootstrap";
import DashboardFooter from "../DashboardComponents/Footer";
import DashboardHeader from "../DashboardComponents/Header";
import DashboardHelloHeading from "../DashboardComponents/HelloHeading/DashboardHelloHeading";
import MainHealthBox from "../DashboardComponents/SidebarBoxes/MainHealthBox";
// import ScrapingStats from "./components/ScrapingStats";
import BootomMenu from "../DashboardComponents/SidebarBoxes/BootomMenu";
import ZProgressBar from "@/components/zprogressbar/ZProgressBar";
import SocketManager from "./components/SocketManager";
import ScraperStatusPanel from "./components/ScraperStatusPanel";
import StatsScrapedZips from "./components/StatScrappedZips";
import StatsManager from "./components/StatsManager";
import ScrapingStats from "./components/ScrapingStats";
import StatsScrapedCompanies from "./components/StatsScrapedCompanies";
import StatAddDataToLiveApplication from "./components/StatAddDataToLiveApplication";
import StatsGetFromatedDataFromAI from "./components/StatsGetFromatedDataFromAI";

export default async function PageScrappingDashboard() {
  return <>

    <SocketManager />
    <StatsManager />

    <DashboardHeader />


    <section className="dashboard-main-container">
      <Container>
        <Row>
          <Col className="content-wrap">
            <div className="sidebar-admin dashboard-v2">

              <DashboardHelloHeading ShowOnlyInMobile={true} />

              <ScrapingStats />

              <BootomMenu />


            </div>
            <div className="content-admin">


              <section className="dashboard-hello-heading">
                <div className="content">
                  <h2>Scrapping Dashboard</h2>
                  <p>
                    Manage and monitor your data scraping operations. Track progress, review statistics, and manage your scraping settings.
                  </p>

                  <ScraperStatusPanel />
                </div>
              </section>



              <section className="dashboard-sidebar-menu d-block">
                <StatsScrapedZips />
                <StatsScrapedCompanies />
                <StatsGetFromatedDataFromAI />
                <StatAddDataToLiveApplication />

              </section>
            </div>

          </Col>
        </Row>
      </Container>
    </section>

    <DashboardFooter />

  </>
}