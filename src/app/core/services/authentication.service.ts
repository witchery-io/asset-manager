import { Injectable } from '@angular/core';
import { ApiService } from '@app/core/services/api.service';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError as observableThrowError } from 'rxjs';
import { NotifierService } from 'angular-notifier';

@Injectable()
export class AuthService {

  private redirectUrlProp: string;
  private readonly notifier: NotifierService;

  constructor(
    private api: ApiService,
    private router: Router,
    private notifierService: NotifierService,
  ) {
    this.notifier = notifierService;
  }

  get redirectUrl(): string {
    return this.redirectUrlProp;
  }

  set redirectUrl(val: string) {
    this.redirectUrlProp = val;
  }

  get isLoggedIn() {
    return !!this.api.authKey;
  }

  login(data) {
    return this.api.post('http://moneo-partner-api.witchery.io/token', data)
      .pipe(
        map((res: any) => {
          if (res.token && res.userId) {
            this.api.setAuthKey(res.token);
          }

          return res;
        }),
        catchError(this.handleError.bind(this)),
      );
  }

  logout() {
    return this.api.clearAuthKey();
  }

  /**
   * Handle server response errors here
   */
  private handleError(error: any) {
    let errMsg = 'Server error';
    let body;

    if (error && error.status) {
      if (error.status === 401) {
        this.api.clearAuthKey();
        this.router.navigate(['/login']);
        return observableThrowError(errMsg);
      }
    }

    if (error && error._body) {
      body = JSON.parse(error._body);
    }

    if (body && body.errors && body.errors.exception && body.errors.exception.message) {
      errMsg = body.errors.exception.message;
    }

    this.notifier.notify('error', errMsg);
    return observableThrowError(errMsg);
  }
}