import { bindActions } from '@utils';
import { actions } from './reducer';

export const { setIsChatOpened } = bindActions(actions);
