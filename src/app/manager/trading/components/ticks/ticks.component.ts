import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { getTicksFromSection } from '@app/core/reducers';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-ticks',
  templateUrl: './ticks.component.html',
  styleUrls: ['ticks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicksComponent implements OnInit {

  @Input()
  section: any;

  settings = {
    columns: {
      pair: {
        title: 'INS.', // INSTRUMENT
        sortDirection: 'ASC',
      },
      last: {
        title: 'LAST',
      },
      daily_change_prc: {
        title: '24HR',
        type: 'html',
      },
      volume: {
        title: 'VOL USD',
      },
      add: {
        type: 'custom',
        // renderComponent: ButtonViewComponent,
      },
    },
    hideSubHeader: true,
    pager: {
      perPage: 100
    },
    actions: false,
    attr: {
      class: 'table table-xs table-hover'
    }
  };

  source: LocalDataSource;

  constructor() {
    this.source = new LocalDataSource();
  }

  ngOnInit() {
    console.log(this);
  }

  get ticks() {
    return getTicksFromSection(this.section);
  }

  onSearch(query: string = '') {
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
}
