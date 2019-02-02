import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@app/core/services';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.auth.isLoggedIn) {
      return true;
    }

    // Store the attempted URL for redirecting
    this.auth.redirectUrl = state.url;

    // Navigate to the login page
    const loginPromise = this.router.navigate(['/login']);

    loginPromise.then(() => {
    });

    return false;
  }
}
