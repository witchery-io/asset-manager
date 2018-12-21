import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { getTicksFromSection } from '@app/core/reducers';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-ticks',
  templateUrl: './ticks.component.html',
  styleUrls: ['ticks.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
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
    this.source.load(this.ticks.map(function (tick, i) {
      return {
        ...tick,
        ...{
          last: tick.last.toFixed(2),
          volume: tick.volume.toFixed(2),
          daily_change_prc: `<span class="${ tick.daily_change_prc > 0 ? 'text-success' : 'text-danger' }">
                          ${ (tick.daily_change_prc * 100).toFixed(2) }%</span>`,
          add: i,
        },
      };
    }));
  }

  get ticks() {
    return getTicksFromSection(this.section);
  }
}
