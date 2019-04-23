import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() id: string;
  @Input() type: string;
  @Input() section: any;
  @Input() balanceSections: any;
  @Input() readonly: boolean;
  @Output() select: EventEmitter<any> = new EventEmitter();
  faStar = faStar;
  filterByFavorites: boolean;
  tickFilter = {pair: ''};
  order = 'pair';
  reverse = false;
  oldLasts = [];
  isGrowLasts = [];

  constructor() {
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

        /*
        * get old last and id grow last
        * */
        const oldLast = this.oldLasts[tick.pair];
        const isGrowLast = this.isGrowLasts[tick.pair];

        /*
        * is last modify, compare after save new last
        * */
        if (oldLast !== tick.last) {
          this.isGrowLasts[tick.pair] = tick.last > oldLast;
          this.oldLasts[tick.pair] = tick.last;
        }

        return {
          id: this.id,
          type: this.type,
          pair: tick.pair,
          last: parseFloat(tick.last.toFixed(2)),
          volume: parseFloat(tick.volume.toFixed(2)),
          dailyChangePercent: parseFloat(((tick.dailyChangePercent || 0) * 100).toFixed(2)),
          add: i,
          balance: this.balance,
          isGrow: isGrowLast,
          isFavorite: favorites.indexOf(tick.pair) !== -1,
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
