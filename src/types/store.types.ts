import { PayloadAction as PA } from '@reduxjs/toolkit';

export type TStore = {
  commonUI: TCommonUIInitialState;
};

export type TCommonUIInitialState = {
  isChatOpen: boolean;
};

export type TSetIsChatOpen = PA<TCommonUIInitialState['isChatOpen']>;
