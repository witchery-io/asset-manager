import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '@app/core/services';
import { NotifierService } from 'angular-notifier';
import { ModalService } from '@app/shared/services';
import { Account } from '@app/core/intefaces';
import { Store } from '@ngrx/store';
import { SettingsState } from '@settings/reducers';
import { AddAccount, UpdateAccount } from '@app/core/actions/account.actions';

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
    private store: Store<SettingsState>,
  ) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.accountForm = new FormGroup({
      accName: new FormControl('', [<any>Validators.required]),
      key: new FormControl('', [<any>Validators.required]),
      secret: new FormControl('', [<any>Validators.required]),
      userName: new FormControl('', [<any>Validators.required]),
      risk: new FormControl(0, [<any>Validators.required]),
      exchange: new FormControl('bitfinex.com', [<any>Validators.required]),
      baseCurrency: new FormControl('USD', [<any>Validators.required]),
      date: new FormControl('', [<any>Validators.required]),
    });

    this.accountForm.patchValue(this.values || {});
  }

  close() {
    this.modalService.closeAllModals();
  }

  create(values, isValid) {
    if (isValid) {
      this.accountService.create(values)
        .subscribe((account: any) => {
          this.store.dispatch(new AddAccount(account));
          this.close();
          this.notifier.notify('success', `Account was successfully created.`);
        });
    }
  }

  update(values, isValid) {
    if (isValid) {
      this.accountService.update(this.values.id, values)
        .subscribe(() => {
          values.id = this.values.id;
          this.store.dispatch(new UpdateAccount(values));
          this.close();
          this.notifier.notify('success', `Group was successfully edited.`);
        });
    }
  }
}
