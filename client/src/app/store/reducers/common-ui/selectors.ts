import { TStore } from 'src/shared/types/store.types';

export const commonUISelectors = {
  commonUIInfo: (store: TStore) => store.commonUI,
};
