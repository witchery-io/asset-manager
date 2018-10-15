import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url = 'http://192.168.5.50:443';

  constructor(
    public http: HttpClient,
  ) { }

  placeGroupOrder(groupId: string, order: Order) {
    return this.http.post(`${ this.url }/exchange/groups/${ groupId }/orders`, order);
  }

  placeAccountOrder(accountId: string, order: Order) {
    return this.http.post(`${ this.url }/exchange/accounts/${ accountId }/orders`, order);
  }

  getGroupOrders(groupId: string, order: any): Observable<any> {
    return this.http.get(`${ this.url }/exchange/groups/${ groupId }/orders`, order);
  }

  getAccountOrders(accountId: string, order: any): Observable<any> {
    return this.http.get(`${ this.url }/exchange/accounts/${ accountId }/orders`, order);
  }
}
