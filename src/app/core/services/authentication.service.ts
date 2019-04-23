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

            /*
            * todo :: temporary
            * */
            if (res.userId === 546545) {
              localStorage.setItem('role', 'guest');
            } else {
              localStorage.setItem('role', 'admin');
            }

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

    if (error && error.status) {
      if (error.status === 401) {
        this.api.clearAuthKey();
        const navProm = this.router.navigate(['/login']);
        navProm.then(() => {});
        return observableThrowError(errMsg);
      }
    }

    if (error && error.message) {
      errMsg = JSON.parse(error.message);
    }

    this.notifier.notify('error', errMsg);
    return observableThrowError(errMsg);
  }
}
