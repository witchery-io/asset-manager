import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';

@Injectable({
  providedIn: 'root'
})
export class TickService {

  ticksUrl = 'https://tickers.vitanova.online/api/exchanges/bitfinex';
  source: LocalDataSource;
  ticks = [];

  constructor(
    private http: HttpClient,
  ) {
    this.source = new LocalDataSource();
  }

  getTicks(): Observable<any> {
    return this.http.get(this.ticksUrl);
  }

  fetchTicks() {
    this.getTicks().subscribe(ticks => {

      this.ticks = ticks.sort((a: any, b: any) => {
        if (a.pair < b.pair) {
          return -1;
        } else if (a.pair > b.pair) {
          return 1;
        } else {
          return 0;
        }
      });

      this.source.load(this.ticks.map(function (tick, i) {
        return {
          ...tick,
          ...{
            daily_change: `<span class="${ tick.daily_change > 0 ? 'text-success' : 'text-danger' }">${ tick.daily_change * 100 }</span>`,
            add: i,
          }
        };
      }));
    });
  }
}
