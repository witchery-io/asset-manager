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
import { LoadGroups } from '@app/core/actions/group.actions';
import { LoadAccounts } from '@app/core/actions/account.actions';
import { LoadAccount } from '@settings/actions/account.actions';
import { ACCOUNTS, GROUPS } from '@app/shared/enums/trading.enum';
import { LoadGroup } from '@settings/actions/group.actions';
import { generateUrl } from '@settings/utils/settings.utils';
import { ModalService, OrdersService, PositionsService, SharedService } from '@app/shared/services';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-settings',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  currentId: string;
  currentType: string;
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
  updateInterval: any;
  settings = {};
  private readonly notifier: NotifierService;

  constructor(
    private store: Store<SettingsState>,
    private route: ActivatedRoute,
    private router: Router,
    private shared: SharedService,
    private ordersService: OrdersService,
    private positionsService: PositionsService,
    private modalService: ModalService,
    private notifierService: NotifierService,
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
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.store.dispatch(new LoadGroups());
    this.store.dispatch(new LoadAccounts());

    if (!this.route.firstChild) {
      return;
    }

    const hasGeneralTab = this.route.firstChild.snapshot.paramMap.has('generalTab');
    const urlGeneralTab = this.route.firstChild.snapshot.paramMap.get('generalTab');
    if (hasGeneralTab) {
      this.generalTabs.tabs[TypeTab[urlGeneralTab] || 0].active = true;
    }

    const hasOrderTab = this.route.firstChild.snapshot.paramMap.has('orderTab');
    const urlOrderTab = this.route.firstChild.snapshot.paramMap.get('orderTab');
    if (hasOrderTab) {
      this.ordersTabs.tabs[OrderTab[urlOrderTab] || 0].active = true;
    }

    const urlId = this.route.firstChild.snapshot.paramMap.get('id');
    const hasId = this.route.firstChild.snapshot.paramMap.has('id');
    if (hasId && hasGeneralTab) {
      if (urlGeneralTab === GROUPS) {
        this.store.dispatch(new LoadGroup(urlId));
      } else if (urlGeneralTab === ACCOUNTS) {
        this.store.dispatch(new LoadAccount(urlId));
      }
    }

    const urlSubId = this.route.firstChild.snapshot.paramMap.get('subId');
    const urlSubType = this.route.firstChild.snapshot.paramMap.get('subType');

    this.onSelect({id: urlId, type: urlGeneralTab, subId: urlSubId, subType: urlSubType});
    this.updateInterval = setInterval(() => this.updateState({currentId: this.currentId, currentType: this.currentType}), 3000);

    /*
    * order actions
    * */
    this.shared.getOrderCancel().subscribe(order => {
      this.ordersService.cancelOrder(order.orderNumber).subscribe(() => {
        this.store.dispatch(new LoadOrders({id: this.currentId, type: this.currentType}));
        this.modalService.closeAllModals();
        this.notifier.notify('success',
          `Order cancelled, ${order.type || 'type == undefined'},
             ${order.direction || 'direction == undefined'} ${order.amount || 'amount == undefined'}
             ${order.pair || 'pair == undefined'} @ ${order.price || 'price == undefined'}.`);
      });
    });

    this.shared.getOrderApprove().subscribe(params => {
      this.ordersService.cancelOrder(params.orderNumber).subscribe(() => {
        this.ordersService.placeOrder(this.currentId, this.currentType, params).subscribe((order: any) => {
          this.store.dispatch(new LoadOrders({id: this.currentId, type: this.currentType}));
          this.modalService.closeAllModals();
          this.notifier.notify('success',
            `Order modified, ${order.type || 'type == undefined'},
                 to ${order.direction || 'direction == undefined'} ${order.amount || 'amount == undefined'}
                  ${order.pair || 'pair == undefined'} @ ${order.price || 'price == undefined'}.`);
        });
      });
    });

    /*
    * position actions
    * */
    this.shared.getPositionClose().subscribe(position => {
      this.positionsService.closePosition(position.id).subscribe(() => {
        this.store.dispatch(new LoadPositions({id: this.currentId, type: this.currentType}));
        this.modalService.closeAllModals();
        this.notifier.notify('success',
          `Order cancelled,
             ${position.type || 'type == undefined'}, ${position.direction || 'direction == undefined'}
              ${position.amount || 'amount == undefined'} ${position.pair || 'pair == undefined'}
               @ ${position.openPrice || 'openPrice == undefined'}.`);
      });
    });

    this.shared.getPositionPlace().subscribe(params => {
      this.ordersService.placeOrder(this.currentId, this.currentType, params).subscribe((position: any) => {
        this.store.dispatch(new LoadPositions({id: this.currentId, type: this.currentType}));
        this.modalService.closeAllModals();
        this.notifier.notify('success',
          `Placed ${position.type || 'type == undefined'} order to ${position.direction || 'direction == undefined'}
             ${position.amount || 'amount == undefined'} ${position.pair || 'pair == undefined'}
              @ ${position.openPrice || 'openPrice == undefined'}.`);
      });
    });
  }

  ngOnDestroy() {
    this.forcedCleanState();
    clearInterval(this.updateInterval);
  }

  /**
   * @param generalTabName ex. groups, accounts
   */
  onSelectGeneralTab(generalTabName: string) {
    const settings = this.settings[generalTabName];
    if (!settings) {
      const defPromise = this.router.navigate([`settings/${generalTabName}`]);
      defPromise.then(() => {
        this.currentId = null;
        this.currentType = null;
        this.forcedCleanState();
      });
      return;
    }

    const url = generateUrl(settings);
    const routerPromise = this.router.navigate([url]);

    routerPromise.then(() => {
      this.putState({currentId: settings.subId || settings.id, currentType: settings.subType || settings.type});
    });
  }

  /**
   *
   * @param orderTabName string ex. positions, orders
   */
  onSelectOrderTab(orderTabName: string) {
    /*    console.log('self - settings', this.settings);

        const hasId = this.route.firstChild.snapshot.paramMap.has('id');
        if (!hasId) {
          return;
        }

        const generalTab = this.route.firstChild.snapshot.paramMap.get('generalTab');
        const hasOrderTab = this.route.firstChild.snapshot.paramMap.has('orderTab');
        const url = (hasOrderTab ? '../' : './') + orderTabName;
        const orderPromise = this.router.navigate([url], {relativeTo: this.route.firstChild});
        orderPromise.then(() => {
          this.settings[generalTab]['orderTab'] = orderTabName;
        });*/
  }

  /**
   * select account and group
   * @param params: obj
   */
  onSelect(params) {
    this.settings[params.type] = params;
    const url = generateUrl(params);
    const routerPromise = this.router.navigate([url]);

    routerPromise.then(() => {
      this.putState({currentId: params.subId || params.id, currentType: params.subType || params.type});
    });
  }

  /**
   * clean State
   */
  private forcedCleanState() {
    this.store.dispatch(new CleanUpBalance());
    this.store.dispatch(new CleanUpOrders());
    this.store.dispatch(new CleanUpPositions());
  }

  /**
   * update new params to state
   * @param params :: array
   */
  private updateState(params) {
    if (!params.currentId || !params.currentType) {
      return;
    }

    this.store.dispatch(new UpdateBalance({id: params.currentId, type: params.currentType}));
    this.store.dispatch(new UpdateOrders({id: params.currentId, type: params.currentType}));
    this.store.dispatch(new UpdatePositions({id: params.currentId, type: params.currentType}));
  }

  /**
   * set new params to state
   * @param params :: array
   */
  private putState(params) {
    if (!params.currentId || !params.currentType) {
      return;
    }

    this.currentId = params.currentId;
    this.currentType = params.currentType;

    this.store.dispatch(new LoadBalance({id: params.currentId, type: params.currentType}));
    this.store.dispatch(new LoadOrders({id: params.currentId, type: params.currentType}));
    this.store.dispatch(new LoadPositions({id: params.currentId, type: params.currentType}));
  }
}
