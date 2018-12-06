import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAccount from '@app/core/reducers/account.reducers';
import { TradingState } from '@app/core/reducers';

export const getTradingState = createFeatureSelector<TradingState>('trading');
export const getAccountIndexState = createSelector(getTradingState, (state: TradingState) => state.accounts);
export const getError = createSelector(getAccountIndexState, (state: fromAccount.State) => state.error);
export const isLoading = createSelector(getAccountIndexState, (state: fromAccount.State) => state.isLoading);
export const getAccounts = createSelector(getAccountIndexState, (state: fromAccount.State) => state.accounts);
