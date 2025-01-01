import { createSlice } from '@reduxjs/toolkit';
import * as reducers from './reducers';
import { TPaymentState } from 'src/types/store.types';

export const initialState: TPaymentState = {
  plan: null,
};

export const { actions, reducer } = createSlice({
  name: 'pricing',
  initialState,
  reducers,
});
