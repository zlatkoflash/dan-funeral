"use client";

import TextInput from "@/components/forms/Input";
import ZProgressBar from "@/components/zprogressbar/ZProgressBar";
import { useAppSelector } from "@/redux/hooks";
import { apiCallScrapping } from "@/utils/apiScrapping";
import { useState } from "react";
import { Button } from "react-bootstrap";

export default function StatsScrapedCompanies() {

  const stats = useAppSelector((state) => state.scraping.stats);

  const [loading, setLoading] = useState(false);
  const [scrappingCompaniesError, setScrappingCompaniesError] = useState("");

  const [zipOrDomainForScraping, setzipOrDomainForScraping] = useState("");

  const scrapTheDomains = async (type: "zip-or-domain" | "scrap-not-scrapped" = "zip-or-domain") => {
    setLoading(true);
    setScrappingCompaniesError("");

    let results: {
      companies_fetched_0: boolean
    } | null = null

    try {
      results = await apiCallScrapping<{
        companies_fetched_0: boolean
      }>("/scraper/scrape-data-from-company-domains", {
        method: "POST",
        body: {
          zipOrDomain: type === "scrap-not-scrapped" ? type : zipOrDomainForScraping,
          // type: type
        },
      });
      console.log("results:", results);
    } catch (error: any) {
      console.error("error:", error);
      setLoading(false)
      setScrappingCompaniesError(error.message)
    } finally {
      setLoading(false);
    }

    if (type === "scrap-not-scrapped" && !results?.companies_fetched_0) {
      // recursive call to get all the zip codes or domains that are not scraped yet
      await scrapTheDomains("scrap-not-scrapped")
    }

    setLoading(false);
  }

  return <>
    <div className="box-cell-content">
      <ZProgressBar
        progress={

          (stats?.companies.total_tried_to_be_scraped_from_web
            /
            (stats.companies.total_ready_scraped_from_google > 0 ? stats.companies.total_ready_scraped_from_google : 1)
          ) * 100

        }
        variant={`success`}
        labels={{
          start: "Scraped from web progress",
          end: `${stats?.companies.total_tried_to_be_scraped_from_web}/${stats?.companies.total_ready_scraped_from_google}`,
        }}
      />

      <div className="d-flex gap-5 flex-wrap pt-1">
        <div className="">
          <Button
            variant="dark"
            type="button"
            className={loading ? 'loading' : ""}
            onClick={() => {
              scrapTheDomains("scrap-not-scrapped")
            }}>
            Scrape Next Domains
          </Button>
        </div>
        <div className="d-flex gap-1 px-2">
          <TextInput
            id="zip-code"
            type="text"
            value={zipOrDomainForScraping}
            onChange={(e) => { setzipOrDomainForScraping(e.target.value) }}
            placeholder="Enter Zip Code / Domain"
          />
          <Button
            variant="dark"
            type="button"
            className={loading ? 'loading' : ""}
            onClick={() => {
              scrapTheDomains()
            }}>
            Scrape Domains For ZIP / Domain
          </Button>
        </div>
      </div>

      {
        scrappingCompaniesError !== "" && <p className="text-danger">{scrappingCompaniesError}</p>
      }
    </div>
  </>
}