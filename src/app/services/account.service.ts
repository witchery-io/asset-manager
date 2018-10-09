import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  accounts = [
    {
      id: 1,
      status: true,
      accName: 'test 1',
      userName: 'test 2',
      exchange: 'Bitfinex',
      baseCurrency: 'BTC',
      equity: '150',
      risk: 0.5,
      date: '10/9/2018',
    },
    {
      id: 2,
      status: true,
      accName: 'test 1',
      userName: 'test 2',
      exchange: 'Bitfinex',
      baseCurrency: 'BTC',
      equity: '122',
      risk: 1.5,
      date: '9/12/2018',
    },
  ];

  constructor() { }

  set(account) {
    this.accounts.push(account);
  }

  get() {
    return this.accounts;
  }

  getItem(id = 0) {
    return this.accounts[id];
  }
}
