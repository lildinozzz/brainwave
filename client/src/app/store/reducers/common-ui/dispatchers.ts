import { bindActions } from '../bindActions';
import { actions } from './reducer';

export const { setIsChatOpened } = bindActions(actions);
