import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderTab, TypeTab } from '@app/shared/enums';
import { TabsetComponent } from 'ngx-bootstrap';
import { ACCOUNTS, GROUPS } from '@app/shared/enums/trading.enum';
import { select, Store } from '@ngrx/store';
import * as Select from '@settings/state/settings.selectors';
import { SettingsState } from '@settings/reducers';
import { Observable } from 'rxjs';
import * as fromOrders from '@settings/reducers/orders.reducers';
import * as fromPositions from '@settings/reducers/positions.reducers';
import * as fromBalance from '@settings/reducers/balance.reducers';
import * as fromAccounts from '@app/core/reducers/account.reducers';
import * as fromGroups from '@app/core/reducers/group.reducers';
import * as fromTicks from '@app/core/reducers/tick.reducers';
import { SettingsSet } from '@settings/actions/settings.actions';
import { LoadBalance } from '@settings/actions/balance.actions';
import { LoadOrders } from '@settings/actions/orders.actions';
import { LoadPositions } from '@settings/actions/positions.actions';
import { LoadGroup } from '@settings/actions/group.actions';
import { LoadAccount } from '@settings/actions/account.actions';

@Component({
  selector: 'app-trading',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @ViewChild('typeTabs') typeTabs: TabsetComponent;
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

  group$: Observable<any>;
  account$: Observable<any>;

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

    this.group$ = this.store.pipe(select(Select.getGroup));
    this.account$ = this.store.pipe(select(Select.getAccount));
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    let type = this.route.snapshot.paramMap.get('type');
    const active_tab = this.route.snapshot.paramMap.get('tab');

    if (!id) {
      type = ACCOUNTS;
      id = this.route.snapshot.paramMap.get('accountId');
    }

    /*
    * Set active tab
    * */
    this.ordersTabs.tabs[OrderTab[active_tab] || this._defaultTabIndex].active = true;
    this.typeTabs.tabs[TypeTab[type] || this._defaultTabIndex].active = true;

    /*
    * Set current trading id and type
    * */
    this.store.dispatch(new SettingsSet({id: id, type: type, groupByPair: this.groupByPair}));
    this.store.dispatch(new LoadGroup(id));
    this.store.dispatch(new LoadAccount(id));

    /*
    * Load data
    * */
    this.store.dispatch(new LoadBalance({id: id, type: type, groupByPair: this.groupByPair}));
    this.store.dispatch(new LoadOrders({id: id, type: type, groupByPair: this.groupByPair}));
    this.store.dispatch(new LoadPositions({id: id, type: type, groupByPair: this.groupByPair}));
  }

  onSelectTypeTab(type_tab) {
    const order_tab = this.route.snapshot.paramMap.get('tab');
    const typePromise = this._navigate(type_tab, order_tab);

    typePromise.then(() => {
      this.typeTabs.tabs[TypeTab[type_tab] || this._defaultTabIndex].active = true;
    });
  }

  onSelectOrderTab(tab_id) {
    const orderPromise = this.router.navigate([`../${tab_id}`], {relativeTo: this.route});

    orderPromise.then(() => {
      this.ordersTabs.tabs[OrderTab[tab_id] || this._defaultTabIndex].active = true;
    });
  }

  private _navigate(type_tab, order_tab) {
    const id = type_tab === GROUPS ? '6a86df61-c190-4347-9b61-34cbd88d38a4' : 'edc23b04-64d8-4469-bb6a-40da55322d26'; // todo :: change
    return this.router.navigate([`../../../${type_tab}/${id}/${order_tab}/`], {relativeTo: this.route});
  }
}
