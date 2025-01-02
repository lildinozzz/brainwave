import { PayloadAction as PA } from '@reduxjs/toolkit';
import { TPayment } from './chat.types';
import { TAuthState, TUserFromBackend } from 'src/services/auth/types';

export type TStore = {
  commonUI: TCommonUIInitialState;
  payment: TPaymentState;
  userInfo: TAuthState;
};

export type TCommonUIInitialState = {
  isChatOpened: boolean;
};

export type TPaymentState = {
  selectedPlan: TPayment | null;
};

export type TsetIsChatOpened = PA<TCommonUIInitialState['isChatOpened']>;

export type TSetPlan = PA<TPaymentState['selectedPlan']>;

export type TUserInfoState = {
  user: TUserFromBackend;
};
