import { PayloadAction as PA } from '@reduxjs/toolkit';
import { TPricing } from './chat.types';
import { TAuthState, TUserFromBackend } from 'src/services/auth/types';

export type TStore = {
  commonUI: TCommonUIInitialState;
  payment: TPaymentState;
  userInfo: TAuthState;
};

export type TCommonUIInitialState = {
  isChatOpen: boolean;
};

export type TPaymentState = {
  plan: TPricing | null;
};

export type TSetIsChatOpen = PA<TCommonUIInitialState['isChatOpen']>;

export type TSetPlan = PA<TPaymentState['plan']>;

export type TUserInfoState = {
  user: TUserFromBackend;
};
