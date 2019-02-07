import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderTab, TypeTab } from '@app/shared/enums';
import { TabsetComponent } from 'ngx-bootstrap';
import { select, Store } from '@ngrx/store';
import * as Select from '@settings/state/settings.selectors';
import { SettingsState } from '@settings/reducers';
import { Observable, Subscription } from 'rxjs';
import * as fromOrders from '@settings/reducers/orders.reducers';
import * as fromPositions from '@settings/reducers/positions.reducers';
import * as fromBalance from '@settings/reducers/balance.reducers';
import * as fromAccounts from '@app/core/reducers/account.reducers';
import * as fromGroups from '@app/core/reducers/group.reducers';
import { CleanUpBalance, LoadBalance, UpdateBalance } from '@settings/actions/balance.actions';
import { CleanUpOrders, LoadOrders, UpdateOrders } from '@settings/actions/orders.actions';
import { CleanUpPositions, LoadPositions, UpdatePositions } from '@settings/actions/positions.actions';
import { SharedService } from '@app/shared/services';
import { generateUrl } from '@settings/utils/settings.utils';
import { LoadGroups } from '@app/core/actions/group.actions';
import { LoadAccounts } from '@app/core/actions/account.actions';

@Component({
  selector: 'app-settings',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  _id: string;
  _type: string;
  @ViewChild('generalTabs')
  generalTabs: TabsetComponent;
  @ViewChild('ordersTabs')
  ordersTabs: TabsetComponent;
  orders$: Observable<fromOrders.State>;
  isLoadingOrders$: Observable<boolean>;
  positions$: Observable<fromPositions.State>;
  isLoadingPositions$: Observable<boolean>;
  balance$: Observable<fromBalance.State>;
  isLoadingBalance$: Observable<boolean>;
  accounts$: Observable<fromAccounts.State>;
  groups$: Observable<fromGroups.State>;
  group$: Observable<any>;
  account$: Observable<any>;
  subscription: Subscription;
  interval: any;

  constructor(
    private store: Store<SettingsState>,
    private route: ActivatedRoute,
    private router: Router,
    private shared: SharedService,
  ) {
    this.orders$ = this.store.pipe(select(Select.getOrders));
    this.isLoadingOrders$ = this.store.pipe(select(Select.isLoadingOrders));

    this.positions$ = this.store.pipe(select(Select.getPositions));
    this.isLoadingPositions$ = this.store.pipe(select(Select.isLoadingPositions));

    this.balance$ = this.store.pipe(select(Select.getBalance));
    this.isLoadingBalance$ = this.store.pipe(select(Select.isLoadingBalance));

    this.accounts$ = this.store.pipe(select(Select.getAccounts));
    this.groups$ = this.store.pipe(select(Select.getGroups));

    this.group$ = this.store.pipe(select(Select.getGroup));
    this.account$ = this.store.pipe(select(Select.getAccount));
  }

  static isSame(obj1, obj2) {
    if (!obj1 || !obj2) {
      return false;
    }

    return obj1.id === obj2.id
      && obj1.subId === obj2.subId
      && obj1.type === obj2.type
      && obj1.subType === obj2.subType;
  }

  ngOnInit() {
    /* Load Total Data */
    this.store.dispatch(new LoadGroups());
    this.store.dispatch(new LoadAccounts());

    /* This case is checks, has paren route active child route */
    if (this.route.firstChild) {
      const generalTab = this.route.firstChild.snapshot.paramMap.get('generalTab');
      const orderTab = this.route.firstChild.snapshot.paramMap.get('orderTab');
      this.generalTabs.tabs[TypeTab[generalTab] || 0].active = true;
      this.ordersTabs.tabs[OrderTab[orderTab] || 0].active = true;
    }

    this.subscription = this.shared.getSettings()
      .subscribe(params => {
        const currParams = this.shared.saveSettings[params.generalTab];

        /* check there are same values */
        if (MainComponent.isSame(currParams, params)) {
          return;
        }

        this.shared.saveSettings[params.generalTab] = params;

        /* change current navigation */
        const orderTab = this.router.navigate([generateUrl(params)]);

        orderTab.then(() => {
          this._id = params.subId || params.id;
          this._type = params.subType || params.type;

          this.setState({
            id: this._id,
            type: this._type,
          });
        });
      });

    /* update state */
    this.interval = setInterval(() => {
      this.updateState({id: this._id, type: this._type});
    }, 3000);
  }

  /* Clean State on destroy */
  ngOnDestroy() {
    this.cleanState();
    this.subscription.unsubscribe();
    clearInterval(this.interval);
  }

  /**
   *
   * @param generalTabName ex. groups, accounts
   */
  onSelectGeneralTab(generalTabName: string) {
    const params = this.shared.saveSettings[generalTabName];
    if (!params) {
      const defaultSettings = this.router.navigate([generateUrl({generalTab: generalTabName})]);
      defaultSettings.then(() => {
        this.cleanState();

        /* it`s works :: buy will be changed */
        this._id = null;
        this._type = null;
      });
      return;
    }
    const orderTab = this.router.navigate([generateUrl(params)]);
    orderTab.then((status) => {
      if (status) {
        this._id = params.subId || params.id;
        this._type = params.subType || params.type;
        this.setState({id: this._id, type: this._type});
      }
    });
  }

  /**
   *
   * @param orderTabName string ex. positions, orders
   */
  onSelectOrderTab(orderTabName: string) {
    if (!this.route.firstChild) {
      return;
    }

    const generalTab = this.route.firstChild.snapshot.paramMap.has('generalTab');
    if (!generalTab) {
      return;
    }

    const id = this.route.firstChild.snapshot.paramMap.has('id');
    if (!id) {
      return;
    }

    const generalTabName = this.route.firstChild.snapshot.paramMap.get('generalTab');
    /* change current orderTab name */
    const params = this.shared.saveSettings[generalTabName];
    if (params) {
      this.shared.saveSettings[generalTabName]['orderTab'] = orderTabName;
    }

    const hasOrderTab = this.route.firstChild.snapshot.paramMap.has('orderTab');
    const url = (hasOrderTab ? '../' : './') + orderTabName;
    const orderPromise = this.router.navigate([url], {relativeTo: this.route.firstChild});
    orderPromise.then(() => {
    });
  }

  /**
   * clean State
   */
  private cleanState() {
    this.store.dispatch(new CleanUpBalance());
    this.store.dispatch(new CleanUpOrders());
    this.store.dispatch(new CleanUpPositions());
  }

  /**
   * set new params to state
   * @param params :: array
   */
  private setState(params) {
    this.store.dispatch(new LoadBalance({id: params.id, type: params.type}));
    this.store.dispatch(new LoadOrders({id: params.id, type: params.type}));
    this.store.dispatch(new LoadPositions({id: params.id, type: params.type}));
  }

  /**
   * update new params to state
   * @param params :: array
   */
  private updateState(params) {
    if (!params.id) {
      return;
    }

    this.store.dispatch(new UpdateBalance({id: params.id, type: params.type}));
    this.store.dispatch(new UpdateOrders({id: params.id, type: params.type}));
    this.store.dispatch(new UpdatePositions({id: params.id, type: params.type}));
  }
}
