import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Account } from '../../../models/account';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit {

  @Input() accounts: any;
  modalRef: BsModalRef;
  accountForm: FormGroup;
  chooseAccount: any;

  constructor(
    private modalService: BsModalService,
    private accountService: AccountService,
  ) { }

  ngOnInit() {
    this.accountForm = new FormGroup({
      acc_name: new FormControl('', [<any>Validators.required]),
      user_name: new FormControl('', [<any>Validators.required]),
      risk: new FormControl(0, [<any>Validators.required]),
      exchange: new FormControl('bitfinex', [<any>Validators.required]),
      base_currency: new FormControl('usd', [<any>Validators.required]),
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  createAccount(model: Account, isValid: boolean) {
    if (isValid) {
      this.accountService.createAccount({ ...model, ...{ risk: +model.risk } })
        .subscribe(() => {
            this.accountForm.reset({ risk: 0 });
            this.modalRef.hide();
          },
        );
    }
  }

  currentAccount($event, i) {
    this.chooseAccount = this.accounts[i];
  }
}
