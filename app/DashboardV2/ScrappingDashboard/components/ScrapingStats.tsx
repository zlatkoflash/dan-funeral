"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CompletnessChart } from "../../DashboardComponents/SidebarBoxes/MainHealthBox";
import ZDropdown from "@/components/forms/ZDropdown";
import { setCity, setState } from "@/redux/features/ScrapingSlice";
import { useEffect, useState } from "react";
import { getApiData } from "@/utils/api";
import { fetchScrapingStats } from "@/redux/features/ScrapingSliceThunk";

export default function ScrapingStats() {

  const stats = useAppSelector((state) => state.scraping.stats);
  console.log("stats:::", stats);
  const filters = useAppSelector((state) => state.scraping.filters);
  const dispatch = useAppDispatch();

  const coeficientAIScrapingHealth = (stats.companies.ai_data_health_sum / (stats.companies.total_ready_scraped_from_ai === 0 ? 1 : stats.companies.total_ready_scraped_from_ai));

  const percentInLive = (stats.companies.total_in_live / (stats.companies.total_that_should_be_in_live === 0 ? 1 : stats.companies.total_that_should_be_in_live));

  const [cities, setCities] = useState<{ id: string, name: string, population: number }[]>([]);
  const [states, setStates] = useState<{ id: string, name: string, population: number }[]>([]);

  const LoadTheCitiesAndStates = async () => {
    const details = await getApiData<{ ok: boolean, cities: { id: string, name: string, population: number }[], states: { id: string, name: string, population: number }[] }>("/data-manipulation/SCRAP_GetCitiesStates", "POST", {
      "state": filters.state,
      "city": filters.city,
    }, "not-authorize", "application/json");
    if (details.ok) {
      setCities(details.cities);
      setStates(details.states);
    }
  }

  useEffect(() => {

    console.log("filters:", filters);

    LoadTheCitiesAndStates();
    dispatch(fetchScrapingStats())

  }, [filters.city, filters.state]);

  return <>


    <section className="dashboard-sidebar-menu">
      <div className="box-cell-content">

        <div className="title">
          Scraping Stats
        </div>

        <ZDropdown className="mr-3" data={states.map((s) => ({
          value: s.id,
          text: `${s.name} ${formatPopulationLabel(s.population)}`,
        }))}
          onChange={(t: string) => {
            console.log('state changing...')
            dispatch(setState(t));
          }}
          variant="dropdown-for-sort"
          value={filters.state}
        />
        <ZDropdown data={cities.map((c) => ({
          value: c.id,
          text: `${c.name} ${formatPopulationLabel(c.population)}`,
        }))}
          onChange={(t: string) => {
            dispatch(setCity(t));
          }}
          variant="dropdown-for-sort"
          value={filters.city}
        />

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
          percent={stats.gallery_health * 100}
          title="Gallery Health"
          actionDescription={stats.gallery_health > .5
            ? "Gallery Data Is Good"
            : "Gallery Data Is Not Good, consider improving the gallery data"}
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


function formatPopulationLabel(num: number) {
  if (num == null || isNaN(num)) return 'P-0';

  if (num >= 1_000_000) {
    return `P-${(num / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  }
  if (num >= 1_000) {
    return `P-${(num / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  }
  return `P-${num}`;
}