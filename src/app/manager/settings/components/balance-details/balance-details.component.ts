import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { getBalanceFromSection } from '@settings/state/settings.selectors';
import { getPositionsFromSection } from '@trading/state/trading.selectors';

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
  positionsSection: any;

  constructor() {
  }

  get positions() {
    return getPositionsFromSection(this.positionsSection);
  }

  get balance() {
    return getBalanceFromSection(this.section);
  }

  get equity() {
    if (!this.balance) {
      return 0;
    }

    let equity = this.balance.equity;
    for (const position of this.positions) {
      equity = equity + BalanceDetailsComponent.pl(position) / 5600;
    }

    return equity;
  }

  static mPrice(position) {
    return position.direction === 'sell' ? position.ask : position.bid;
  }

  static pl(position) {
    return ((BalanceDetailsComponent.mPrice(position) || position.lastPrice) - position.openPrice) * position.amount;
  }

  ngOnInit() {
  }
}
