import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import {
  delay,
  mergeMap,
  materialize,
  dematerialize,
} from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let testUser = { id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' };

    const users = [
      {
        id: 1,
        username: 'admin',
        password: 'AnkappasS!@#123',
        firstName: 'first 1',
        lastName: 'last 1',
        role: 'admin',
      },
      {
        id: 2,
        username: 'guest',
        password: 'AnkappasS123',
        firstName: 'first 2',
        lastName: 'last 2',
        role: 'guest',
      }
    ];

    return of(null).pipe(mergeMap(() => {

      // authenticate
      if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
        const user = users.filter(u => {
          return u.password === request.body.password && u.username === request.body.username ? u : null;
        });

        if (!user.length) {
          return throwError({ error: { message: 'Username or password is incorrect' } });
        }

        const body = {
          id: user[0].id,
          username: user[0].username,
          firstName: user[0].firstName,
          lastName: user[0].lastName,
          role: user[0].role,
          token: 'fake-jwt-token'
        };

        return of(new HttpResponse({ status: 200, body }));
      }

      // get users
      if (request.url.endsWith('/users') && request.method === 'GET') {
        if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          return of(new HttpResponse({ status: 200, body: [testUser] }));
        } else {
          return throwError({ error: { message: 'Unauthorised' } });
        }
      }

      return next.handle(request);
    }))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
  }
}

export let fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
