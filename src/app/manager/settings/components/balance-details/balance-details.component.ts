import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { getBalanceFromSection } from '@settings/state/settings.selectors';
import { getPositionsFromSection } from '@trading/state/trading.selectors';
import { getTicksFromSection } from '@app/core/reducers';

@Component({
  selector: 'app-balance-details',
  templateUrl: './balance-details.component.html',
  styleUrls: ['./balance-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceDetailsComponent implements OnInit {
  @Input() section: any;
  @Input() positionsSection: any;
  @Input() ticksSection: any;

  constructor() {
  }

  get positions() {
    return getPositionsFromSection(this.positionsSection);
  }

  get balance() {
    return getBalanceFromSection(this.section);
  }

  get ticks() {
    return getTicksFromSection(this.ticksSection);
  }

  get equity() {
    if (!this.balance) {
      return 0;
    }

    let equity = this.balance.equity;
    for (const position of this.positions) {
      equity = equity + BalanceDetailsComponent.pl(position) / this.plBTC(position);
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

  private plBTC(position) {
    const pair = position.pair.slice(-3);
    const tick = this.ticks.filter(t => {
      return t.pair === 'BTC' + pair;
    });

    if (tick.length === 0 || pair === 'BTC') {
      return 1;
    }

    return position.direction === 'sell' ? tick[0].ask : tick[0].bid;
  }
}
