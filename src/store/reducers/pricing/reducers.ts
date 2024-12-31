import { TPricingState, TSetPlan } from 'src/types/store.types';

export const setPlan = (state: TPricingState, action: TSetPlan) => {
  state.plan = action.payload;
};
