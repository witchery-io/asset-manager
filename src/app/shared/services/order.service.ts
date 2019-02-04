import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OrderService {

  url = 'http://192.168.1.19:8080';

  constructor(
    protected http: HttpClient,
  ) {
  }

  placeGroupOrder(params): Observable<any> {
    return this.http.post(`${this.url}/groups/${params.groupId}/orders`, params);
  }

  placeAccountOrder(params): Observable<any> {
    return this.http.post(`${this.url}/accounts/${params.accountId}/orders`, params);
  }
}
