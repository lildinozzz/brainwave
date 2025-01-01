import { TPaymentState, TSetPlan } from 'src/types/store.types';

export const setPlan = (state: TPaymentState, action: TSetPlan) => {
  state.plan = action.payload;
};
