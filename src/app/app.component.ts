import { Component, OnInit } from '@angular/core';
import {
  TickService,
  OrderService,
  BotService,
} from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private orderService: OrderService,
    private botService: BotService,
    private tickService: TickService,
  ) {
  }

  ngOnInit() {
    this.fetchData();
    setInterval(() => this.fetchData(), 16000);
  }

  fetchData() {
    this.tickService.fetchTicks();
    this.botService.fetchBots();
    if (this.orderService.tradeTypeId && this.orderService.tradeType) {
      this.orderService.fetchOrders();
      this.orderService.fetchPositions();
      this.orderService.fetchBalance();
    }
  }
}
