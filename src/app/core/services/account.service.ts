import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AccountService {

  constructor(
    private http: HttpClient,
  ) { }

  getAccounts(): Observable<any> {
    return this.http.get(`http://trade.vitanova.online:50089/accounts/accounts`);
  }
}
