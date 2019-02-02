import { Component, Input, OnInit } from '@angular/core';
import { getPositionsFromSection } from '@trading/state/trading.selectors';
import { getAccountsFromSection } from '@app/core/reducers';

@Component({
  selector: 'app-positions',
  template: `
    <table class="table table-hover table-xs text-center">
      <thead>
      <tr class="d-flex">
        <th class="col">Pair</th>
        <th class="col">L/S</th>
        <th class="col">Amount</th>
        <th class="col">Open Price</th>
        <th class="col">Market Price</th>
        <th class="col">Stop</th>
        <th class="col">Limit</th>
        <th class="col">{{ feeOrSwap }}</th>
        <th class="col">PL</th>
        <th class="col">PL(BTC)</th>
        <th class="col">PL %</th>
        <th class="col">Exposure (BTC)</th>
        <th class="col">Opened</th>
        <th class="col"></th>
        <th class="col"></th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th colspan="15" class="p-0">
          <app-position
            *ngFor="let position of positions"
            [id]="id"
            [type]="type"
            [position]="position"
            [permission]="permission"
            [accounts]="accounts"
          ></app-position>
        </th>
      </tr>
      </tbody>
    </table>`,
})
export class PositionsComponent implements OnInit {

  @Input()
  id: string;

  @Input()
  type: string;

  @Input()
  section: any;

  @Input()
  accountsSection: any;

  permission = 'parent';

  constructor() {
  }

  ngOnInit() {
  }

  get positions() {
    return getPositionsFromSection(this.section);
  }

  get feeOrSwap() {
    return this.type === 'group' ? 'Fee' : 'Swap';
  }

  get accounts() {
    return getAccountsFromSection(this.accountsSection);
  }
}
