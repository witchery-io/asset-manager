import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/core/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  isLoading: boolean;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  onSubmit(model: any, isValid: boolean) {
    if (this.isLoading || !isValid) {
      return;
    }

    this.isLoading = true;

    this.auth.login(model).subscribe((res: any) => {
      this.isLoading = false;

      const navPromise = this.router.navigateByUrl(this.auth.redirectUrl || '/');

      navPromise.then(() => {
      });
    });
  }

}
