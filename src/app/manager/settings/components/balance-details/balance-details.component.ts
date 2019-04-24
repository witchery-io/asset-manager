import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {getBalanceFromSection} from '@settings/state/settings.selectors';
import {getPositionsFromSection} from '@trading/state/trading.selectors';

@Component({
  selector: 'app-balance-details',
  templateUrl: './balance-details.component.html',
  styleUrls: ['./balance-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceDetailsComponent implements OnInit {

  @Input()
  section: any;

  @Input()
  positions?: any;

  constructor() {
  }

  ngOnInit() {
  }

  get pos() {
    return getPositionsFromSection(this.positions);
  }

  get balance() {
    return getBalanceFromSection(this.section);
  }

  get equity() {
    if (!this.balance) {
      return 0;
    }

    const positions = this.pos;

    let eq = this.balance.equity;

    for (const p of positions) {
      eq = eq + p.pl / 5600;
    }

    console.log(positions);

    return eq;
  }
}
