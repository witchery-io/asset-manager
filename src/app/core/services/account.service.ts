import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AccountService {

  url = 'http://192.168.1.5:8080';

  constructor(
    private http: HttpClient,
  ) {
  }

  getAccounts(): Observable<any> {
    return this.http.get(`${this.url}/accounts`);
  }

  getAccount(id) {
    return this.http.get(`${this.url}/accounts/${id}`);
  }

  create(params) {
    return this.http.post(`${this.url}/accounts`, params);
  }

  update(id, params) {
    return this.http.put(`${this.url}/accounts/${id}`, params);
  }
}
