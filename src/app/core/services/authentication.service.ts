import { Injectable } from '@angular/core';
import { ApiService } from '@app/core/services/api.service';

@Injectable()
export class AuthService {

  get redirectUrl(): string {
    return this.redirectUrlProp;
  }

  set redirectUrl(val: string) {
    this.redirectUrlProp = val;
  }

  private redirectUrlProp: string;

  constructor(
    private api: ApiService,
  ) { }

  get isLoggedIn() {
    return !!this.api.authKey;
  }
}
