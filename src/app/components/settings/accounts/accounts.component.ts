import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Account, User } from '../../../models';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import {
  AccountService,
  OrderService,
  NotifierService
} from '../../../services';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit {
  accounts: any[];
  user: User;
  modalRef: BsModalRef;
  accountForm: FormGroup;
  account: any;
  editAccountForm: FormGroup;
  private readonly notifier: NotifierService;

  constructor(
    private modalService: BsModalService,
    public accountService: AccountService,
    public orderService: OrderService,
    private notifierService: NotifierService,
  ) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.accountService.getAccounts().subscribe(accounts => this.accounts = accounts);
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    this.accountForm = new FormGroup({
      acc_name: new FormControl('', [<any>Validators.required]),
      user_name: new FormControl('', [<any>Validators.required]),
      risk: new FormControl(0, [<any>Validators.required]),
      exchange: new FormControl('bitfinex', [<any>Validators.required]),
      base_currency: new FormControl('usd', [<any>Validators.required]),
    });

    this.editAccountForm = new FormGroup({
      acc_name: new FormControl('', [<any>Validators.required]),
      user_name: new FormControl('', [<any>Validators.required]),
      risk: new FormControl(0, [<any>Validators.required]),
      exchange: new FormControl('bitfinex', [<any>Validators.required]),
      base_currency: new FormControl('usd', [<any>Validators.required]),
    });
  }

  get role() {
    return this.user.role;
  }

  get balance() {
    return this.orderService.balance;
  }

  openModal(template: TemplateRef<any>, options = {}) {
    this.modalRef = this.modalService.show(template, options);
  }

  createAccount(model: Account, isValid: boolean) {
    if (isValid) {
      this.accountService.createAccount({ ...model, ...{ risk: +model.risk } })
        .subscribe(() => {
          this.accountService.getAccounts().subscribe(accounts => this.accounts = accounts);
            this.accountForm.reset({ risk: 0 });
            this.modalRef.hide();
          },
        );
    }
  }

  editAccount(model: Account, isValid: boolean) {
    if (isValid) {
      this.accountService.editAccount(model)
        .subscribe(() => {
            this.modalRef.hide();
            this.notifier.notify( 'success', `Success edited account`);
          },
        );
    }
  }

  currentAccount($event, i) {
    this.account = this.accounts[i];
    this.orderService.groupByPair = false;
    this.orderService.tradeType = 'account';
    this.orderService.tradeTypeId = this.account.id;
    this.orderService.fetchBalance();
    this.orderService.fetchOrders();
    this.orderService.fetchPositions();
  }

  edit(item_index, template: TemplateRef<any>) {
    this.editAccountForm.patchValue(this.accounts[item_index]);
    this.openModal(template);
  }
}
