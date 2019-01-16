import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GroupService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getGroups(): Observable<any> {
    return this.http.get(`http://trade.vitanova.online:50089/accounts/groups`);
  }

  getGroup(id): Observable<any> {
    return this.http.get(`http://trade.vitanova.online:50089/accounts/groups/${id}`);
  }
}
