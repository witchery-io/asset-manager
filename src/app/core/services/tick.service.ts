import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TickService {

  url = 'http://192.168.1.19:8080';

  constructor(
    private http: HttpClient,
  ) { }

  getTicks(): Observable<any> {
    return this.http.get(`${this.url}/tickers`);
  }
}
