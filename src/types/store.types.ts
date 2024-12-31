import { PayloadAction as PA } from '@reduxjs/toolkit';
import { TPricing } from './chat.types';

export type TStore = {
  commonUI: TCommonUIInitialState;
  pricing: TPricingState;
};

export type TCommonUIInitialState = {
  isChatOpen: boolean;
};

export type TPricingState = {
  plan: TPricing | null;
};

export type TSetIsChatOpen = PA<TCommonUIInitialState['isChatOpen']>;

export type TSetPlan = PA<TPricingState['plan']>;
