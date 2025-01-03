import { PayloadAction as PA } from '@reduxjs/toolkit';
import { TAuthState } from './auth.types';

/** Store Info */

export type TStore = {
  commonUI: TCommonUIInitialState;
  payment: TPaymentState;
  userInfo: TAuthState;
};

/**Payment Info */
export type TPayment = {
  id: string;
  title: string;
  duration?: string;
  description: string;
  price: string;
  features: string[];
};

export type TPaymentState = {
  selectedPlan: TPayment | null;
};

export type TSetPlan = PA<TPaymentState['selectedPlan']>;

/**Common UI STORE */
export type TCommonUIInitialState = {
  isChatOpened: boolean;
};

export type TsetIsChatOpened = PA<TCommonUIInitialState['isChatOpened']>;
