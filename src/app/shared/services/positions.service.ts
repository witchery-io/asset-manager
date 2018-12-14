import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PositionsService {

  constructor(
    private http: HttpClient,
  ) { }

  getPositions(): Observable<any> {
    return this.http.get('http://trade.vitanova.online:50090/payments/exchange/groups/6a86df61-c190-4347-9b61-34cbd88d38a4/positions');
  }
}
