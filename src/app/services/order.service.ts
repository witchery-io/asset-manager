import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models';
import { Observable } from 'rxjs';

@Injectable()
export class OrderService {
  orders: any[];
  positions: any[];
  balance: {
    balance: number,
    base_currency: string,
    equity: number,
    exposure: number,
    last_updated: Date,
    per_currency_balances: any[],
    pl: number,
    total_pl: number,
    wsb: number,
  };
  tradeType: string; // group or account
  tradeTypeId: string; // "6a86df61-c190-4347-9b61-34cbd88d38a4"
  groupByPair: boolean; // bool : true or false

  // url = 'http://192.168.5.60:50090/payments';
  url = 'http://trade.vitanova.online:50090/payments';

  constructor(
    public http: HttpClient,
  ) { }

  setPositions(positions = []) {
    this.positions = positions;
  }

  setOrders(orders = []) {
    this.orders = orders;
  }

  setBalance(balance) {
    if (!balance.per_currency_balances) {
      this.balance = balance;
      return;
    }

    balance.per_currency_balances.sort((a: any, b: any) => {
      if (a.currency < b.currency) {
        return -1;
      } else if (a.currency > b.currency) {
        return 1;
      } else {
        return 0;
      }
    });
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

  getGroupOrders(groupId: string, groupByPair: boolean): Observable<any> {
    if (groupByPair) {
      return this.http.get(`${ this.url }/exchange/groups/${ groupId }/orders?groupby=pair`);
    } else {
      return this.http.get(`${ this.url }/exchange/groups/${ groupId }/orders`);
    }
  }

  getGroupPositions(groupId: string, groupByPair: boolean): Observable<any> {
    if (groupByPair) {
      return this.http.get(`${ this.url }/exchange/groups/${ groupId }/positions?groupby=pair`);
    } else {
      return this.http.get(`${ this.url }/exchange/groups/${ groupId }/positions`);
    }
  }

  getAccountOrders(accountId: string, groupByPair: boolean): Observable<any> {
    if (groupByPair) {
      return this.http.get(`${ this.url }/exchange/accounts/${ accountId }/orders?groupby=pair`);
    } else {
      return this.http.get(`${ this.url }/exchange/accounts/${ accountId }/orders`);
    }
  }

  getAccountPositions(accountId: string, groupByPair: boolean): Observable<any> {
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
      this.getGroupOrders(this.tradeTypeId, this.groupByPair)
        .subscribe(orders => {
          this.setOrders(orders);
        });
    } else if (this.tradeType === 'account') {

      this.getAccountOrders(this.tradeTypeId, this.groupByPair)
        .subscribe(orders => {
          this.setOrders(orders);
        });
    }
  }

  fetchPositions() {
    if (this.tradeType === 'group') {
      this.getGroupPositions(this.tradeTypeId, this.groupByPair)
        .subscribe(positions => {
          this.setPositions(positions);
        });
    } else if (this.tradeType === 'account') {

      this.getAccountPositions(this.tradeTypeId, this.groupByPair)
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
