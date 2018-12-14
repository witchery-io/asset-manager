import { createSelector } from '@ngrx/store';
import { AppSettingsState, State } from '@settings/reducers';

/*
* Create SETTINGS selectors
* */
export const getTrading = (state: State) => state.settings;

export const getOrders = createSelector(getTrading, (state: AppSettingsState) => state.orders);

export const getPositions = createSelector(getTrading, (state: AppSettingsState) => state.positions);

export const getBalance = createSelector(getTrading, (state: AppSettingsState) => state.balance);
