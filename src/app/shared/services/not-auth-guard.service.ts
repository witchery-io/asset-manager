import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@app/core/services';

@Injectable()
export class NotAuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.auth.isLoggedIn) {
      return true;
    }

    // Navigate to main page
    const mainPromise = this.router.navigate(['/']);

    mainPromise.then(() => {
    });

    return false;
  }
}
