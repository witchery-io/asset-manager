import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Account } from '../../../models/account';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AccountService } from '../../../services/account.service';
import {OrderService} from '../../../services/order.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit {

  @Input() accounts: any;
  @Output() update: EventEmitter<any> = new EventEmitter();
  modalRef: BsModalRef;
  accountForm: FormGroup;
  account: any;
  balance: any;

  constructor(
    private modalService: BsModalService,
    private accountService: AccountService,
    public orderService: OrderService
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
            this.update.emit();
            this.accountForm.reset({ risk: 0 });
            this.modalRef.hide();
          },
        );
    }
  }

  currentAccount($event, i) {
    this.account = this.accounts[i];
    this.balance = this.account;

    this.orderService.orders = [];
    this.orderService.positions = [];
    this.orderService.getAccountOrders(this.account.id, false)
      .subscribe(
        orders => {
          if (orders !== null && orders.length > 0) {
            this.orderService.orders = orders;
          }
        }
      );


    this.orderService.getAccountPositions(this.account.id, false)
      .subscribe(
        positions => {
          if (positions !== null && positions.length > 0) {
            this.orderService.positions = positions;
          }
        }
      );
  }
}
