import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { OrderDirection, OrderType, Role } from '@app/shared/enums';
import { BsModalRef } from 'ngx-bootstrap';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalService, OrdersService, PositionsService } from '@app/shared/services';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ACCOUNT, GROUP, PARENT } from '@app/shared/enums/trading.enum';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
})
export class PositionComponent implements OnInit {

  @Input()
  id: string;

  @Input()
  type: string;

  @Input()
  permission: string;

  @Input()
  accounts: any;

  @Input()
  position: any;

  role = 'admin';

  faPlus = faPlus;
  faMinus = faMinus;

  user: any; // User
  ROLE = Role;
  PARENT = PARENT;
  OrderDirection = OrderDirection;
  isCollapsed: boolean;
  modalRef: BsModalRef;
  account_name: string;
  formValues: any;
  groupByPair = true;
  private readonly notifier: NotifierService;

  constructor(
    private positionsService: PositionsService,
    private modalService: ModalService,
    private notifierService: NotifierService,
    private spinner: NgxSpinnerService,
    private ordersService: OrdersService,
  ) {
    this.notifier = notifierService;
  }

  get feeOrSwap() {
    return this.type === 'group' ? this.position.fee : this.position.swap;
  }

  get tooltip() {
    return this.account_name;
  }

  get amount() {
    let amount = this.position.amount;
    if (this.position.suborders != null && this.position.suborders.length > 0) {
      if (this.position.suborders[0].suborders != null && this.position.suborders[0].suborders.length) {
        for (const account of this.accounts) {
          if (account.id === this.position.suborders[0].suborders[0].account) {
            amount = this.position.suborders[0].suborders[0].amount / account.risk;
          }
        }
      } else {
        for (const account of this.accounts) {
          if (account.id === this.position.suborders[0].account) {
            amount = this.position.suborders[0].amount / account.risk;
          }
        }
      }
    }

    return amount;
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    const collapse = JSON.parse(localStorage.getItem(`collapse.position.${this.position.order_number}`));
    this.isCollapsed = collapse === null ? true : collapse;
    this.setAccountName();
  }

  collapse() {
    this.isCollapsed = !this.isCollapsed;
    localStorage.setItem(`collapse.position.${this.position.order_number}`, this.isCollapsed ? 'true' : 'false');
  }

  setAccountName() {
    if (this.permission !== 'parent' && this.type === 'group' && this.accounts && !this.groupByPair) {
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
    this.formValues = {
      o_type: OrderType.stop,
      amount: this.amount,
    };

    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  orderLimit(template) {
    this.formValues = {
      o_type: OrderType.limit,
      amount: this.amount,
    };

    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  orderClose() {
    this.spinner.show();
    this.modalRef.hide();
    this.positionsService.closePosition() // this.position
      .subscribe(() => {
        this.notifier.notify('success',
          `Order cancelled, ${OrderType[this.position.type.type]}, ${OrderDirection[this.position.type.direction]}
           ${this.position.amount} ${this.position.pair} @ ${this.position.open_price}.`);
      }, error1 => {
        this.notifier.notify('error', `Error msg: ${error1.message}`);
      }, () => {
        this.spinner.hide();
      });
  }

  onOrder(params) {
    params.pair = this.position.pair;

    switch (this.type) {
      case GROUP:
        this.groupOrder(params);
        break;
      case ACCOUNT:
        this.accountOrder(params);
        break;
    }
  }

  groupOrder(order) {
    this.ordersService.placeGroupOrder(this.id, order)
      .subscribe((d: any) => {
        const msg = `Placed ${OrderType[d.type.type]} order to ${OrderDirection[d.type.direction]}
           ${d.amount} ${d.pair} @ ${d.open_price}.`;
        this.notifier.notify('success', msg);
      }, error1 => {
        this.notifier.notify('error', `Error msg: ${error1.message}`);
      }, () => {
        this.modalService.closeAllModals();
      });
  }

  accountOrder(order) {
    this.ordersService.placeAccountOrder(this.id, order)
      .subscribe((d: any) => {
        const msg = `Placed ${OrderType[d.type.type]} order to ${OrderDirection[d.type.direction]}
           ${d.amount} ${d.pair} @ ${d.open_price}.`;
        this.notifier.notify('success', msg);
      }, error1 => {
        this.notifier.notify('error', `Error msg: ${error1.message}`);
      }, () => {
        this.modalService.closeAllModals();
      });
  }
}
