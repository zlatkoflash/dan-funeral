import { I_StripeCustomer, IS_StripePaymentMethod } from "@/utils/interfaceStripe";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ShopState {
  stripeCustomer: I_StripeCustomer | null;
  addingCard: boolean;
  creditCards: {
    list: IS_StripePaymentMethod[],
    areLoading: boolean,
    defaultCard: IS_StripePaymentMethod | null,
    // error: string
    modalForDeletingCard: {
      show: boolean,
      card: IS_StripePaymentMethod | null,
    }
  }
}

const initialState: ShopState = {
  stripeCustomer: null,
  addingCard: false,
  creditCards: {
    list: [],
    areLoading: true,
    defaultCard: null,
    modalForDeletingCard: {
      show: false,
      card: null,
    }
  }
}

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setAddingCard: (state, action: PayloadAction<boolean>) => {
      state.addingCard = action.payload;
    },

    setCardsList: (state, action: PayloadAction<IS_StripePaymentMethod[]>) => {
      state.creditCards.list = action.payload;
    },

    setCardsAreLoading: (state, action: PayloadAction<boolean>) => {
      state.creditCards.areLoading = action.payload;
    },

    setModalForDeletingCard: (state, action: PayloadAction<{
      show: boolean,
      card: IS_StripePaymentMethod | null,
    }>) => {
      state.creditCards.modalForDeletingCard = action.payload;
    },

    setStripeCustomer: (state, action: PayloadAction<I_StripeCustomer>) => {
      state.stripeCustomer = action.payload;
    },

    setDefaultCard: (state, action: PayloadAction<IS_StripePaymentMethod>) => {
      state.creditCards.defaultCard = action.payload;
    }
  }
})

export default shopSlice.reducer;

export const { setAddingCard } = shopSlice.actions;