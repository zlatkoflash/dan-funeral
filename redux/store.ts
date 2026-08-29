import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './features/DashboardSlice';
import shopReducer from './features/ShopSlice';
import socketReducer from './features/SocketSlice';
import ScrapingReducer from './features/ScrapingSlice';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    shop: shopReducer,
    socket: socketReducer,
    scraping: ScrapingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;