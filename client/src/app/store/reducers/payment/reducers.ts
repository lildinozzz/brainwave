import { TPaymentState, TSetPlan } from 'src/types/store.types';

export const setSelectedPlan = (state: TPaymentState, action: TSetPlan) => {
  state.selectedPlan = action.payload;
};
