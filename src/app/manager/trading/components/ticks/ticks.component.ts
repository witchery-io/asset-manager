import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { getTicksFromSection } from '@app/core/reducers';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { getBalanceFromSection } from '@trading/state/trading.selectors';

@Component({
  selector: 'app-ticks',
  templateUrl: './ticks.component.html',
  styleUrls: ['ticks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicksComponent implements OnInit {

  faStar = faStar;

  filterByFavorites: boolean;

  @Input()
  id: string;

  @Input()
  type: string;

  @Input()
  section: any;

  @Input()
  balanceSections: any;

  @Output()
  select: EventEmitter<any> = new EventEmitter();

  tickFilter: any = {pair: ''};
  order = 'pair';
  reverse = false;

  constructor(
    private cdr: ChangeDetectorRef
  ) {
  }

  get ticks() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    return getTicksFromSection(this.section)
      .filter((tick) => {
        if (!this.filterByFavorites) {
          return true;
        }

        return favorites.indexOf(tick.pair) !== -1;
      })
      .map((tick, i) => {
        return {
          id: this.id,
          type: this.type,
          pair: tick.pair,
          last: parseFloat(tick.last.toFixed(2)),
          volume: parseFloat(tick.volume.toFixed(2)),
          dailyChangePercent: parseFloat(((tick.dailyChangePercent || 0) * 100).toFixed(2)),
          add: i,
          balance: this.balance,
        };
      });
  }

  get color() {
    return this.filterByFavorites ? 'orange' : 'black';
  }

  get balance() {
    return getBalanceFromSection(this.balanceSections);
  }

  ngOnInit() {
    this.filterByFavorites = JSON.parse(localStorage.getItem('filterByFavorites')) || false;

    console.log(this.cdr);
  }

  onUserRowSelect(pair): void {
    this.select.emit(`${pair}`);
  }

  selectFavorite() {
    this.filterByFavorites = !this.filterByFavorites;
    localStorage.setItem('filterByFavorites', JSON.stringify(this.filterByFavorites));
  }

  trackByFn(index, item) {
    return item.pair;
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }
}
