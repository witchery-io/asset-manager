import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@app/core/services';
import { Role } from '@app/shared/enums';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const role = localStorage.getItem('role');
    if (role === Role.ADMIN) {
      return true;
    }

    this.router.navigate(['/settings/accounts']).then();

    return false;
  }
}
