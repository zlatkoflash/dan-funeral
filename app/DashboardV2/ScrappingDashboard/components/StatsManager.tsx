"use client";

import { IScrapingStateStats, setStats } from "@/redux/features/ScrapingSlice";
import { fetchScrapingStats } from "@/redux/features/ScrapingSliceThunk";
import { useAppDispatch } from "@/redux/hooks";
import { getApiData } from "@/utils/api";
import { useEffect, useRef } from "react";

export default function StatsManager() {


  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const dispatch = useAppDispatch();

  /*const LoadStats = async () => {
    try {
      const statsDetails = await getApiData<{
        ok: boolean;
        stats: IScrapingStateStats;
      }>('/data-manipulation/SCRAP_GetScrappingStats', "POST", {}, "not-authorize", "application/json");

      console.log("statsDetails:", statsDetails);

      if (statsDetails.ok) {
        dispatch(setStats(statsDetails.stats))
      }

    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      // Schedule the next poll only after the current request finishes
      // timeoutRef.current = setTimeout(LoadStats, 1000);
    }
  };*/
  /*
    useEffect(() => {
      LoadStats();
  
      // Clear timeout on unmount to prevent memory leaks and background execution
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);*/

  useEffect(() => {
    dispatch(fetchScrapingStats());
  }, []);



  return null;
}