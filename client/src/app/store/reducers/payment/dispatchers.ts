import { bindActions } from '@utils';
import { actions } from './reducer';

export const { setSelectedPlan } = bindActions(actions);
