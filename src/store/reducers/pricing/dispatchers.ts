import { bindActions } from '@shared';
import { actions } from './reducer';

export const { setPlan } = bindActions(actions);
