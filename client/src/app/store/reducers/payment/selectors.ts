import { TStore } from 'src/app/types/store.types';

export const paymentInfoSelectors = {
  paymentInfo: (store: TStore) => store.payment,
};
