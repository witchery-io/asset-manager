import { Component, OnInit } from '@angular/core';
import { WsHandlerService } from '@trading/services/ws/ws-handler.service';
import { Store } from '@ngrx/store';
import { TradingState } from '@trading/reducers';

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
  }
}
