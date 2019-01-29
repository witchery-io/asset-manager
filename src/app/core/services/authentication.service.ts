import { Injectable } from '@angular/core';
import { ApiService } from '@app/core/services/api.service';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {

  private redirectUrlProp: string;

  constructor(
    private api: ApiService,
  ) {
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
          if (res.token) {
            this.api.setAuthKey(res.token);
          }

          return res;
        }),
      );
  }

  logout() {
    return this.api.clearAuthKey();
  }
}
