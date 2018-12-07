import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TickService {

  constructor(
    private http: HttpClient,
  ) { }

  getTicks(): Observable<any> {
    return this.http.get('https://tickers.vitanova.online/api/exchanges/bitfinex');
  }
}
