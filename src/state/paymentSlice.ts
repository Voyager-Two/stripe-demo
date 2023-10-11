import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { AppState } from '@app/state/store';

export interface PaymentState {
  plan?: string | number;
  status?: 'billing-info' | 'need-payment' | 'refunded' | 'finished';
  displayApiData?: object;
  discountCode?: string;
  subscriptionId?: string;
  clientSecret?: string;
  billingInfo?: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipcode: number;
  };
}

const initialState: PaymentState = {
  plan: 'A',
  status: 'billing-info',
};

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    updatePaymentInfo: (state, action: PayloadAction<PaymentState>) => {
      // Update the entire object
      return { ...state, ...action.payload };
    },
  },
});

export const { updatePaymentInfo } = paymentSlice.actions;

export const getPaymentInfo = (state: AppState) => state.payment;

export default paymentSlice.reducer;
