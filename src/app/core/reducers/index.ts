import { AppState } from '@app/core/intefaces/app-state.interface';
import * as fromAccount from './account.reducers';
import * as fromGroup from './group.reducers';
import * as fromTick from './tick.reducers';

export interface Core {
  accounts: fromAccount.State;
  groups: fromGroup.State;
  ticks: fromTick.State;
}

export interface CoreState extends AppState {
  core: Core;
}

export const reducers = {
  accounts: fromAccount.reducer,
  groups: fromGroup.reducer,
  ticks: fromTick.reducer,
};

export const getAccountsFromSection = (section: fromAccount.State) => Object.values(section.entities);
export const getGroupsFromSection = (section: fromGroup.State) => Object.values(section.entities);
export const getTicksFromSection = (section: fromTick.State) => Object.values(section.entities);
