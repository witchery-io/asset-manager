import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
  url = 'https://cber.witchery.io';
  constructor(
    private http: HttpClient,
  ) { }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.url}/users/auth`, { email_address: username, password: password })
      .pipe(map(user => {
        if (user && user.token) {
          /* default admin */
          user.role = 'admin';
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
