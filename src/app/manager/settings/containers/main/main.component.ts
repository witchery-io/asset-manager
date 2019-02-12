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
    /*
    * Set default and save tab
    * */
    this.setTabs({
      generalTabName: this.route.firstChild.snapshot.paramMap.get('generalTab'),
      orderTabName: this.route.firstChild.snapshot.paramMap.get('orderTab'),
    });

    /*
    * Load Total Data
    * */
    this.store.dispatch(new LoadGroups());
    this.store.dispatch(new LoadAccounts());

    /*
    * set account or group params
    * */
    this.subscription = this.shared.getSettingsObs()
      .subscribe(params => {
        const savedParams = this.shared.sParams[params.generalTab];

        /*
         * check there are same values
         * */
        if (MainComponent.isSame(savedParams, params)) {
          return;
        }

        this.shared.setSParams(params.generalTab, params);

        /*
         * change current navigation
         * */
        const orderTab = this.router.navigate([generateUrl(params)]);

        orderTab.then(() => {
          this._id = params.subId || params.id;
          this._type = params.subType || params.type;

          this.setState({id: this._id, type: this._type});
        });
      });

    /*
    * update state
    * */
/*    this.interval = setInterval(() => {
      this.updateState({id: this._id, type: this._type});
    }, 3000);*/
  }

  /* Clean State on destroy */
  ngOnDestroy() {
    this.cleanState();
    this.subscription.unsubscribe();
    clearInterval(this.interval);
  }

  /**
   * @param generalTabName ex. groups, accounts
   */
  onSelectGeneralTab(generalTabName: string) {

    const params = this.shared.sParams[generalTabName];
    if (!params) {
      const orderTab = this.router.navigate([generateUrl({generalTab: generalTabName})]);
      orderTab.then(() => {
        this._id = null;
        this._type = null;

        this.setTabs({generalTabName: generalTabName, orderTabName: 'orders'});
        this.cleanState();
      });
    } else {
      const orderTab = this.router.navigate([generateUrl(params)]);
      orderTab.then((status) => {
        if (status) {
          this._id = params.subId || params.id;
          this._type = params.subType || params.type;

          this.setState({id: this._id, type: this._type});
          this.setTabs({generalTabName: params['generalTab'], orderTabName: params['orderTab']});
        }
      });
    }
  }

  /**
   *
   * @param orderTabName string ex. positions, orders
   */
  onSelectOrderTab(orderTabName: string) {
    if (!this.route.firstChild) {
      return;
    }

    const hasGeneralTab = this.route.firstChild.snapshot.paramMap.has('generalTab');
    if (!hasGeneralTab) {
      return;
    }

    const hasId = this.route.firstChild.snapshot.paramMap.has('id');
    if (!hasId) {
      return;
    }

    const generalTab = this.route.firstChild.snapshot.paramMap.get('generalTab');
    const hasOrderTab = this.route.firstChild.snapshot.paramMap.has('orderTab');
    const url = (hasOrderTab ? '../' : './') + orderTabName;
    const orderPromise = this.router.navigate([url], {relativeTo: this.route.firstChild});
    orderPromise.then(() => {
      this.shared.setSParams(generalTab, {
        orderTab: orderTabName,
      });
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
    if (!params.id) {
      return;
    }

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

  /*
  * set TAB
  * */
  private setTabs(tabs) {
    const defTab = 0;
    this.generalTabs.tabs[TypeTab[tabs.generalTabName] || defTab].active = true;
    this.ordersTabs.tabs[OrderTab[tabs.orderTabName] || defTab].active = true;
  }
}
