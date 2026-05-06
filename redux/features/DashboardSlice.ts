import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 1. Define the shape of a single listing
/*export interface Dashboard {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
}*/

// 2. Define the State shape
interface DashboardsState {
  /*items: Dashboard[];
  totalCount: number;
  loading: boolean;
  error: string | null;*/
  // for the small modals
  modalUpgradePlan: {
    show: boolean,
    type: "unlock-leads-content" | "photos-count-reached-content" | "videos-upload-available-after-basic" | "videos-count-reached-content-for-standard"
  };
  // for the big modal with the packages
  modalPlansShow: boolean,


  modalShow_AddService: boolean,
  modalShow_EditService: {
    show: boolean,
    serviceIndex: number
  },
  modalShow_AddFAQ: boolean,
  modalShow_FAQsReorder: boolean,
  modalShow_EditFAQ: {
    show: boolean,
    faqIndex: number
  },

  modalShow_ProfileDetails: {
    show: boolean,
    type: "my-profile" | "bussiness" | "password" | "membership"
  }
}

const initialState: DashboardsState = {
  /*items: [],
  totalCount: 0,
  loading: false,
  error: null,*/
  modalUpgradePlan: {
    show: false,
    type: "unlock-leads-content"
  },
  modalPlansShow: false,

  modalShow_AddFAQ: false,
  modalShow_FAQsReorder: false,
  modalShow_EditFAQ: {
    show: false,
    faqIndex: -1
  },

  modalShow_AddService: false,
  modalShow_EditService: {
    show: false,
    serviceIndex: -1
  },

  modalShow_ProfileDetails: {
    show: false,
    type: "my-profile"
    // type: "bussiness"
    // type: "password"
  }
};

export const dashboardSlice = createSlice({
  name: 'dashboard-v2',
  initialState,
  reducers: {

    setModalUpgradePlanShow: (state, action: PayloadAction<{
      show: boolean,
      type: "unlock-leads-content" | "photos-count-reached-content" | "videos-upload-available-after-basic" | "videos-count-reached-content-for-standard"
    }>) => {
      state.modalUpgradePlan = action.payload;
    },

    setModalPlansShow: (state, action: PayloadAction<boolean>) => {
      state.modalPlansShow = action.payload;
    },

    setModalShow_AddService: (state, action: PayloadAction<boolean>) => {
      state.modalShow_AddService = action.payload;
    },

    setModalShow_EditService: (state, action: PayloadAction<{
      show: boolean,
      serviceIndex: number
    }>) => {
      state.modalShow_EditService = action.payload;
    },

    setModalShow_AddFAQ: (state, action: PayloadAction<boolean>) => {
      state.modalShow_AddFAQ = action.payload;
    },
    setModalShow_FAQsReorder: (state, action: PayloadAction<boolean>) => {
      state.modalShow_FAQsReorder = action.payload;
    },
    setModalShow_EditFAQ: (state, action: PayloadAction<{
      show: boolean,
      faqIndex: number
    }>) => {
      state.modalShow_EditFAQ = action.payload;
    },

    setModalShow_ProfileDetails: (state, action: PayloadAction<{
      show: boolean,
      type: "my-profile" | "bussiness" | "password" | "membership"
    }>) => {
      state.modalShow_ProfileDetails = action.payload;
    }

  },
});

// Export the actions to be used in your components/thunks
export const { setModalUpgradePlanShow, setModalPlansShow, setModalShow_AddService, setModalShow_AddFAQ, setModalShow_FAQsReorder } = dashboardSlice.actions;

// Export the reducer to be registered in store.ts
export default dashboardSlice.reducer;