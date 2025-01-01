import { ActionCreatorsMapObject, bindActionCreators } from '@reduxjs/toolkit';
import { store } from 'src/store/store';

const { dispatch: d } = store;

export const bindActions = <M extends ActionCreatorsMapObject>(
  actionCreator: M
): M => bindActionCreators(actionCreator, d);
