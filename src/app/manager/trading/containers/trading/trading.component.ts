import { Component, OnInit } from '@angular/core';
import { WsHandlerService } from '@trading/services/ws/ws-handler.service';
import { Store } from '@ngrx/store';
import { TradingState } from '@trading/reducers';
import { LoadBalance } from '@trading/actions/balance.actions';
import { LoadOrders } from '@trading/actions/orders.actions';
import { LoadPositions } from '@trading/actions/positions.actions';

@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.styl'],
})
export class TradingComponent implements OnInit {

  constructor(
    private ws: WsHandlerService,
    private store: Store<TradingState>,
  ) {}

  ngOnInit() {
    this.store.dispatch(new LoadBalance());
    this.store.dispatch(new LoadOrders());
    this.store.dispatch(new LoadPositions());
  }
}
