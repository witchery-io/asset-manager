import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TickService {

  ticksUrl = 'https://tickers.vitanova.online/api/exchanges/bitfinex';

  public ticks = [];

  constructor(public http: HttpClient) {
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
    });
  }
}
