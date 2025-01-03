import { createSlice } from '@reduxjs/toolkit';
import * as reducers from './reducers';
import { TCommonUIInitialState } from 'src/types/store.types';

export const initialState: TCommonUIInitialState = {
  isChatOpened: false,
};

export const { actions, reducer } = createSlice({
  name: 'commonUI',
  initialState,
  reducers,
});
