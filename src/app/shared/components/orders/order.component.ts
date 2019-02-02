import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { OrderContext, OrderDirection, OrderType, Role } from '@app/shared/enums';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalService, OrdersService } from '@app/shared/services';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ACCOUNTS, GROUPS, PARENT } from '@app/shared/enums/trading.enum';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  role = 'admin';
  user: any; // user
  ROLE = Role;
  PARENT = PARENT;
  faPlus = faPlus;
  faMinus = faMinus;

  @Input()
  order: any;

  @Input()
  permission: string;

  @Input()
  accounts: any;

  @Input()
  type = GROUPS;

  @Input()
  groupByPair = false;

  OrderDirection = OrderDirection;
  OrderType = OrderType;
  OrderContext = OrderContext;
  isCollapsed: boolean;
  modalRef: BsModalRef;
  modifyForm: FormGroup;
  account_name: string;
  private readonly notifier: NotifierService;

  constructor(
    private modalService: ModalService,
    private notifierService: NotifierService,
    private spinner: NgxSpinnerService,
    private ordersService: OrdersService,
  ) {
    this.notifier = notifierService;
  }

  get tooltip() {
    return this.account_name;
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    const collapse = JSON.parse(localStorage.getItem(`collapse.position.${this.order.order_number}`));
    this.isCollapsed = collapse === null ? true : collapse;
    this.setAccountName();
    this.modifyForm = new FormGroup({
      open_price: new FormControl(0),
      amount: new FormControl('', [<any>Validators.required]),
    });
  }

  setAccountName() {
    if (this.permission !== 'parent' && this.type === 'group' && this.accounts && !this.groupByPair) {
      for (const account of this.accounts) {
        if (account.id === this.order.account) {
          this.account_name = account.name;
          break;
        }
      }
    }
  }

  openModal(template: any, options = {}) {
    this.modalRef = this.modalService.show(template, options);
  }

  /**
   * close current order
   */
  orderCancel() {
    this.spinner.show();
    this.ordersService.cancelOrder(this.order)
      .subscribe(() => {
        this.notifier.notify('success',
          `Order cancelled, ${this.OrderType[this.order.type.type]}, ${this.OrderDirection[this.order.type.direction]}
           ${this.order.amount} ${this.order.pair} @ ${this.order.open_price}.`);
      }, error1 => {
        this.notifier.notify('error', `Error msg: ${error1.message}.`);
      }, () => {
        this.spinner.hide();
        this.modalService.closeAllModals();
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
    if (isValid) {
      this.spinner.show();
      this.ordersService.cancelOrder(this.order)
        .subscribe(() => {
          model.type = this.order.type;
          model.pair = this.order.pair;

          switch (this.type) {
            case GROUPS:
              this.groupOrder(this.order.group, model);
              break;
            case ACCOUNTS:
              this.accountOrder(this.order.account, model);
              break;
          }
        });
    }
  }

  /**
   *
   * @param id -- current order group >name<
   * @param order -- creating order
   */
  groupOrder(id, order) {
    this.ordersService.placeGroupOrder(id, order)
      .subscribe((d: any) => {
        this.notifier.notify('success',
          `Order modified, ${OrderType[d.type.type]}, to ${OrderDirection[d.type.direction]}
             ${d.amount} ${d.pair} @ ${d.open_price}.`);
      }, error1 => {
        this.notifier.notify('error', `Error msg: ${error1.message}.`);
      }, () => {
        this.spinner.hide();
        this.modalService.closeAllModals();
      });
  }

  /**
   *
   * @param id -- current order account >name<
   * @param order -- creating order
   */
  accountOrder(id, order) {
    this.ordersService.placeAccountOrder(id, order)
      .subscribe((d: any) => {
        this.notifier.notify('success',
          `Order modified, ${OrderType[d.type.type]}, to ${OrderDirection[d.type.direction]}
             ${d.amount} ${d.pair} @ ${d.open_price}.`);
      }, error1 => {
        this.notifier.notify('error', `Error msg: ${error1.message}`);
      }, () => {
        this.spinner.hide();
        this.modalService.closeAllModals();
      });
  }

  collapse() {
    this.isCollapsed = !this.isCollapsed;
    localStorage.setItem(`collapse.position.${this.order.order_number}`, this.isCollapsed ? 'true' : 'false');
  }
}
