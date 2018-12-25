import { Component, OnInit } from '@angular/core';
import { WsHandlerService } from '@trading/services/ws/ws-handler.service';
import { select, Store } from '@ngrx/store';
import { TradingState } from '@trading/reducers';
import { LoadBalance } from '@trading/actions/balance.actions';
import { LoadOrders } from '@trading/actions/orders.actions';
import { LoadPositions } from '@trading/actions/positions.actions';
import { Observable } from 'rxjs';
import * as Select from '@trading/state/trading.selectors';

import * as SelectCore from '@app/core/reducers';

@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.scss'],
})
export class TradingComponent implements OnInit {

  ordersSection$: Observable<any>;
  positionsSection$: Observable<any>;
  balanceSection$: Observable<any>;

  ticksSection$: Observable<any>;
  ticksIsLoading$: Observable<any>;

  accountsSection$: Observable<any>;
  groupsSection$: Observable<any>;

  constructor(
    private ws: WsHandlerService,
    private store: Store<TradingState>,
  ) {
    this.ordersSection$ = this.store.pipe(select(Select.getOrders));
    this.positionsSection$ = this.store.pipe(select(Select.getPositions));
    this.balanceSection$ = this.store.pipe(select(Select.getBalance));

    this.ticksSection$ = this.store.pipe(select(SelectCore.getTicks));
    this.ticksIsLoading$ = this.store.pipe(select(SelectCore.ticksIsLoading));

    this.accountsSection$ = this.store.pipe(select(SelectCore.getAccounts));
    this.groupsSection$ = this.store.pipe(select(SelectCore.getGroups));
  }

  ngOnInit() {
    this.store.dispatch(new LoadBalance());
    this.store.dispatch(new LoadOrders());
    this.store.dispatch(new LoadPositions());
  }
}
