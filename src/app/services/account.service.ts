import {
  Injectable
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import {
  environment
} from '../../environments/environment';

import {
  Account,
} from '../models';

@Injectable()
export class AccountService {

  // @TODO remove
  role = '';

  url = 'accounts';

  constructor(
    private http: HttpClient,
  ) {
  }

  createAccount(account: Account): Observable<any> {
    return this.http.post(`${ environment.apiUrl }${ this.url }`, account);
  }

  /* edit Account */
  editAccount(account: Account): Observable<any> {
    return this.http.put(`${ environment.apiUrl }${ this.url }`, account);
  }

  getAccounts(): Observable<any> {
    return this.http.get(`${ environment.apiUrl }${ this.url }`);
  }

  getAccount(id) {
    return this.http.get(`${ environment.apiUrl }${ this.url }/${ id }`);
  }
}
