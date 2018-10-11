import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from '../models/account';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  url: 'accounts';

  constructor(
    private http: HttpClient,
  ) { }

  createAccount(account: Account): Observable<any> {
    return this.http.post(`${ environment.apiUrl }${ this.url }`, {
      params: account
    });
  }

  getAccounts() {
    return this.http.get(`${ environment.apiUrl }${ this.url }`);
  }

  getAccount(id = 0) {
    return this.http.get(`${ environment.apiUrl }${ this.url }/${ id }`);
  }
}
