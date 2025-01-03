import { Reducer } from '@reduxjs/toolkit';
import { TStore } from 'src/types/store.types';
import { commonUI } from './common-ui';
import { payment } from './payment';
import { userInfo } from './user-info';

type TReducer = {
  [K in keyof TStore]: Reducer<TStore[K]>;
};

export const reducer: TReducer = {
  commonUI,
  payment,
  userInfo,
};
