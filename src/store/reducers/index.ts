import { Reducer } from '@reduxjs/toolkit';
import { TStore } from 'src/types/store.types';
import { commonUI } from '../reducers/common-ui';
import { pricing } from '../reducers/pricing';

type TReducer = {
  [K in keyof TStore]: Reducer<TStore[K]>;
};

export const reducer: TReducer = {
  commonUI,
  pricing,
};