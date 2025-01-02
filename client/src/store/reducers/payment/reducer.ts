import { createSlice } from '@reduxjs/toolkit';
import * as reducers from './reducers';
import { TPaymentState } from 'src/types/store.types';

export const initialState: TPaymentState = {
  selectedPlan: null,
};

export const { actions, reducer } = createSlice({
  name: 'payment',
  initialState,
  reducers,
});
