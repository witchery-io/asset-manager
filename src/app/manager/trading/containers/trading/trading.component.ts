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

  state$: Observable<any>;

  constructor(
    public store: Store<any>,
  ) {
    this.state$ = this.store.pipe(select(Select.getAccounts));
  }

  ngOnInit() {
    this.store.dispatch(new LoadAccounts());

    this.state$.subscribe(state => {
      console.log(state);
    });
  }

}
