import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as Select from '@trading/state/account.selectors';
import { LoadAccounts} from '@app/core/actions';
import { Observable } from 'rxjs';
import { Account } from '@app/core/intefaces';

@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.styl']
})
export class TradingComponent implements OnInit {

  accounts$: Observable<Account[]>;
  isLoading$: Observable<any>;
  error$: Observable<any>;

  constructor(
    public store: Store<any>,
  ) {
    this.accounts$ = this.store.pipe(select(Select.getAccounts));
    this.isLoading$ = this.store.pipe(select(Select.isLoading));
    this.error$ = this.store.pipe(select(Select.getError));
  }

  ngOnInit() {
    this.store.dispatch(new LoadAccounts());
  }
}
