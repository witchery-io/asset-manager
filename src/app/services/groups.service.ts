import { Injectable } from '@angular/core';
import { Group } from '../models/group';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  url = 'groups';

  constructor(
    private http: HttpClient,
  ) { }

  getGroups(): Observable<any> {
    return this.http.get(`${ environment.apiUrl }${ this.url }`);
  }

  getGroup(id): Observable<any> {
    return this.http.get(`${ environment.apiUrl }${ this.url }/${ id }`);
  }

  createGroup(group: Group): Observable<any> {
    return this.http.post(`${ environment.apiUrl }${ this.url }`, group);
  }
}
