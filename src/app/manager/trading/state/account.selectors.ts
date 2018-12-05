import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAccount from '@app/core/reducers';

export const getAccountsState = createFeatureSelector<fromAccount.State>('accounts');
export const getError = createSelector(getAccountsState, (state: fromAccount.State) => state.error);
export const isLoading = createSelector(getAccountsState, (state: fromAccount.State) => state.isLoading);
export const getAccounts = createSelector(getAccountsState, (state: fromAccount.State) => state.accounts);
