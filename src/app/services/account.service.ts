import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  accounts = [
    {
      id: '1',
      status: true,
      acc_name: 'acc name 1',
      user_name: 'user name 1',
      exchange: 'Bitfinex',
      base_currency: 'BTC',
      equity: '150',
      risk: 0.5,
      date: '10/9/2018',
    },
    {
      id: '2',
      status: true,
      acc_name: 'acc name 2',
      user_name: 'user name 2',
      exchange: 'Bitfinex',
      base_currency: 'BTC',
      equity: '122',
      risk: 1.5,
      date: '9/12/2018',
    },
  ];

  constructor() { }

  createAccount(account) {
    this.accounts.push(account);
  }

  getAccounts() {
    return this.accounts;
  }

  getAccount(id = 0) {
    return this.accounts[id];
  }
}
