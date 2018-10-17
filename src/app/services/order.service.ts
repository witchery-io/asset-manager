import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Order} from '../models/order';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public orders = [];
  public positions = [];

  url = 'http://192.168.5.50:443';

  constructor( public http: HttpClient ) {
  }

  placeGroupOrder(groupId: string, order: Order) {
    return this.http.post(`${ this.url }/exchange/groups/${ groupId }/orders`, order);
  }

  placeAccountOrder(accountId: string, order: Order) {
    return this.http.post(`${ this.url }/exchange/accounts/${ accountId }/orders`, order);
  }

  getGroupOrders(groupId: string, groupByPair: boolean = false): Observable<any> {
    if (groupByPair) {
      return this.http.get(`${ this.url }/exchange/groups/${ groupId }/orders?groupby=pair`);
    } else {
      return this.http.get(`${ this.url }/exchange/groups/${ groupId }/orders`);
    }
  }

  getGroupPositions(groupId: string, groupByPair: boolean = false): Observable<any> {
    if (groupByPair) {
      return this.http.get(`${ this.url }/exchange/groups/${ groupId }/positions?groupby=pair`);
    } else {
      return this.http.get(`${ this.url }/exchange/groups/${ groupId }/positions`);
    }
  }

  getAccountOrders(accountId: string, groupByPair: boolean = false): Observable<any> {
    if (groupByPair) {
      return this.http.get(`${ this.url }/exchange/accounts/${ accountId }/orders?groupby=pair`);
    } else {
      return this.http.get(`${ this.url }/exchange/accounts/${ accountId }/orders`);
    }
  }

  getAccountPositions(accountId: string, groupByPair: boolean = false): Observable<any> {
    if (groupByPair) {
      return this.http.get(`${ this.url }/exchange/accounts/${ accountId }/positions?groupby=pair`);
    } else {
      return this.http.get(`${ this.url }/exchange/accounts/${ accountId }/positions`);
    }
  }

  fetchGroupOrders(groupId: string, groupByPair: boolean = false) {
    this.getGroupOrders(groupId, groupByPair)
      .subscribe(
        orders => {
          this.orders = orders;
        }
      );
  }

  fetchAccountOrders(accountId: string, groupByPair: boolean = false) {
    this.getAccountOrders(accountId, groupByPair)
      .subscribe(
        orders => {
          this.orders = orders;
        }
      );
  }

}
