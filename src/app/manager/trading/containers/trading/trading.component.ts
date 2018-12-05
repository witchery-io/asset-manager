import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as Select from '@trading/state/account.selectors';
import { LoadAccounts } from '@app/core/actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.styl']
})
export class TradingComponent implements OnInit {

  accounts$: Observable<any>;
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

    this.accounts$.subscribe(accounts => console.log('state', accounts));
    this.isLoading$.subscribe(isLoading => console.log('isLoading', isLoading));
    this.error$.subscribe(error => console.log('error', error));
  }

}
