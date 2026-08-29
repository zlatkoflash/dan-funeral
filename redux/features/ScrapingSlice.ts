import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchScrapingStats } from './ScrapingSliceThunk';

export interface IScrapingStateStats {

  basic_data_health: number;

  zips_count_scraped: {
    funeral: number;
    cemetery: number;
    crematorium: number;
    mortuary: number;
    total: number;
  };

  companies: {
    total_ready_scraped_from_google: number,
    total_ready_scraped_from_web: number,
    total_tried_to_be_scraped_from_web: number;
    total_ready_scraped_from_ai: number;
    ai_data_health_sum: number;
    total_count_for_ai_scraping: number;
    total_in_live: number;
    total_that_should_be_in_live: number;
  },

  // total_zips: number; // delete
  // total_zips_scraped_companies: number;
  // count_total_companies: number;
  // count_total_companies_that_tried_to_get_data: number;
  scraped_data_health_from_websites: number;
  // coeficient_business_related_to_our_application: number;
  // scraped_coeficient: number;
  // email_phone_website_coeficient: number;

  // data_in_live_count: number;
  // data_that_should_be_added_in_live: number;

  // ai_success_scraped: number;
}
interface IScrapingState {
  stats: IScrapingStateStats;
  loading: boolean;
  error: string | null;
}

const initialState: IScrapingState = {
  stats: {
    basic_data_health: 0,
    zips_count_scraped: {
      funeral: 0,
      cemetery: 0,
      crematorium: 0,
      mortuary: 0,
      total: 0
    },
    // total_zips: 0,
    // total_zips_scraped_companies: 0,
    // count_total_companies: 0,
    // count_total_companies_that_tried_to_get_data: 0,
    companies: {
      total_ready_scraped_from_google: 0,
      total_ready_scraped_from_web: 0,
      total_ready_scraped_from_ai: 0,
      total_tried_to_be_scraped_from_web: 0,
      total_count_for_ai_scraping: 0,
      ai_data_health_sum: 0,

      total_in_live: 0,
      total_that_should_be_in_live: 0
    },
    scraped_data_health_from_websites: 0,
    // coeficient_business_related_to_our_application: 0,
    // scraped_coeficient: 0,
    // email_phone_website_coeficient: 0,

    // data_in_live_count: 0,
    // data_that_should_be_added_in_live: 0,

    // ai_success_scraped: 0,
  },
  loading: false,
  error: null,
};

export const ScrapingSlice = createSlice({
  name: 'Scraping',
  initialState,
  reducers: {
    setStats: (state, action: PayloadAction<IScrapingStateStats>) => {
      state.stats = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchScrapingStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchScrapingStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchScrapingStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setStats } = ScrapingSlice.actions;
export default ScrapingSlice.reducer;