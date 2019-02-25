import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { getTicksFromSection } from '@app/core/reducers';
import { LocalDataSource } from 'ng2-smart-table';
import { ButtonViewComponent } from '@trading/components/button-view/button-view.component';
import { FavoriteViewComponent } from '@trading/components/favorite-view/favorite-view.component';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ticks',
  templateUrl: './ticks.component.html',
  styleUrls: ['ticks.component.scss'],
})
export class TicksComponent implements OnInit {

  faStar = faStar;

  favorites: boolean;

  @Input()
  id: string;

  @Input()
  type: string;

  @Input()
  section: any;

  @Output()
  select: EventEmitter<any> = new EventEmitter();

  settings = {
    columns: {
      favorite: {
        type: 'custom',
        renderComponent: FavoriteViewComponent,
      },
      pair: {
        title: 'INS.', // INSTRUMENT
        sortDirection: 'ASC',
      },
      last: {
        title: 'LAST',
      },
      dailyChangePercent: {
        title: '24HR',
        type: 'html',
      },
      volume: {
        title: 'VOL USD',
      },
      add: {
        type: 'custom',
        renderComponent: ButtonViewComponent,
      },
    },
    hideSubHeader: true,
    pager: {
      perPage: 500
    },
    actions: false,
    attr: {
      class: 'table table-xs'
    }
  };

  source: LocalDataSource;

  constructor() {
  }

  get ticks() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    return getTicksFromSection(this.section)
      .filter((tick) => {
        if (!this.favorites) {
          return true;
        }

        return favorites.indexOf(tick.pair) !== -1;
      })
      .map((tick, i) => {
        return {
          ...tick,
          ...{
            id: this.id,
            type: this.type,
            last: tick.last.toFixed(2),
            volume: tick.volume.toFixed(2),
            dailyChangePercent: `<span class="${tick.dailyChangePercent > 0 ? 'text-success' : 'text-danger'}">
                          ${(tick.dailyChangePercent * 100).toFixed(2)}%</span>`,
            add: i,
          },
        };
      });
  }

  get color() {
    return this.favorites ? 'orange' : 'black';
  }

  ngOnInit() {
    this.favorites = JSON.parse(localStorage.getItem('filterByFavorites')) || false;

    this.source = new LocalDataSource(this.ticks);
    setInterval(() => this.source.load(this.ticks), 1000);
  }

  onSearch(query = '') {
    if (query === '') {
      this.source.setFilter([]);
    } else {
      this.source.setFilter([
        {
          field: 'pair',
          search: query
        },
      ], false);
    }
  }

  onUserRowSelect($event): void {
    this.select.emit(`${$event.data.pair}`);
  }

  selectFavorite() {
    this.favorites = !this.favorites;
    localStorage.setItem('filterByFavorites', JSON.stringify(this.favorites));
  }
}
