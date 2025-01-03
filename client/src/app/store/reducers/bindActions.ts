import { ActionCreatorsMapObject, bindActionCreators } from '@reduxjs/toolkit';
import { store } from 'src/app/store/store';

const { dispatch: d } = store;

export const bindActions = <M extends ActionCreatorsMapObject>(
  actionCreator: M
): M => bindActionCreators(actionCreator, d);
