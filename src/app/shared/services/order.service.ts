import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OrderService {

  constructor(
    protected http: HttpClient,
  ) { }

  placeGroupOrder(id, params): Observable<any> {

    console.log('Order Service', params);

    return of();
    // return this.http.post(`http://trade.vitanova.online:50090/payments/exchange/groups/${ groupId }/orders`, order);
  }

  placeAccountOrder(id, params): Observable<any> {

    console.log('Order Service', params);

    return of();
    // return this.http.post(`http://trade.vitanova.online:50090/payments/exchange/accounts/${ accountId }/orders`, order);
  }
}
