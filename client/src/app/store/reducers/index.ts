import { Reducer } from '@reduxjs/toolkit';
import { commonUI } from './common-ui';
import { payment } from './payment';
import { userInfo } from './user-info';
import { TStore } from 'src/shared/types/store.types';

type TReducer = {
  [K in keyof TStore]: Reducer<TStore[K]>;
};

export const reducer: TReducer = {
  commonUI,
  payment,
  userInfo,
};
