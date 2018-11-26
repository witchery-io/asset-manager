import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models';

@Injectable()
export class UserService {
  url = '';
  constructor(
    private http: HttpClient,
  ) { }

  getAll() {
    return this.http.get<User[]>(`${this.url}/users`);
  }
}
