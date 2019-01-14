import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent implements OnInit {

  @Input()
  formType: string;

  @Input()
  values = {};

  accountForm: FormGroup;
  exchanges = ['bitfinex', 'cexio'];
  baseCurrency = ['usd', 'btc', 'eth', 'eur'];

  constructor() { }

  ngOnInit() {
    this.accountForm = new FormGroup({
      acc_name: new FormControl('', [<any>Validators.required]),
      user_name: new FormControl('', [<any>Validators.required]),
      risk: new FormControl(0, [<any>Validators.required]),
      exchange: new FormControl('bitfinex', [<any>Validators.required]),
      base_currency: new FormControl('usd', [<any>Validators.required]),
    });

    this.accountForm.patchValue(this.values);
  }

  close() {
    // code
  }

  create(values, is_valid) {
    if (is_valid) {
      // emit
    }
  }

  update(values, is_valid) {
    if (is_valid) {
      // emit
    }
  }

}
