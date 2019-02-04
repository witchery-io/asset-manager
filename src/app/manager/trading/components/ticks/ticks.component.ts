import { Component, Input, OnInit } from '@angular/core';
import { getTicksFromSection } from '@app/core/reducers';
import { LocalDataSource } from 'ng2-smart-table';
import { ButtonViewComponent } from '@trading/components/button-view/button-view.component';
import { SharedService } from '@app/shared/services';

@Component({
  selector: 'app-ticks',
  templateUrl: './ticks.component.html',
  styleUrls: ['ticks.component.scss'],
})
export class TicksComponent implements OnInit {

  @Input()
  id: string;

  @Input()
  type: string;

  @Input()
  section: any;

  _symbol: any;

  settings = {
    columns: {
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
      class: 'table table-xs table-hover'
    }
  };

  source: LocalDataSource;

  constructor(
    private sharedService: SharedService,
  ) {
  }

  get ticks() {
    return getTicksFromSection(this.section).map((tick, i) => {
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

  ngOnInit() {
    this.source = new LocalDataSource(this.ticks);
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

  onUserRowSelect($event) {
    this._symbol = `${$event.data.exchangename}:${$event.data.pair}`;
    this.sharedService.subject.next();
  }
}
