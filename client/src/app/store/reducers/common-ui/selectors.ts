import { TStore } from 'src/app/types/store.types';

export const commonUISelectors = {
  commonUIInfo: (store: TStore) => store.commonUI,
};
