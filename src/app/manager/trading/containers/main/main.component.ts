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
import { DomSanitizer } from '@angular/platform-browser';
import { ModalService, OrdersService, PositionsService, SharedService } from '@app/shared/services';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-trading',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  currentId: string;
  currentType: string;
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
  /*
  * chart url
  * */
  chartUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.tradingview.com/widgetembed/?frameElementId=tradingview_ca6f4&symbol=BITFINEX:BTCUSD&interval=D&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=Dark&style=1&timezone=Asia%2FDubai&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en&utm_source=www.tradingview.com&utm_medium=widget_new&utm_campaign=chart&utm_term=BITFINEX:BTCUSD`);
  private readonly notifier: NotifierService;

  constructor(
    private ws: WsHandlerService,
    private store: Store<TradingState>,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
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
    this.isLoadingAccounts$ = this.store.pipe(select(Select.accountsIsLoading));
    this.groups$ = this.store.pipe(select(Select.getGroups));
    this.isLoadingGroups$ = this.store.pipe(select(Select.groupsIsLoading));
    this.ticks$ = this.store.pipe(select(Select.getTicks));
    this.ticksIsLoading$ = this.store.pipe(select(Select.ticksIsLoading));
    this.notifier = notifierService;
  }

  /**
   * Get accessible index
   * @param name: string
   */
  static tabIndex(name: string) {
    return OrderTab[name] || 0;
  }

  ngOnInit() {
    const urlId = this.route.snapshot.paramMap.get('id');
    const urlType = this.route.snapshot.paramMap.get('type');
    const urlTabName = this.route.snapshot.paramMap.get('tab');

    this.currentId = urlId;
    this.currentType = urlType;
    this.ordersTabs.tabs[MainComponent.tabIndex(urlTabName)].active = true;

    /*
    * Init
    * */
    this.store.dispatch(new LoadBalance({id: urlId, type: urlType}));
    this.store.dispatch(new LoadOrders({id: urlId, type: urlType}));
    this.store.dispatch(new LoadPositions({id: urlId, type: urlType, groupByPair: true}));

    /*
    * Load CORE Data
    * */
    this.store.dispatch(new LoadGroups());
    this.store.dispatch(new LoadAccounts());
    this.store.dispatch(new LoadTicks());

    /*
    * update state
    * */
    this.updateInterval = setInterval(() => {
      if (!this.currentId || !this.currentType) {
        return;
      }

      this.store.dispatch(new UpdateTicks());
      this.store.dispatch(new UpdateBalance({id: this.currentId, type: this.currentType}));
      this.store.dispatch(new UpdateOrders({id: this.currentId, type: this.currentType}));
      this.store.dispatch(new UpdatePositions({id: this.currentId, type: this.currentType, groupByPair: true}));
    }, 2500);

    /*
    * order actions
    * */
    this.shared.getOrderCancel().subscribe(order => {
      this.ordersService.cancelOrder(order.orderNumber)
        .subscribe(() => {
          this.store.dispatch(new LoadOrders({id: this.currentId, type: this.currentType}));
          this.modalService.closeAllModals();
          this.notifier.notify('success',
            `Order cancelled, ${order.type || 'type == undefined'},
             ${order.direction || 'direction == undefined'} ${order.amount || 'amount == undefined'}
             ${order.pair || 'pair == undefined'} @ ${order.price || 'price == undefined'}.`);
        });
    });

    this.shared.getOrderApprove().subscribe(params => {
      this.ordersService.cancelOrder(params.orderNumber)
        .subscribe(() => {
          this.ordersService.placeOrder(this.currentId, this.currentType, params)
            .subscribe((order: any) => {
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
      this.positionsService.closePosition(position.id)
        .subscribe(() => {
          this.store.dispatch(new LoadPositions({id: this.currentId, type: this.currentType, groupByPair: true}));
          this.modalService.closeAllModals();
          this.notifier.notify('success',
            `Order cancelled,
             ${position.type || 'type == undefined'}, ${position.direction || 'direction == undefined'}
              ${position.amount || 'amount == undefined'} ${position.pair || 'pair == undefined'}
               @ ${position.openPrice || 'openPrice == undefined'}.`);
        });
    });

    this.shared.getPositionPlace().subscribe(params => {
      this.ordersService.placeOrder(this.currentId, this.currentType, params)
        .subscribe((position: any) => {
          this.store.dispatch(new LoadPositions({id: this.currentId, type: this.currentType, groupByPair: true}));
          this.modalService.closeAllModals();
          this.notifier.notify('success',
            `Placed ${position.type || 'type == undefined'} order to ${position.direction || 'direction == undefined'}
             ${position.amount || 'amount == undefined'} ${position.pair || 'pair == undefined'}
              @ ${position.openPrice || 'openPrice == undefined'}.`);
        });
    });
  }

  ngOnDestroy() {
    clearInterval(this.updateInterval);
  }

  selectTab(tabId): void {
    const orderPromise = this.router.navigate([`../${tabId}`], {relativeTo: this.route});
    orderPromise.then(() => '');
  }

  onSelect(params: { currentId: string, currentType: string }) {
    this.currentId = params.currentId;
    this.currentType = params.currentType;

    this.store.dispatch(new LoadOrders({id: params.currentId, type: params.currentType}));
    this.store.dispatch(new LoadPositions({id: params.currentId, type: params.currentType, groupByPair: true}));
    this.store.dispatch(new LoadBalance({id: params.currentId, type: params.currentType}));
    this.store.dispatch(new LoadTicks());
  }

  /*
  * changes chart url
  * */
  onSelectTick(pair) {
    this.chartUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.tradingview.com/widgetembed/?frameElementId=tradingview_ca6f4&symbol=BITFINEX:${pair}&interval=D&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=Dark&style=1&timezone=Asia%2FDubai&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en&utm_source=www.tradingview.com&utm_medium=widget_new&utm_campaign=chart&utm_term=BITFINEX:${pair}`);
  }
}
