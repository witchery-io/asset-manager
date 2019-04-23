import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { WsHandlerService } from '@trading/services/ws/ws-handler.service';
import { select, Store } from '@ngrx/store';
import { TradingState } from '@trading/reducers';
import { OrderCancel, OrderPlace } from '@trading/actions/orders.actions';
import { PositionClose, PositionPlace } from '@trading/actions/positions.actions';
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
import { OrderTab, Role } from '@app/shared/enums';
import { LoadGroups } from '@app/core/actions/group.actions';
import { LoadAccounts } from '@app/core/actions/account.actions';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalService, OrdersService, PositionsService, SharedService } from '@app/shared/services';
import { NotifierService } from 'angular-notifier';
import { WebSocketService } from '@trading/services/ws/web-socket.service';
import { GROUPS } from '@app/shared/enums/trading.enum';

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
  readonly: boolean;

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
    private wsHandlerService: WsHandlerService,
    private webSocketService: WebSocketService,
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

    wsHandlerService.start();
  }

  get currentSingularType() {
    return this.currentType === GROUPS ? 'group' : 'account';
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
    * Load CORE Data
    * */
    this.store.dispatch(new LoadGroups());
    this.store.dispatch(new LoadAccounts());

    /*
    * order actions
    * */
    this.shared.getOrderCancel().subscribe(order => {
      this.store.dispatch(new OrderCancel(order));
    });

    this.shared.getOrderApprove().subscribe(params => {
      this.store.dispatch(new OrderPlace({id: this.currentId, type: this.currentType, params: params}));
    });

    /*
    * position actions
    * */
    this.shared.getPositionClose().subscribe(position => {
      this.store.dispatch(new PositionClose(position));
    });

    this.shared.getPositionPlace().subscribe(params => {
      this.store.dispatch(new PositionPlace({id: this.currentId, type: this.currentType, params: params}));
    });

    this.webSocketService.send(
      {
        event: 'subscribe',
        channel: 'all',
        options: `${this.currentSingularType}:${urlId}`,
      }
    );

    this.readonly = localStorage.getItem('role') !== Role.ADMIN;
  }

  ngOnDestroy() {
    this.webSocketService.close();
  }

  selectTab(tabId): void {
    const orderPromise = this.router.navigate([`../${tabId}`], {relativeTo: this.route});
    orderPromise.then(() => '');
  }

  onSelect(params: { currentId: string, currentType: string }) {
    this.webSocketService.send(
      {
        event: 'unsubscribe',
        channel: 'all',
        options: `${this.currentSingularType}:${this.currentId}`,
      }
    );

    this.currentId = params.currentId;
    this.currentType = params.currentType;

    this.webSocketService.send(
      {
        event: 'subscribe',
        channel: 'all',
        options: `${this.currentSingularType}:${this.currentId}`,
      }
    );
  }

  /*
  * changes chart url
  * */
  onSelectTick(pair) {
    this.chartUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.tradingview.com/widgetembed/?frameElementId=tradingview_ca6f4&symbol=BITFINEX:${pair}&interval=D&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=Dark&style=1&timezone=Asia%2FDubai&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en&utm_source=www.tradingview.com&utm_medium=widget_new&utm_campaign=chart&utm_term=BITFINEX:${pair}`);
  }
}
