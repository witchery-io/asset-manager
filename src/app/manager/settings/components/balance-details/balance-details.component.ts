import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-balance-details',
  template: `
    <h1>Balance</h1>
    <app-balance-status></app-balance-status>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceDetailsComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
