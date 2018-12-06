import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as SelectAccount from '@trading/state/account.selectors';
import * as SelectGroup from '@trading/state/group.selectors';
import { LoadAccounts } from '@app/core/actions/account.actions';
import { Observable } from 'rxjs';
import { Account, Group } from '@app/core/intefaces';
import { LoadGroups } from '@app/core/actions/group.actions';
import { TradingState } from '@app/core/reducers';

@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.styl']
})
export class TradingComponent implements OnInit {

  accounts$: Observable<Account[]>;
  isLoadingAccount$: Observable<boolean>;
  errorAccount$: Observable<string>;

  groups$: Observable<Group[]>;
  isLoadingGroup$: Observable<boolean>;
  errorGroup$: Observable<string>;

  constructor(
    public store: Store<TradingState>,
  ) {
    this.accounts$ = this.store.pipe(select(SelectAccount.getAccounts));
    this.isLoadingAccount$ = this.store.pipe(select(SelectAccount.isLoading));
    this.errorAccount$ = this.store.pipe(select(SelectAccount.getError));

    this.groups$ = this.store.pipe(select(SelectGroup.getGroups));
    this.isLoadingGroup$ = this.store.pipe(select(SelectGroup.isLoading));
    this.errorGroup$ = this.store.pipe(select(SelectGroup.getError));
  }

  ngOnInit() {
    this.store.dispatch(new LoadAccounts());
    this.store.dispatch(new LoadGroups());
  }
}
