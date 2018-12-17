import {Component, Input, OnInit} from '@angular/core';

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
            <app-position-item
              *ngFor="let position of positions"
              [position]="position"
              [permission]="permission"
              [accounts]="accounts"
            ></app-position-item>
          </th>
        </tr>
      </tbody>
  </table>
  `,
})
export class PositionsComponent implements OnInit {

  @Input()
  permission: string;

  @Input()
  accounts: any;

  @Input()
  positions: any;

  constructor() {}

  ngOnInit() {}
}
