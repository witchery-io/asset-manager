import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GroupService {

  url = 'http://192.168.1.5:8080';

  constructor(
    private http: HttpClient,
  ) {
  }

  getGroups(): Observable<any> {
    // return this.http.get(`${this.url}/groups`);
    return this.http.get(`http://trade.vitanova.online:50089/accounts/groups`);
  }

  getGroup(id): Observable<any> {
    return this.http.get(`${this.url}/groups/${id}`);
  }

  create(params) {
    return this.http.post(`${this.url}`, params);
  }

  update(params) {
    return this.http.put(`${this.url}`, params);
  }

  addAccount(params) {
    return this.http.post(`${this.url}`, params);
  }
}
