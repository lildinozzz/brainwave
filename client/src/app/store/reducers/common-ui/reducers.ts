import {
  TCommonUIInitialState,
  TsetIsChatOpened,
} from 'src/app/types/store.types';

export const setIsChatOpened = (
  state: TCommonUIInitialState,
  action: TsetIsChatOpened
) => {
  state.isChatOpened = action.payload;
};
