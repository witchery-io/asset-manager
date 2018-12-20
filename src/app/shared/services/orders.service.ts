import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class OrdersService {

  constructor(
    private http: HttpClient,
  ) { }

  getOrders(): Observable<any> {
    return this.http.get('http://trade.vitanova.online:50090/payments/exchange/accounts/74f9b418-e7b0-440d-8523-c4ed9cbbe3cc/orders');
  }

  cancelOrder(order = {}): Observable<any> {
    return this.http.post('http://trade.vitanova.online:50090/payments/exchange/orders/delete', order);
  }

  placeGroupOrder(groupId = '', order = {}) {
    return this.http.post(`http://trade.vitanova.online:50090/payments/exchange/groups/${ groupId }/orders`, order);
  }

  placeAccountOrder(accountId = '', order = {}) {
    return this.http.post(`http://trade.vitanova.online:50090/payments/exchange/accounts/${ accountId }/orders`, order);
  }
}
