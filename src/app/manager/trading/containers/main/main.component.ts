import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { WsHandlerService } from '@trading/services/ws/ws-handler.service';
import { select, Store } from '@ngrx/store';
import { TradingState } from '@trading/reducers';
import { LoadBalance, UpdateBalance } from '@trading/actions/balance.actions';
import { LoadOrders, UpdateOrders } from '@trading/actions/orders.actions';
import { LoadPositions, UpdatePositions } from '@trading/actions/positions.actions';
import { Observable } from 'rxjs';
import * as Select from '@trading/state/trading.selectors';
import * as fromOrders from '@trading/reducers/orders.reducers';
import * as fromPositions from '@trading/reducers/positions.reducers';
import * as fromBalance from '@trading/reducers/balance.reducers';
import * as fromAccounts from '@app/core/reducers/account.reducers';
import * as fromGroups from '@app/core/reducers/group.reducers';
import * as fromTicks from '@app/core/reducers/tick.reducers';
import { ActivatedRoute, Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap';
import { OrderTab } from '@app/shared/enums';
import { LoadGroups } from '@app/core/actions/group.actions';
import { LoadAccounts } from '@app/core/actions/account.actions';
import { LoadTicks, UpdateTicks } from '@app/core/actions/tick.actions';

@Component({
  selector: 'app-trading',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  _id: string;
  _type: string;
  @ViewChild('ordersTabs')
  ordersTabs: TabsetComponent;
  orders$: Observable<fromOrders.State>;
  isLoadingOrders$: Observable<boolean>;
  positions$: Observable<fromPositions.State>;
  isLoadingPositions$: Observable<boolean>;
  balance$: Observable<fromBalance.State>;
  isLoadingBalance$: Observable<boolean>;
  accounts$: Observable<fromAccounts.State>;
  isLoadingAccounts$: Observable<boolean>;
  groups$: Observable<fromGroups.State>;
  isLoadingGroups$: Observable<boolean>;
  ticks$: Observable<fromTicks.State>;
  ticksIsLoading$: Observable<boolean>;

  updateInterval: any;

  constructor(
    private ws: WsHandlerService,
    private store: Store<TradingState>,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.orders$ = this.store.pipe(select(Select.getOrders));
    this.isLoadingOrders$ = this.store.pipe(select(Select.isLoadingOrders));

    this.positions$ = this.store.pipe(select(Select.getPositions));
    this.isLoadingPositions$ = this.store.pipe(select(Select.isLoadingPositions));

    this.balance$ = this.store.pipe(select(Select.getBalance));
    this.isLoadingBalance$ = this.store.pipe(select(Select.isLoadingBalance));

    this.accounts$ = this.store.pipe(select(Select.getAccounts));
    this.isLoadingAccounts$ = this.store.pipe(select(Select.accountsIsLoading));

    this.groups$ = this.store.pipe(select(Select.getGroups));
    this.isLoadingGroups$ = this.store.pipe(select(Select.groupsIsLoading));

    this.ticks$ = this.store.pipe(select(Select.getTicks));
    this.ticksIsLoading$ = this.store.pipe(select(Select.ticksIsLoading));
  }

  ngOnInit() {
    /*
    * Load Total Data
    * */
    this.store.dispatch(new LoadGroups());
    this.store.dispatch(new LoadAccounts());
    this.store.dispatch(new LoadTicks());

    const id = this.route.snapshot.paramMap.get('id');
    const type = this.route.snapshot.paramMap.get('type');

    /*
    * Init
    * */
    this.store.dispatch(new LoadBalance({id: id, type: type}));
    this.store.dispatch(new LoadOrders({id: id, type: type}));
    this.store.dispatch(new LoadPositions({id: id, type: type, groupByPair: true}));

    this.route.params.subscribe(params => {
      this._id = params.id;
      this._type = params.type;
      /*
      * Set active tab
      * */
      this.ordersTabs.tabs[OrderTab[params.tab] || 0].active = true;
    });

    /*
    * update state
    * */
    this.updateInterval = setInterval(() => {
      if (!this._id || !this._type) {
        return;
      }

      this.store.dispatch(new UpdateTicks());
      this.store.dispatch(new UpdateBalance({id: this._id, type: this._type}));
      this.store.dispatch(new UpdateOrders({id: this._id, type: this._type}));
      this.store.dispatch(new UpdatePositions({id: this._id, type: this._type, groupByPair: true}));
    }, 2500);
  }

  ngOnDestroy() {
    clearInterval(this.updateInterval);
  }

  onSelectOrderTab(tabId) {
    const orderPromise = this.router.navigate([`../${tabId}`], {relativeTo: this.route});
    orderPromise.then(() => {
    });
  }
}
