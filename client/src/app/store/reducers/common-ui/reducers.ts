import {
  TCommonUIInitialState,
  TsetIsChatOpened,
} from 'src/shared/types/store.types';

export const setIsChatOpened = (
  state: TCommonUIInitialState,
  action: TsetIsChatOpened
) => {
  state.isChatOpened = action.payload;
};
