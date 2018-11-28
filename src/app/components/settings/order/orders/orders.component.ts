import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../services';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {

  permission = 'parent';

  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit() {
    // console.log('OrdersComponent - ngOnInit', this);
  }

  get orders() {
    return this.orderService.orders;
  }
}
