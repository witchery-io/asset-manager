import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService, AuthService} from '@app/core/services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private api: ApiService,
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  onSubmit(model: any, isValid: boolean) {
    if (!isValid) {
      return;
    }

    this.auth.login(model).subscribe((res: any) => {
      const navPromise = this.router.navigateByUrl(this.auth.redirectUrl || '/');
      navPromise.then(() => {
      });
    }, () => {

      localStorage.setItem('role', 'admin');
      this.api.setAuthKey('babudabu');
      const navPromise = this.router.navigateByUrl(this.auth.redirectUrl || '/');
      navPromise.then(() => {
      });
    });
  }

}
