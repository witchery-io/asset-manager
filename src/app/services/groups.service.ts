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
  public groups: any[] = [];


  // public groups: any[] = [
  //   { id: 'group1', name: 'Group 1', allocation_method: 0, active: true },
  //   { id: 'group2', name: 'Group 2', allocation_method: 2, active: false },
  // ];


  constructor(
    private http: HttpClient,
    ) { }

  getGroups(): Observable<any> {
    return this.http.get(`${ environment.apiUrl }${ this.url }`);
  }

  createGroup(group: Group): Observable<any> {
    return this.http.post(`${ environment.apiUrl }${ this.url }`, {
      params: group
    });
  }
}
