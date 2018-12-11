import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '@app/core/services';

@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.styl']
})
export class TradingComponent implements OnInit {

  constructor(
    private ws: WebSocketService,
  ) {}

  ngOnInit() {
    console.log('TRADING COMPONENTS');
    this.ws.start('2');

  }
}
