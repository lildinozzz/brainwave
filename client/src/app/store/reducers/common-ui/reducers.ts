import { TCommonUIInitialState, TsetIsChatOpened } from 'src/types/store.types';

export const setIsChatOpened = (
  state: TCommonUIInitialState,
  action: TsetIsChatOpened
) => {
  state.isChatOpened = action.payload;
};
