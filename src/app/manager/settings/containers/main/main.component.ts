import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderTab, TypeTab } from '@app/shared/enums';
import { TabsetComponent } from 'ngx-bootstrap';
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
import { ACCOUNTS, GROUPS } from '@app/shared/enums/trading.enum';
import { LoadBalance } from '@settings/actions/balance.actions';
import { LoadOrders } from '@settings/actions/orders.actions';
import { LoadPositions } from '@settings/actions/positions.actions';

@Component({
  selector: 'app-trading',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  GROUPS = GROUPS;
  ACCOUNTS = ACCOUNTS;

  @ViewChild('generalTabs') generalTabs: TabsetComponent;
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

  group$: Observable<any>;
  account$: Observable<any>;

  _defaultTabIndex = 0;
  groupByPair = false;

  /**
   * 3 param of url ex. accounts, groups
   */
  type: string;

  /*
  * General Tab
  * */
  generalTab: string;

  /*
  * Order Tab
  * */
  orderTab: string;

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

    this.group$ = this.store.pipe(select(Select.getGroup));
    this.account$ = this.store.pipe(select(Select.getAccount));
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      /*
      * Set Type
      * */
      this.type = params.type;

      /*
      * Set tabs from url
      * */
      this.generalTab = params.generalTab;
      this.orderTab = params.orderTab;

      /*
      * Set active tabs
      * */
      this.generalTabs.tabs[TypeTab[params.generalTab] || this._defaultTabIndex].active = true;
      this.ordersTabs.tabs[OrderTab[params.orderTab] || this._defaultTabIndex].active = true;

      this.store.dispatch(new LoadBalance({
        id: params.id,
        type: params.type,
      }));
      this.store.dispatch(new LoadOrders({
        id: params.id,
        type: params.type,
      }));
      this.store.dispatch(new LoadPositions({
        id: params.id,
        type: params.type,
      }));
    });
  }

  /**
   *
   * @param name ex. groups, accounts
   */
  onSelectGeneralTab(name: string) {
    const orderTab = this.route.snapshot.paramMap.get('orderTab');
    const genTab = this.router.navigate([`../../${name}/${orderTab}`], {relativeTo: this.route});

    genTab.then(() => {
    });
  }

  /**
   *
   * @param name string ex. positions, orders
   */
  onSelectOrderTab(name: string) {
    const orderTab = this.router.navigate([`../${name}`], {relativeTo: this.route});

    orderTab.then(() => {
    });
  }
}
