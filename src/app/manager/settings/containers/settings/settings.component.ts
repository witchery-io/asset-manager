import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { SettingsState } from '@settings/reducers';
import { LoadBalance } from '@settings/actions/balance.actions';
import { LoadOrders } from '@settings/actions/orders.actions';
import { LoadPositions } from '@settings/actions/positions.actions';
import { SettingsSet } from '@settings/actions/settings.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderTab } from '@app/shared/enums';
import { TabsetComponent } from 'ngx-bootstrap';
import { Observable } from 'rxjs';
import * as Select from '@settings/state/settings.selectors';
import * as fromOrders from '@settings/reducers/orders.reducers';
import * as fromPositions from '@settings/reducers/positions.reducers';
import * as fromBalance from '@settings/reducers/balance.reducers';
import * as fromAccounts from '@app/core/reducers/account.reducers';
import * as fromGroups from '@app/core/reducers/group.reducers';
import * as fromTicks from '@app/core/reducers/tick.reducers';

@Component({
  selector: 'app-trading',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  @ViewChild('ordersTabs') ordersTabs: TabsetComponent;

  orders$: Observable<fromOrders.State>;
  isLoadingOrders$: Observable<boolean>;

  positions$: Observable<fromPositions.State>;
  isLoadingPositions$: Observable<boolean>;

  balance$: Observable<fromBalance.State>;
  isLoadingBalance$: Observable<boolean>;

  accounts$: Observable<fromAccounts.State>;
  groups$: Observable<fromGroups.State>;
  ticks$: Observable<fromTicks.State>;
  ticksIsLoading$: Observable<boolean>;

  type$: Observable<string>;
  id$: Observable<string>;

  _defaultTabIndex = 0;
  groupByPair = false;

  constructor(
    private store: Store<SettingsState>,
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
    this.groups$ = this.store.pipe(select(Select.getGroups));

    this.ticks$ = this.store.pipe(select(Select.getTicks));
    this.ticksIsLoading$ = this.store.pipe(select(Select.ticksIsLoading));

    this.type$ = this.store.pipe(select(Select.getType));
    this.id$ = this.store.pipe(select(Select.getId));
  }

  ngOnInit() {
    console.log('Settings Component');
    this.route.params.subscribe(params => {
      console.log(params);
    });

    const id = this.route.snapshot.paramMap.get('id');
    const type = this.route.snapshot.paramMap.get('type');
    const active_tab = this.route.snapshot.paramMap.get('tab');

    /*
    * Set active tab
    * */
    this.ordersTabs.tabs[OrderTab[active_tab] || this._defaultTabIndex].active = true;

    /*
    * Set current settings id and type
    * */
    this.store.dispatch(new SettingsSet({tradingId: id, tradingType: type, groupByPair: this.groupByPair}));

    /*
    * Load data
    * */
    this.store.dispatch(new LoadBalance({tradingId: id, tradingType: type, groupByPair: this.groupByPair}));
    this.store.dispatch(new LoadOrders({tradingId: id, tradingType: type, groupByPair: this.groupByPair}));
    this.store.dispatch(new LoadPositions({tradingId: id, tradingType: type, groupByPair: this.groupByPair}));
  }

  onSelectOrderTab(tab_id) {
    const orderPromise = this.router.navigate([`../${tab_id}`], {relativeTo: this.route});

    orderPromise.then(() => {
      this.ordersTabs.tabs[OrderTab[tab_id] || this._defaultTabIndex].active = true;
    });
  }
}
