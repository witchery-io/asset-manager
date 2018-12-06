import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromGroup from '@app/core/reducers/group.reducers';
import { TradingState } from '@app/core/reducers';

export const getTradingState = createFeatureSelector<TradingState>('trading');
export const getGroupIndexState = createSelector(getTradingState, (state: TradingState) => state.groups);

export const getError = createSelector(getGroupIndexState, (state: fromGroup.State) => state.error);
export const isLoading = createSelector(getGroupIndexState, (state: fromGroup.State) => state.isLoading);
export const getGroups = createSelector(getGroupIndexState, (state: fromGroup.State) => state.groups);
