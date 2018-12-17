import { Component, Input, OnInit } from '@angular/core';
import { Account } from '@app/core/intefaces';
import { Order } from '@app/shared/intefaces/order.interface';

@Component({
  selector: 'app-orders',
  template: `
    <table class="table table-xs table-hover text-center">
      <thead>
      <tr class="d-flex">
        <th class="col">Pair</th>
        <th class="col">Context</th>
        <th class="col">Type</th>
        <th class="col">B/S</th>
        <th class="col">Amount</th>
        <th class="col">Price</th>
        <th class="col">Duration</th>
        <th class="col">Created</th>
        <th class="col"></th>
        <th class="col"></th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th colspan="10" class="p-0">
          <app-order-item
            *ngFor="let order of orders"
            [order]="order"
            [permission]="permission"
            [accounts]="accounts"
          ></app-order-item>
        </th>
      </tr>
      </tbody>
    </table>`,
})
export class OrdersComponent implements OnInit {

  @Input()
  permission: string;

  @Input()
  accounts: Account[];

  @Input()
  orders: Order[];

  constructor() {
  }

  ngOnInit() {
  }
}
