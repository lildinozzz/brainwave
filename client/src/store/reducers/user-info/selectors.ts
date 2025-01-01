import { TStore } from 'src/types/store.types';

export const userInfoSelectors = {
  userInfo: (store: TStore) => store.userInfo,
};
