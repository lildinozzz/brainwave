import { TStore } from 'src/types/store.types';

export const commonUISelectors = {
  commonUIInfo: (store: TStore) => store.commonUI,
};
