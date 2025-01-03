import { TPaymentState, TSetPlan } from 'src/shared/types/store.types';

export const setSelectedPlan = (state: TPaymentState, action: TSetPlan) => {
  state.selectedPlan = action.payload;
};
