import { bindActions } from '@utils';
import { actions } from './reducer';

export const { setPlan } = bindActions(actions);
