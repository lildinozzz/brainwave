import { bindActions } from '../bindActions';
import { actions } from './reducer';

export const { setSelectedPlan } = bindActions(actions);
