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
    return this.http.get(`${this.url}/groups`);
  }

  getGroup(id): Observable<any> {
    return this.http.get(`${this.url}/groups/${id}`);
  }

  create(params): Observable<any> {
    return this.http.post(`${this.url}/groups`, params);
  }

  update(id, params): Observable<any> {
    return this.http.put(`${this.url}/groups/${id}`, params);
  }

  addAccount(id, params) {
    return this.http.post(`${this.url}/groups/${id}/accounts`, params);
  }
}
