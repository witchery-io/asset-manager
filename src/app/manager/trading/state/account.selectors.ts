import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAccount from '@app/core/reducers';

export const getAccountsState = createFeatureSelector<fromAccount.State>('accounts');
export const getAccounts = createSelector(getAccountsState, (state: fromAccount.State) => state);
