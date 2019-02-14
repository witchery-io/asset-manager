import { Component, Input, OnInit } from '@angular/core';
import { getOrdersFromSection } from '@trading/state/trading.selectors';

@Component({
  selector: 'app-orders',
  template: `
    <table class="table table-xs text-center">
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
          <app-order
            *ngFor="let order of orders"
            [id]="id"
            [order]="order"
            [permission]="permission"
            [accounts]="accounts"
          ></app-order>
        </th>
      </tr>
      </tbody>
    </table>`,
})
export class OrdersComponent implements OnInit {

  @Input()
  id: string;

  @Input()
  section: any;

  @Input()
  accountsSection: any;

  permission = 'parent';

  constructor() {
  }

  ngOnInit() {
  }

  get orders() {
    return getOrdersFromSection(this.section);
  }

  get accounts() {
    return getOrdersFromSection(this.accountsSection);
  }
}
