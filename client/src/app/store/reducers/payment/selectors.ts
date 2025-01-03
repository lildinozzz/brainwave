import { TStore } from 'src/shared/types/store.types';

export const paymentInfoSelectors = {
  paymentInfo: (store: TStore) => store.payment,
};
