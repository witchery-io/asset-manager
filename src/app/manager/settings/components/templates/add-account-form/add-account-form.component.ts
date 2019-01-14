import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-account-form',
  templateUrl: './add-account-form.component.html',
  styleUrls: ['./add-account-form.component.scss']
})
export class AddAccountFormComponent implements OnInit {

  @Input()
  accounts: any;

  addAccountForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.addAccountForm = new FormGroup({
      account_id: new FormControl('', [<any>Validators.required]),
    });
  }

  createAccount() {

  }

}
