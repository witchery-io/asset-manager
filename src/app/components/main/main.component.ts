import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../services/account.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  login = '';
  password = '';

  constructor(public accountService: AccountService, public router: Router) {

  }

  ngOnInit() {
  }

  makeLogin() {
    if (this.login === 'admin' && this.password === 'AnkappasS!@#123') {
      this.accountService.role = 'admin';
      localStorage.setItem('role', 'admin');
      this.router.navigate(['dashboard']);
    } else if (this.login === 'guest' && this.password === 'AnkappasS123') {
      this.accountService.role = 'guest';
      localStorage.setItem('role', 'guest');
      this.router.navigate(['dashboard']);
    }
  }

}
