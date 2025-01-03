import { TStore } from 'src/app/types/store.types';

export const userInfoSelectors = {
  userInfo: (store: TStore) => store.userInfo,
};
