import { bindActions } from '@shared';
import { actions } from './reducer';

export const { setIsChatOpen } = bindActions(actions);
