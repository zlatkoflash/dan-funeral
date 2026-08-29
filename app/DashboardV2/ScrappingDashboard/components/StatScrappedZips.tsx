"use client";

import ZProgressBar from "@/components/zprogressbar/ZProgressBar";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { apiCallScrapping } from "@/utils/apiScrapping";
import { useAppSelector } from "@/redux/hooks";
import TextInput from "@/components/forms/Input";

export default function StatsScrapedZips() {


  const stats = useAppSelector((state) => state.scraping.stats)

  const [loading, setLoading] = useState(false);
  const [scrappingCompaniesError, set_scrappingCompaniesError] = useState("");

  const [zipForScraping, setZipForScraping] = useState("");

  const StartsScrappingCompanies = async (zip?: string) => {
    setLoading(true);
    set_scrappingCompaniesError("")

    const health = await apiCallScrapping("/scraper/health", {
      method: "GET"
    });
    console.log("health", health);

    try {

      const data = await apiCallScrapping<{
        ok: boolean
      }>("/scraper/scrap-comapnies-from-google-maps", {
        method: "POST",
        body: {
          zip: zip
        }
      });
      console.log("data after scraping raw company data:", data);

    } catch (error: any) {
      console.error("error:", error);
      setLoading(false)
      set_scrappingCompaniesError(error.message)
    } finally {
      setLoading(false);
    }

    setLoading(false);

    if (zip === undefined) {
      await StartsScrappingCompanies()
    }
  }


  return <>
    <div className="box-cell-content">
      <ZProgressBar
        progress={(stats?.zips_count_scraped.funeral / stats?.zips_count_scraped.total) * 100}
        variant={`success`}
        labels={{
          start: "Zips Scraped Total (Companies Raw Data - funeral)",
          end: `${stats?.zips_count_scraped.funeral}/${stats?.zips_count_scraped.total}`,
        }}
      />
      <ZProgressBar
        progress={(stats?.zips_count_scraped.cemetery / stats?.zips_count_scraped.total) * 100}
        variant={`success`}
        labels={{
          start: "Zips Scraped Total (Companies Raw Data - cemetery)",
          end: `${stats?.zips_count_scraped.cemetery}/${stats?.zips_count_scraped.total}`,
        }}
      />
      <ZProgressBar
        progress={(stats?.zips_count_scraped.crematorium / stats?.zips_count_scraped.total) * 100}
        variant={`success`}
        labels={{
          start: "Zips Scraped Total (Companies Raw Data - crematorium)",
          end: `${stats?.zips_count_scraped.crematorium}/${stats?.zips_count_scraped.total}`,
        }}
      />
      <ZProgressBar
        progress={(stats?.zips_count_scraped.mortuary / stats?.zips_count_scraped.total) * 100}
        variant={`success`}
        labels={{
          start: "Zips Scraped Total (Companies Raw Data - mortuary)",
          end: `${stats?.zips_count_scraped.mortuary}/${stats?.zips_count_scraped.total}`,
        }}
      />

      <div className="d-flex gap-5 flex-wrap pt-1">
        <div className="">
          <Button
            variant="dark"
            type="button"
            className={loading ? 'loading' : ""}
            onClick={() => {
              StartsScrappingCompanies()
            }}>
            Scrap next ZIP
          </Button>
        </div>
        <div className="d-flex gap-1 px-2">
          <TextInput
            id="zip-code"
            type="text"
            value={zipForScraping}
            onChange={(e) => { setZipForScraping(e.target.value) }}
            placeholder="Enter Zip Code"
          />
          <Button
            variant="dark"
            type="button"
            className={loading ? 'loading' : ""}
            onClick={() => {
              StartsScrappingCompanies(zipForScraping)
            }}>
            Scrape For The ZIp
          </Button>
        </div>
      </div>


      {
        scrappingCompaniesError !== "" && <p className="text-danger">{scrappingCompaniesError}</p>
      }

    </div>
  </>
}