"use client";

import { useAppSelector } from "@/redux/hooks";
import { CompletnessChart } from "../../DashboardComponents/SidebarBoxes/MainHealthBox";

export default function ScrapingStats() {

  const stats = useAppSelector((state) => state.scraping.stats);
  console.log("stats:::", stats);

  const coeficientAIScrapingHealth = (stats.companies.ai_data_health_sum / (stats.companies.total_ready_scraped_from_ai === 0 ? 1 : stats.companies.total_ready_scraped_from_ai));

  const percentInLive = (stats.companies.total_in_live / (stats.companies.total_that_should_be_in_live === 0 ? 1 : stats.companies.total_that_should_be_in_live));

  return <>


    <section className="dashboard-sidebar-menu">
      <div className="box-cell-content">
        <div className="title">
          Scraping Stats
        </div>
      </div>

      <div className="box-cell-content">
        <CompletnessChart
          percent={stats.basic_data_health * 100}
          title="Basic Data Health"
          actionDescription={stats.basic_data_health > .7
            ? "Google Basic Data Is Good"
            : "Google Basic Data Is Not Good, consider improving the basic data"}
        />
      </div>

      <div className="box-cell-content">
        <CompletnessChart
          percent={stats.scraped_data_health_from_websites * 100}
          title="Scrapped Data Health (from websites)"
          actionDescription={stats.scraped_data_health_from_websites > .8
            ? "Scrapped Data Health Is Good"
            : "We recommend to continue to scrape more data to improve the health of the data"}
        />
      </div>

      <div className="box-cell-content">
        <CompletnessChart
          percent={coeficientAIScrapingHealth * 100}
          title="AI Scraping Health"
          actionDescription={coeficientAIScrapingHealth > .8
            ? "AI Scraping Health Is Good"
            : "AI Scraping Health Is Not Good, consider improving the AI Scraping, Do scrap again where AI is not scrapped"}
        />
      </div>

      {
        /*<div className="box-cell-content">
        <CompletnessChart
          percent={stats.coeficient_business_related_to_our_application * 100}
          title="Coeficient Business Related to Our Application"
          actionDescription={stats.coeficient_business_related_to_our_application > .5
            ? "The business data scraped is related to our application"
            : "The business data scraped is not related to our application"}
        />
      </div>*/
      }
      {
        /*<div className="box-cell-content">
        <CompletnessChart
          percent={stats.scraped_coeficient * 100}
          title="Scraped companies percent"
          actionDescription={stats.scraped_coeficient === 1
            ? "All base companies from zips was scraped"
            : "You have companies that need to be scraped "}
        />
      </div>*/
      }
      <div className="box-cell-content">
        <CompletnessChart
          percent={100 * percentInLive}
          title="Data in live"
          actionDescription={percentInLive > .5
            ? "Data In Live Is Good"
            : "Data In Live Is Not Good, We recommend to continue to add more data to improve the health of the data in live"}
        />
      </div>

    </section>

  </>
}