import { Reducer } from '@reduxjs/toolkit';
import { TStore } from 'src/types/store.types';
import { commonUI } from '../reducers/common-ui';
import { payment } from '../reducers/payment';
import { userInfo } from '../reducers/user-info';

type TReducer = {
  [K in keyof TStore]: Reducer<TStore[K]>;
};

export const reducer: TReducer = {
  commonUI,
  payment,
  userInfo,
};
