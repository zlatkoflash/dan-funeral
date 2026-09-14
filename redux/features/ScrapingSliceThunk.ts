import { getApiData } from "@/utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IScrapingState, IScrapingStateStats } from "./ScrapingSlice";
import { apiCallScrapping } from "@/utils/apiScrapping";

export const fetchScrapingStats = createAsyncThunk(
  'Scraping/fetchStats',
  async (_, thunkAPI) => {
    try {
      /*const response = await getApiData<{
        ok: boolean;
        stats: IScrapingStateStats;
      }>('/data-manipulation/SCRAP_GetScrappingStats', "POST", {}, "not-authorize", "application/json");*/


      console.log("Loading stats started...");

      const params = new URLSearchParams(window.location.search);
      const zip = params.get('zip') || '';
      console.log("Stats for zip: ", zip);

      const rootState = thunkAPI.getState() as any; // Or your RootState type
      const { city, state } = rootState.scraping.filters; // Adjust 'scraping' to match your slice name

      console.log(`rootState.filters: ${rootState.scraping.filters}`);


      const response = await apiCallScrapping<{
        ok: boolean;
        stats: IScrapingStateStats;
      }>("/scraper/stats", {
        method: "POST",
        body: {
          zip: zip,
          state: state,
          city: city
        }
      });

      console.log("response stats:", response);

      if (!response || !response.ok) {
        return thunkAPI.rejectWithValue('Failed to fetch stats');
      }

      return response.stats;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Unknown error');
    }
  }
);