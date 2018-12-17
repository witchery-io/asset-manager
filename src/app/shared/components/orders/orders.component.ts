import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  template: `
    <h1>APP ORDERS</h1>
    <app-order></app-order>
  `,
})
export class OrdersComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}
