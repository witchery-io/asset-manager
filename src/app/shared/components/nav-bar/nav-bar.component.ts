import { Component, OnInit } from '@angular/core';
import { faCogs, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@app/core/services';
import { Router } from '@angular/router';
import { Role } from '@app/shared/enums';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isCollapsed = true;
  faSignOutAlt = faSignOutAlt;
  faCogs = faCogs;
  readonly: boolean;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
  }

  get name() {
    return 'user name';
  }

  ngOnInit() {
    this.readonly = localStorage.getItem('role') !== Role.ADMIN;
  }

  onLogout() {
    this.auth.logout();

    const loginPromise = this.router.navigate(['login']);
    loginPromise.then(() => {
    });
  }
}
