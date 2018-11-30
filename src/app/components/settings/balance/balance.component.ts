import { Component } from '@angular/core';
import { OrderService } from '../../../services';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent {

  constructor(
    private orderService: OrderService,
  ) { }

  get tradeType() {
    return this.orderService.tradeType;
  }

  get balance() {
    return this.orderService.balance;
  }
}
