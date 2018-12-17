import { Component, Input, OnInit } from '@angular/core';
import * as fromPositions from '@trading/reducers/positions.reducers';
import { getPositionsFromSection } from '@trading/state/trading.selectors';

@Component({
  selector: 'app-positions',
  template: `
    <table>
      <thead>
      <tr>
        <th>Pair</th>
        <th>L/S</th>
        <th>Amount</th>
        <th>Open Price</th>
        <th>Market Price</th>
        <th>Stop</th>
        <th>Limit</th>
        <th>Fee Or Swap</th>
        <th>PL</th>
        <th>PL(BTC)</th>
        <th>PL %</th>
        <th>Exposure (BTC)</th>
        <th>Opened</th>
        <th></th>
        <th></th>
      </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="15">
            <app-position
             *ngFor="let position of positions"
             [position]="position"
            ></app-position>
          </td>
        </tr>
      </tbody>
    </table>`,
})
export class PositionsComponent implements OnInit {

  @Input()
  section: fromPositions.State;

  constructor() {
  }

  ngOnInit() {
    console.log(this);
  }

  get positions() {
    return getPositionsFromSection(this.section);
  }
}
