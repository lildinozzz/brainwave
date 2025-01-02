import { TStore } from 'src/types/store.types';

export const paymentInfoSelectors = {
  paymentInfo: (store: TStore) => store.payment,
};
