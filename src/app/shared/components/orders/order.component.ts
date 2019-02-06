import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { Role } from '@app/shared/enums';
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
  user: any;
  ROLE = Role;
  PARENT = PARENT;
  faPlus = faPlus;
  faMinus = faMinus;
  @Input()
  id: string;
  @Input()
  type = GROUPS;
  @Input()
  order: any;
  @Input()
  permission: string;
  @Input()
  accounts: any;
  @Input()
  groupByPair = false;
  isCollapsed: boolean;
  modalRef: BsModalRef;
  modifyForm: FormGroup;
  private readonly notifier: NotifierService;

  // account_name: string;

  constructor(
    private modalService: ModalService,
    private notifierService: NotifierService,
    private spinner: NgxSpinnerService,
    private ordersService: OrdersService,
  ) {
    this.notifier = notifierService;
  }

  get tooltip() {
    // return this.account_name;
    return '';
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    const collapse = JSON.parse(localStorage.getItem(`collapse.position.${this.order.orderNumber}`));
    this.isCollapsed = collapse === null ? true : collapse;
    this.setAccountName();
    this.modifyForm = new FormGroup({
      price: new FormControl(0),
      originalAmount: new FormControl('', [<any>Validators.required]),
    });
  }

  setAccountName() {
    /*    if (this.permission !== 'parent' && this.type === 'group' && this.accounts && !this.groupByPair) {
          for (const account of this.accounts) {
            if (account.id === this.order.account) {
              this.account_name = account.name;
              break;
            }
          }
        }*/
  }

  openModal(template: any, options = {}) {
    this.modalRef = this.modalService.show(template, options);
  }

  /**
   * close current order
   */
  orderCancel() {
    this.ordersService.cancelOrder(this.order.orderNumber)
      .subscribe(() => {
        this.notifier.notify('success',
          `Order cancelled, ${this.order.type}, ${this.order.direction} ${this.order.amount} ${this.order.pair}
           @ ${this.order.openPrice}.`);
        this.modalService.closeAllModals();
      });
  }

  orderModify(order, template) {
    let originalAmount = this.order.originalAmount;
    if (this.order.suborders != null && this.order.suborders.length > 0) {
      for (const account of this.accounts) {
        if (account.id === this.order.suborders[0].account) {
          originalAmount = this.order.suborders[0].originalAmount / account.risk;
        }
      }
    }

    order.originalAmount = originalAmount;

    this.modifyForm.patchValue(order);
    this.openModal(template, {class: 'modal-sm'});
  }

  orderApprove(model: any, isValid: boolean) {
    if (isValid) {
      this.ordersService.cancelOrder(this.order.orderNumber)
        .subscribe(() => {
          model.type = this.order.type;
          model.pair = this.order.pair;
          model.orderNumber = this.order.orderNumber;

          switch (this.type) {
            case GROUPS:
              this.groupOrder(this.id, model);
              break;
            case ACCOUNTS:
              this.accountOrder(this.id, model);
              break;
          }
        });
    }
  }

  /**
   * @param id - string
   * @param order -- creating order
   */
  groupOrder(id, order) {
    this.ordersService.placeGroupOrder(id, order)
      .subscribe((d: any) => {
        this.notifier.notify('success',
          `Order modified, ${d.type}, to ${d.direction} ${d.amount} ${d.pair} @ ${d.openPrice}.`);
        this.modalService.closeAllModals();
      });
  }

  /**
   * @param id - string
   * @param order -- creating order
   */
  accountOrder(id, order) {
    this.ordersService.placeAccountOrder(id, order)
      .subscribe((d: any) => {
        this.notifier.notify('success',
          `Order modified, ${d.type}, to ${d.direction} ${d.amount} ${d.pair} @ ${d.price}.`);
        this.modalService.closeAllModals();
      });
  }

  collapse() {
    this.isCollapsed = !this.isCollapsed;
    localStorage.setItem(`collapse.position.${this.order.orderNumber}`, this.isCollapsed ? 'true' : 'false');
  }
}
