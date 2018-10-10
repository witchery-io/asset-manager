import { Injectable } from '@angular/core';
import { Group } from '../models/group';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  public groups: Group[] = [
    {id: 'group1', name: 'Group 1', allocation_method: 0, active: true},
    {id: 'group2', name: 'Group 2', allocation_method: 2, active: false},
  ];

  constructor(private http: HttpClient) { }

  public getAll() {
    return this.groups;
  }

  public createaGroup(group: Group) {
    this.groups.push(group);
  }

}
