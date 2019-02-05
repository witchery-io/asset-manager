import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '@app/core/services';
import { NotifierService } from 'angular-notifier';
import { ModalService } from '@app/shared/services';
import { Account } from '@app/core/intefaces';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent implements OnInit {

  @Input()
  formType: string;

  @Input()
  values: Account;

  accountForm: FormGroup;
  exchanges = ['bitfinex.com'];
  baseCurrency = ['USD', 'BTC', 'ETH', 'EUR', 'LTC'];

  private readonly notifier: NotifierService;

  constructor(
    private accountService: AccountService,
    private notifierService: NotifierService,
    private modalService: ModalService,
  ) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.accountForm = new FormGroup({
      accName: new FormControl('', [<any>Validators.required]),
      userName: new FormControl('', [<any>Validators.required]),
      risk: new FormControl(0, [<any>Validators.required]),
      exchange: new FormControl('bitfinex.com', [<any>Validators.required]),
      baseCurrency: new FormControl('USD', [<any>Validators.required]),
    });

    this.accountForm.patchValue(this.values || {});
  }

  close() {
    this.modalService.closeAllModals();
  }

  create(values, isValid) {
    if (isValid) {
      values.key = '';
      values.secret = '';
      this.accountService.create(values)
        .subscribe(() => {
          this.close();
          this.notifier.notify('success', `Account was successfully created.`);
        }, error1 => {
          this.notifier.notify('error', `${error1.error.message}`);
        });
    }
  }

  update(values, isValid) {
    if (isValid) {
      this.accountService.update(this.values.id, values)
        .subscribe(() => {
          this.close();
          this.notifier.notify('success', `Group was successfully edited.`);
        }, error1 => {
          this.notifier.notify('error', `Error msg: ${error1.error.message}`);
        });
    }
  }
}
