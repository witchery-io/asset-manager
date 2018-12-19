import { Component, Input, OnInit } from '@angular/core';
import { getOrdersFromSection } from '@trading/state/trading.selectors';

@Component({
  selector: 'app-orders',
  template: `
    <h1>ORDERS</h1>
    <table border="1">
      <thead>
      <tr>
        <th>Pair</th>
        <th>Context</th>
        <th>Type</th>
        <th>B/S</th>
        <th>Amount</th>
        <th>Price</th>
        <th>Duration</th>
        <th>Created</th>
        <th></th>
        <th></th>
      </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="10">
            <app-order
             *ngFor="let order of orders"
             [order]="order"
            ></app-order>
          </td>
        </tr>
      </tbody>
    </table>`,
})
export class OrdersComponent implements OnInit {

  @Input()
  section: any;

  constructor() {
  }

  ngOnInit() {
    console.log(this);
  }

  get orders() {
    return getOrdersFromSection(this.section);
  }
}
