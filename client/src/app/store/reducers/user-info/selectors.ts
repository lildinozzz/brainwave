import { TStore } from 'src/shared/types/store.types';

export const userInfoSelectors = {
  userInfo: (store: TStore) => store.userInfo,
};
