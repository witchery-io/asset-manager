import { createSelector } from '@ngrx/store';
import { SettingsState, State } from '@settings/reducers';

/*
* Create SETTINGS selectors
* */
export const getSettings = (state: State) => state.settings;

export const getOrders = createSelector(getSettings, (state: SettingsState) => state.orders);

export const getPositions = createSelector(getSettings, (state: SettingsState) => state.positions);

export const getBalance = createSelector(getSettings, (state: SettingsState) => state.balance);
