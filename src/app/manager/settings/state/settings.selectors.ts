import { createSelector } from '@ngrx/store';
import { SettingsState, State } from '@settings/reducers';

/*
* Create SETTINGS selectors
* */
export const getTrading = (state: State) => state.settings;

export const getOrders = createSelector(getTrading, (state: SettingsState) => state.orders);

export const getPositions = createSelector(getTrading, (state: SettingsState) => state.positions);

export const getBalance = createSelector(getTrading, (state: SettingsState) => state.balance);
