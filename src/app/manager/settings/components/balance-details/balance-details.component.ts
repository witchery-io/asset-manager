import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { getBalanceFromSection } from '@trading/state/trading.selectors';

@Component({
  selector: 'app-balance-details',
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <small>BC</small>
          <h6>{{ balance.base_currency }}</h6>
        </div>
        <div class="col">
          <small>Balance</small>
          <h6>{{ balance.balance | number }}</h6>
        </div>
        <div class="col">
          <small>WSB</small>
          <h6>{{ balance.wsb | number }}</h6>
        </div>
        <div class="col">
          <small>Equity</small>
          <h6>{{ balance.equity | number }}</h6>
        </div>
        <div class="col">
          <small>PL (%)</small>
          <h6>{{ balance.pl | number }}</h6>
        </div>
        <div class="col">
          <small>Exposure</small>
          <h6>{{ balance.exposure | number }}</h6>
        </div>
        <div class="col">
          <small>PL</small>
          <h6>{{ balance.total_pl | number }}</h6>
        </div>
        <div class="col">
          <small>Exp/Eq</small>
          <h6>{{ balance.exposure / balance.equity * 100 | number }}</h6>
        </div>
      </div>
    </div>

    <app-per-currency-balances
      [per_currency_balances]="balance.per_currency_balances"
    ></app-per-currency-balances>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceDetailsComponent implements OnInit {

  @Input()
  section: any;

  constructor() {
  }

  ngOnInit() {
  }

  get balance() {
    return getBalanceFromSection(this.section);
  }

}
