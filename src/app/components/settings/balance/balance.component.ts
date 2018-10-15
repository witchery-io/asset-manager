import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent implements OnInit, OnChanges {

  @Input() values: any;

  selectedOrder: number;
  selectedPosition: number;
  orderType = ['buy', 'sell'];
  orders = [];

  constructor(
    private orderService: OrderService,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    this.fetchOrders();
  }

  ngOnInit() {
    this.fetchOrders();
  }

  fetchOrders() {
    this.orderService.getGroupOrders(this.values.id, {})
      .subscribe(
        orders => {
          this.orders = orders;
        }
      );
  }
}
