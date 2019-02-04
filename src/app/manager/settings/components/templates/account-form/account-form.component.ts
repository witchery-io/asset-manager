import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '@app/core/services';
import { NotifierService } from 'angular-notifier';
import { ModalService } from '@app/shared/services';

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
      acc_name: new FormControl('', [<any>Validators.required]),
      user_name: new FormControl('', [<any>Validators.required]),
      risk: new FormControl(0, [<any>Validators.required]),
      exchange: new FormControl('bitfinex', [<any>Validators.required]),
      base_currency: new FormControl('usd', [<any>Validators.required]),
    });

    this.accountForm.patchValue(this.values);
  }

  close() {
    this.modalService.closeAllModals();
  }

  create(values, isValid) {
    if (isValid) {
      this.accountService.create(values)
        .subscribe(d => {

          // todo :: d

          this.close();
          this.notifier.notify( 'success', `Account was successfully created.`);
        }, error1 => {
          this.notifier.notify( 'error', `Error msg: ${ error1.message }`);
        });
    }
  }

  update(values, isValid) {
    if (isValid) {
      this.accountService.update(values)
        .subscribe(d => {

          // todo :: d

          this.close();
          this.notifier.notify( 'success', `Group was successfully edited.`);
        }, error1 => {
          this.notifier.notify( 'error', `Error msg: ${ error1.message }`);
        });
    }
  }
}
