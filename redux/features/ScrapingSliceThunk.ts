import { getApiData } from "@/utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IScrapingStateStats } from "./ScrapingSlice";

export const fetchScrapingStats = createAsyncThunk(
  'Scraping/fetchStats',
  async (_, thunkAPI) => {
    try {
      const response = await getApiData<{
        ok: boolean;
        stats: IScrapingStateStats;
      }>('/data-manipulation/SCRAP_GetScrappingStats', "POST", {}, "not-authorize", "application/json");

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