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
import { CleanUpBalance, LoadBalance } from '@settings/actions/balance.actions';
import { CleanUpOrders, LoadOrders } from '@settings/actions/orders.actions';
import { CleanUpPositions, LoadPositions } from '@settings/actions/positions.actions';
import { SharedService } from '@app/shared/services';

@Component({
  selector: 'app-trading',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

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

  group$: Observable<any>;
  account$: Observable<any>;

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

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.generalTabs.tabs[TypeTab[params.generalTab] || 0].active = true;
      this.ordersTabs.tabs[OrderTab[params.orderTab] || 0].active = true;
    });

    this.shared.settingsSubject.subscribe(params => {
      this.shared.saveSettings[params.generalTab] = params;

      const orderTab = this.router.navigate([this._url(params)]);

      orderTab.then(() => {
        const data = {
          id: params.subId || params.id,
          type: params.subType || params.type,
        };

        this.setState(data);
      });
    });
  }

  /**
   *
   * @param generalTabName ex. groups, accounts
   */
  onSelectGeneralTab(generalTabName: string) {
    const params = this.shared.saveSettings[generalTabName];

    if (!params) {
      const defaultSettings = this.router.navigate([this._url({generalTab: generalTabName})]);
      defaultSettings.then(() => {
        this.cleanState();
      });
      return;
    }

    const orderTab = this.router.navigate([this._url(params)]);

    orderTab.then(() => {
      this.setState({
        id: params.subId || params.id,
        type: params.subType || params.type,
      });
    });
  }

  /**
   *
   * @param orderTabName string ex. positions, orders
   */
  onSelectOrderTab(orderTabName: string) {
    const generalTab = this.route.snapshot.paramMap.get('generalTab');
    if (!generalTab) {
      return;
    }

    const params = this.shared.saveSettings[generalTab];
    // params.orderTab = orderTabName;

    const orderTab = this.router.navigate([this._url(params)]);

    orderTab.then(() => {
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
   * se new params to state
   * @param params :: array
   */
  private setState(params) {
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
  }

  /**
   *
   * @param params :: generating url segments array
   * only this module
   */
  private _url(params) {

    let strUrl = './settings';
    if (params.generalTab) {
      strUrl += `/${params.generalTab}`;
    }

    if (params.id) {
      strUrl += `/${params.id}`;
    }

    if (params.subType) {
      strUrl += `/${params.subType}/${params.subId}`;
    }

    if (params.orderTab) {
      strUrl += `/${params.orderTab}`;
    }

    return strUrl;
  }
}
