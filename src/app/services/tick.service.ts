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

  getTick(id = 0) {
    return this.ticks[id];
  }
}
