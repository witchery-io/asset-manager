import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GroupService {

  constructor(
    private http: HttpClient,
  ) { }

  getGroups(): Observable<any> {
    return this.http.get(`http://trade.vitanova.online:50089/accounts/groups`);
  }
}
