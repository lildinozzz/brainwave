import { TCommonUIInitialState, TSetIsChatOpen } from 'src/types/store.types';

export const setIsChatOpen = (
  state: TCommonUIInitialState,
  action: TSetIsChatOpen
) => {
  state.isChatOpen = action.payload;
};
