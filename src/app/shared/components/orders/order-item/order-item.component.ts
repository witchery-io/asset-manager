import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../../models';
import {
  Role,
  OrderType,
  OrderContext,
  OrderDirection,
  PARENT,
} from '../../../../enums';
import {
  ModalService,
  OrderService,
} from '../../../../services';
import { BsModalRef } from 'ngx-bootstrap';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent implements OnInit {
  user: User;
  ROLE = Role;
  PARENT = PARENT;
  @Input() order: any;
  @Input() permission: string;
  @Input() accounts: any;
  OrderDirection = OrderDirection;
  OrderType = OrderType;
  OrderContext = OrderContext;
  isCollapsed: boolean;
  modalRef: BsModalRef;
  modifyForm: FormGroup;
  private readonly notifier: NotifierService;
  account_name: string;

  constructor(
    private modalService: ModalService,
    private orderService: OrderService,
    private notifierService: NotifierService,
    private spinner: NgxSpinnerService,
  ) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    const collapse = JSON.parse(localStorage.getItem(`collapse.position.${ this.order.order_number }`));
    this.isCollapsed = collapse === null ? true : collapse;
    this.setAccountName();
    this.modifyForm = new FormGroup({
      open_price: new FormControl(0),
      amount: new FormControl('', [<any>Validators.required]),
    });
  }

  get role() {
    return this.user.role;
  }

  get tradeType() {
    return this.orderService.tradeType;
  }

  get groupByPair() {
    return this.orderService.groupByPair;
  }

  get tooltip() {
    return this.account_name;
  }

  setAccountName() {
    if (this.permission !== 'parent' && this.tradeType === 'group' && this.accounts && !this.groupByPair) {
      for (const account of this.accounts) {
        if (account.id === this.order.account) {
          this.account_name = account.name;
          break;
        }
      }
    }
  }

  openModal(template: TemplateRef<any>, options = {}) {
    this.modalRef = this.modalService.show(template, options);
  }

  orderCancel() {
    this.spinner.show();
    this.modalRef.hide();
    this.orderService.cancelOrder(this.order)
      .subscribe(() => {

        this.notifier.notify('success',
          `Order cancelled, ${ this.OrderType[this.order.type.type] }, ${ this.OrderDirection[this.order.type.direction] }
           ${ this.order.amount } ${ this.order.pair } @ ${ this.order.open_price }.#p57o`);
      }, error1 => {

        this.notifier.notify('error', `Error msg: ${ error1.message }`);
      }, () => {

        this.orderService.fetchOrders();
        this.orderService.fetchPositions();
        this.spinner.hide();
      });
  }

  orderModify(template) {

    let amount = this.order.amount;
    if (this.order.suborders != null && this.order.suborders.length > 0) {
      for (const account of this.accounts) {
        if (account.id === this.order.suborders[0].account) {
          amount = this.order.suborders[0].amount / account.risk;
        }
      }
    }

    const order = JSON.parse(JSON.stringify(this.order));

    order.amount = amount;

    this.modifyForm.patchValue(order);
    this.openModal(template, {class: 'modal-sm'});
  }

  orderApprove(model: any, isValid: boolean) {
    this.spinner.show();
    if (isValid) {
      this.modalRef.hide();
      this.orderService.cancelOrder(this.order).subscribe(() => {
        if (this.tradeType === 'group') {
          model.type = this.order.type;
          model.pair = this.order.pair;
          // this.orderService.placeGroupOrder(this.order.group, {...this.order, ...model})
          this.orderService.placeGroupOrder(this.order.group, model)
            .subscribe((d: any) => {

              this.notifier.notify('success',
                `Order modified, ${ OrderType[d.type.type] }, to ${ OrderDirection[d.type.direction] }
                 ${ d.amount } ${ d.pair } @ ${ d.open_price }.#164o`);
            }, error1 => {

              this.notifier.notify('error', `Error msg: ${ error1.message }`);
            }, () => {

              this.orderService.fetchOrders();
              this.orderService.fetchPositions();
              this.spinner.hide();
            });
        } else if (this.tradeType === 'account') {

          model.type = this.order.type;
          model.pair = this.order.pair;
          this.orderService.placeAccountOrder(this.order.account, model)
            .subscribe((d: any) => {

              this.notifier.notify('success',
                `Order modified, ${ OrderType[d.type.type] }, to ${ OrderDirection[d.type.direction] }
                 ${ d.amount } ${ d.pair } @ ${ d.open_price }.#164o`);
            }, error1 => {

              this.notifier.notify('error', `Error msg: ${ error1.message }`);
            }, () => {

              this.orderService.fetchOrders();
              this.orderService.fetchPositions();
              this.spinner.hide();
            });
        }
      });
    }
  }

  collapse() {
    this.isCollapsed = !this.isCollapsed;
    localStorage.setItem(`collapse.position.${ this.order.order_number }`, this.isCollapsed ? 'true' : 'false');
  }
}
