import { Component, OnInit } from '@angular/core';
import { AccountService, OrderService } from '../../../../services';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.scss'],
})
export class PositionsComponent implements OnInit {

  permission = 'parent';
  accounts: any;

  constructor(
    private orderService: OrderService,
    private accountService: AccountService,
  ) { }

  ngOnInit() {
    this.accountService.getAccounts().subscribe(accounts => this.accounts = accounts);
  }

  get tradeType() {
    return this.orderService.tradeType;
  }

  get feeOrSwap() {
    return this.tradeType === 'group' ? 'Fee' : 'Swap';
  }

  get positions() {
    return this.orderService.positions;
  }
}
