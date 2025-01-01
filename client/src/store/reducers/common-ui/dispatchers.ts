import { bindActions } from '@utils';
import { actions } from './reducer';

export const { setIsChatOpen } = bindActions(actions);
