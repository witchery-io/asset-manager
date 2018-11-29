import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Exchange,
  Margin,
  Order,
  User
} from '../../../../../models';
import {
  Role,
  OrderDirection,
  OrderContext,
  OrderType,
  PARENT,
} from '../../../../../enums';
import { BsModalRef } from 'ngx-bootstrap';
import {
  ModalService,
  OrderService,
} from '../../../../../services';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-position-item',
  templateUrl: './position-item.component.html',
  styleUrls: ['./position-item.component.scss'],
})
export class PositionItemComponent implements OnInit {
  user: User;
  ROLE = Role;
  @Input() position: any;
  @Input() permission: string;
  @Input() accounts: any;
  PARENT = PARENT;
  OrderDirection = OrderDirection;
  isCollapsed: boolean;
  modalRef: BsModalRef;
  exchangeForm: FormGroup;
  marginForm: FormGroup;
  private readonly notifier: NotifierService;
  account_name: string;

  constructor(
    private orderService: OrderService,
    private modalService: ModalService,
    private notifierService: NotifierService,
    private spinner: NgxSpinnerService,
  ) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    const collapse = JSON.parse(localStorage.getItem(`collapse.position.${ this.position.order_number }`));
    this.isCollapsed = collapse === null ? true : collapse;
    this.setAccountName();
    this.exchangeForm = new FormGroup({
      o_type: new FormControl('limit', [<any>Validators.required]),
      price: new FormControl(0),
      amount: new FormControl('', [<any>Validators.required]),
    });

    this.marginForm = new FormGroup({
      o_type: new FormControl('limit', [<any>Validators.required]),
      price: new FormControl(0),
      amount: new FormControl('', [<any>Validators.required]),
    });
  }

  get feeOrSwap() {
    return this.tradeType === 'group' ? this.position.fee : this.position.swap;
  }

  get tradeType() {
    return this.orderService.tradeType;
  }

  get tradeTypeId() {
    return this.orderService.tradeTypeId;
  }

  get role() {
    return this.user.role;
  }

  get tooltip() {
    return this.account_name;
  }

  setAccountName() {
    if (this.permission !== 'parent' && this.tradeType === 'group' && this.accounts) {
      for (const account of this.accounts) {
        if (account.id === this.position.account) {
          this.account_name = account.acc_name;
          break;
        }
      }
    }
  }

  openModal(template: TemplateRef<any>, options = {}) {
    this.modalRef = this.modalService.show(template, options);
  }

  orderStop(template) {
    this.marginForm.patchValue({
      o_type: 'stop',
      amount: this.position.amount,
    });

    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  orderLimit(template) {
    this.marginForm.patchValue({
      o_type: 'limit',
      amount: this.position.amount,
    });

    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  orderClose() {
    this.spinner.show();
    this.modalRef.hide();
    this.orderService.closePosition(this.position)
      .subscribe(() => {

        this.notifier.notify( 'success',
          `Order cancelled, ${ OrderType[this.position.type.type] }, ${ OrderDirection[this.position.type.direction] }
           ${ this.position.amount } ${ this.position.pair } @ ${ this.position.open_price }.#o109o`);
      }, error1 => {

        this.notifier.notify( 'error', `Error msg: ${ error1.message }`);
      }, () => {

        this.orderService.fetchOrders();
        this.spinner.hide();
      });
  }

  buyExchange(model: Exchange, isValid: boolean) {
    if (!isValid) {
      return false;
    }

    this.placeOrder('buy', 'exchange', model);
  }

  sellExchange(model: Exchange, isValid: boolean) {
    if (!isValid) {
      return false;
    }

    this.placeOrder('sell', 'exchange', model);
  }

  buyMargin(model: Margin, isValid: boolean) {
    if (!isValid) {
      return false;
    }

    this.placeOrder('buy', 'margin', model);
  }

  sellMargin(model: Margin, isValid: boolean) {
    if (!isValid) {
      return false;
    }

    this.placeOrder('sell', 'margin', model);
  }

  placeOrder(direction, context, model) {
    this.spinner.show();

    const order: Order = {
      amount: model.amount,
      open_price: model.price,
      pair: this.position.pair,
      type: {
        context: +OrderContext[context],
        direction: +OrderDirection[direction],
        type: +OrderType[model.o_type],
      }
    };

    if (this.tradeType === 'group') {
      this.orderService.placeGroupOrder(this.tradeTypeId, order)
        .subscribe((d: any) => {

          this.notifier.notify( 'success',
            `Placed ${ OrderType[d.type.type] } order to ${ OrderDirection[d.type.direction] }
             ${ d.amount } ${ d.amount } @ ${ d.open_price }.#236o`);
        }, error1 => {

          this.notifier.notify( 'error', `Error msg: ${ error1.message }`);
        }, () => {

          this.orderService.fetchOrders();
          this.spinner.hide();
        });
    } else if (this.tradeType === 'account') {

      this.orderService.placeAccountOrder(this.tradeTypeId, order)
        .subscribe((d: any) => {

          this.notifier.notify( 'success',
            `Placed ${ OrderType[d.type.type] } order to ${ OrderDirection[d.type.direction] }
             ${ d.amount } ${ d.amount } @ ${ d.open_price }.#245o`);
        }, error1 => {

          this.notifier.notify( 'error', `Error msg: ${ error1.message }`);
        }, () => {

          this.orderService.fetchOrders();
          this.spinner.hide();
        });
    }

    this.modalRef.hide();
  }

  collapse() {
    this.isCollapsed = !this.isCollapsed;
    localStorage.setItem(`collapse.position.${ this.position.order_number }`, this.isCollapsed ? 'true' : 'false');
  }
}
