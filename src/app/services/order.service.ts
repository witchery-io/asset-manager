import {
  Injectable,
} from '@angular/core';

import {
  HttpClient,
} from '@angular/common/http';

import {
  Order,
} from '../models';

import {
  Observable,
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orders = [];
  positions = [];
  balance = {};

  public tradeType;
  public tradeTypeId;
  public groupByPair;

  url = 'http://trade.vitanova.online:50090/payments';

  constructor(
    public http: HttpClient,
  ) { }

  setPositions(positions) {
    console.log('positions', positions);
    this.positions = positions;
  }

  setOrders(orders) {
    console.log('orders', orders);
    this.orders = orders;
  }

  setBalance(balance) {
    console.log('balance', balance);
    this.balance = balance;
  }

  getAccountBalance(accountId: string) {
    return this.http.get(`${ this.url }/exchange/accounts/${ accountId }/balance`);
  }

  getGroupBalance(groupId: string) {
    return this.http.get(`${ this.url }/exchange/groups/${ groupId }/balance`);
  }

  placeGroupOrder(groupId: string, order: Order) {
    return this.http.post(`${ this.url }/exchange/groups/${ groupId }/orders`, order);
  }

  placeAccountOrder(accountId: string, order: Order) {
    return this.http.post(`${ this.url }/exchange/accounts/${ accountId }/orders`, order);
  }

  getGroupOrders(groupId: string, groupByPair: boolean = false): Observable<any> {
    if (this.groupByPair) {
      return this.http.get(`${ this.url }/exchange/groups/${ groupId }/orders?groupby=pair`);
    } else {
      return this.http.get(`${ this.url }/exchange/groups/${ groupId }/orders`);
    }
  }

  getGroupPositions(groupId: string, groupByPair: boolean = false): Observable<any> {
    if (this.groupByPair) {
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

  closePosition(position): Observable<any> {
    if (position.amount < 0) {
      position.amount = position.amount * -1;
    }
    return this.http.post(`${ this.url }/exchange/positions/delete`, position);
  }

  cancelOrder(order): Observable<any> {
    return this.http.post(`${ this.url }/exchange/orders/delete`, order);
  }

  fetchOrders() {
    if (this.tradeType === 'group') {
      this.getGroupOrders(this.tradeTypeId, true)
        .subscribe(orders => {
          this.setOrders(orders);
        });

      this.getGroupPositions(this.tradeTypeId, true)
        .subscribe(positions => {
          this.setPositions(positions);
        });

    } else if (this.tradeType === 'account') {
      this.getAccountOrders(this.tradeTypeId, true)
        .subscribe(orders => {
          this.setOrders(orders);
        });

      this.getAccountPositions(this.tradeTypeId, true)
        .subscribe(positions => {
          this.setPositions(positions);
        });
    }
  }

  fetchBalance() {
    if (this.tradeType === 'group') {
      this.getGroupBalance(this.tradeTypeId)
        .subscribe(balance => {
          this.setBalance(balance);
        });

    } else if (this.tradeType === 'account') {
      this.getAccountBalance(this.tradeTypeId)
        .subscribe(balance => {
          this.setBalance(balance);
        });
    }
  }
}
