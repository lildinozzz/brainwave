import { TStore } from 'src/types/store.types';

export const paymentSelectors = {
  paymentInfo: (store: TStore) => store.payment,
};
