import { Component, OnInit } from '@angular/core';
import { AccountService, OrderService } from '../../../services';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {

  permission = 'parent';
  accounts: any;

  constructor(
    private orderService: OrderService,
    private accountService: AccountService,
  ) { }

  ngOnInit() {
    this.accountService.getAccounts().subscribe(accounts => this.accounts = accounts);
  }

  get orders() {
    return this.orderService.orders;
  }
}
