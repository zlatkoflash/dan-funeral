import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './features/DashboardSlice';
import shopReducer from './features/ShopSlice';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    shop: shopReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;