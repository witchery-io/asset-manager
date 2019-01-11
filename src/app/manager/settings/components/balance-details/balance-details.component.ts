import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-balance-details',
  templateUrl: `
    <h1>Balance</h1>
    <app-balance-status></app-balance-status>
    <app-per-currency-balances></app-per-currency-balances>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceDetailsComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
