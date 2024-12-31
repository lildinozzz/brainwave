import { createSlice } from '@reduxjs/toolkit';
import * as reducers from './reducers';
import { TPricingState } from 'src/types/store.types';

export const initialState: TPricingState = {
  plan: null,
};

export const { actions, reducer } = createSlice({
  name: 'pricing',
  initialState,
  reducers,
});
