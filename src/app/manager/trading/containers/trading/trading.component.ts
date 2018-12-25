import { Component, OnInit } from '@angular/core';
import { WsHandlerService } from '@trading/services/ws/ws-handler.service';
import { select, Store } from '@ngrx/store';
import { TradingState } from '@trading/reducers';
import { LoadBalance } from '@trading/actions/balance.actions';
import { LoadOrders } from '@trading/actions/orders.actions';
import { LoadPositions } from '@trading/actions/positions.actions';
import { Observable } from 'rxjs';
import * as Select from '@trading/state/trading.selectors';
import * as fromOrders from '@trading/reducers/orders.reducers';
import * as fromPositions from '@trading/reducers/positions.reducers';
import * as fromBalance from '@trading/reducers/balance.reducers';
import * as fromAccounts from '@app/core/reducers/account.reducers';
import * as fromGroups from '@app/core/reducers/group.reducers';
import * as fromTicks from '@app/core/reducers/tick.reducers';

@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.scss'],
})
export class TradingComponent implements OnInit {

  orders$: Observable<fromOrders.State>;
  isLoadingOrders$: Observable<boolean>;

  positions$: Observable<fromPositions.State>;
  isLoadingPositions$: Observable<boolean>;

  balance$: Observable<fromBalance.State>;
  isLoadingBalance$: Observable<boolean>;

  accounts$: Observable<fromAccounts.State>;
  groups$: Observable<fromGroups.State>;
  ticks$: Observable<fromTicks.State>;

  constructor(
    private ws: WsHandlerService,
    private store: Store<TradingState>,
  ) {
    this.orders$ = this.store.pipe(select(Select.getOrders));
    this.isLoadingOrders$ = this.store.pipe(select(Select.isLoadingOrders));

    this.positions$ = this.store.pipe(select(Select.getPositions));
    this.isLoadingPositions$ = this.store.pipe(select(Select.isLoadingPositions));

    this.balance$ = this.store.pipe(select(Select.getBalance));
    this.isLoadingBalance$ = this.store.pipe(select(Select.isLoadingBalance));

    this.accounts$ = this.store.pipe(select(Select.getAccounts));
    this.groups$ = this.store.pipe(select(Select.getGroups));
    this.ticks$ = this.store.pipe(select(Select.getTicks));
  }

  ngOnInit() {
    this.store.dispatch(new LoadBalance());
    this.store.dispatch(new LoadOrders());
    this.store.dispatch(new LoadPositions());
  }
}
