"use client";

import TextInput from "@/components/forms/Input";
import ZProgressBar from "@/components/zprogressbar/ZProgressBar";
import { IScrapingStateStats } from "@/redux/features/ScrapingSlice";
import { fetchScrapingStats } from "@/redux/features/ScrapingSliceThunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getApiData } from "@/utils/api";
import { useState } from "react";
import { Button } from "react-bootstrap";

export default function StatAddDataToLiveApplication() {

  const stats = useAppSelector((state) => state.scraping.stats);
  const coeficient = stats.companies.total_in_live / (
    stats.companies.total_that_should_be_in_live === 0 ? 1 : stats.companies.total_that_should_be_in_live
  );

  const dispatch = useAppDispatch();
  const [domain, setDomain] = useState("")

  const [loading, setLoading] = useState(false);
  const StartAddingTheDataInStats = async (scrapZip: "all-not-completed-companies" | "zip-code", zipCode: string) => {

    setLoading(true)

    try {
      const result = await getApiData<{
        ok: boolean,
        thereWasData: boolean
      }>("/data-manipulation/AddReadyDataToTheSystem", "POST", {
        zip: scrapZip === "all-not-completed-companies" ? scrapZip : zipCode
      }, "not-authorize", "application/json");

      console.log("Results after adding to live websites / single website:", result);

      /*const statsResults = await getApiData<{
        ok:boolean;
        stats: IScrapingStateStats;
      }>("/data-manipulation/SCRAP_GetScrappingStats", "POST", {}, "not-authorize", "application/json")
      if(statsResults.ok){
      }*/

      dispatch(fetchScrapingStats())

      if (result.thereWasData === true && scrapZip === "all-not-completed-companies") {
        await StartAddingTheDataInStats("all-not-completed-companies", "")
      }

    } catch (error) {
    }

    setLoading(false)
  }

  return <>

    <div className="box-cell-content">
      <ZProgressBar
        progress={coeficient * 100}
        variant={`success`}
        labels={{
          start: "Adding the data to live application",
          end: `${stats.companies.total_in_live}/${stats.companies.total_that_should_be_in_live}`,
        }}
      />

      <div className="d-flex gap-5 flex-wrap pt-1">
        <div className="">
          <Button
            variant="dark"
            type="button"
            className={loading ? 'loading' : ""}
            onClick={() => {
              // scrapTheDomains("scrap-not-scrapped")
              StartAddingTheDataInStats("all-not-completed-companies", "")
            }}>
            Add Live Next Domains
          </Button>
        </div>
        <div className="d-flex gap-1 px-2">

          <TextInput
            id="zip-code"
            type="text"
            value={domain}
            onChange={(e) => { setDomain(e.target.value) }}
            placeholder="Enter Zip Code / Domain"
          />
          <Button
            variant="dark"
            type="button"
            className={loading ? 'loading' : ""}
            onClick={() => {
              StartAddingTheDataInStats("zip-code", domain)
            }}>
            Add Live Domain
          </Button>
        </div>
      </div>

    </div>

  </>
}