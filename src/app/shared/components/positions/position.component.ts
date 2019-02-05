import { Component, Input, OnInit } from '@angular/core';
import { Role } from '@app/shared/enums';
import { BsModalRef } from 'ngx-bootstrap';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalService, OrdersService, PositionsService } from '@app/shared/services';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ACCOUNTS, GROUPS, PARENT } from '@app/shared/enums/trading.enum';

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
    // todo :: account_name
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

    const collapse = JSON.parse(localStorage.getItem(`collapse.position.${this.position.id}`));
    this.isCollapsed = collapse === null ? true : collapse;
    this.setAccountName();
  }

  collapse() {
    this.isCollapsed = !this.isCollapsed;
    localStorage.setItem(`collapse.position.${this.position.id}`, this.isCollapsed ? 'true' : 'false');
  }

  setAccountName() {
    if (this.permission !== 'parent' && this.type === 'group' && this.accounts && !this.groupByPair) {
      for (const account of this.accounts) {
        if (account.id === this.position.account) {
          // todo :: account_name
          this.account_name = account.acc_name;
          break;
        }
      }
    }
  }

  openModal(template: any, options = {}) {
    this.modalRef = this.modalService.show(template, options);
  }

  orderStop(template) {
    this.formValues = {
      type: 'stop',
      amount: this.amount,
    };

    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  orderLimit(template) {
    this.formValues = {
      type: 'limit',
      amount: this.amount,
    };

    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  orderClose() {
    this.spinner.show();
    this.positionsService.closePosition(this.position)
      .subscribe(() => {
        this.notifier.notify('success',
          `Order cancelled, ${this.position.type}, ${this.position.direction} ${this.position.amount} ${this.position.pair}
           @ ${this.position.openPrice}.`);
        this.modalService.closeAllModals();
      }, error1 => {
        this.notifier.notify('error', `Error msg: ${error1.message}`);
      });
  }

  onOrder(params) {
    params.pair = this.position.pair;
    params.positionId = this.position.id;

    switch (this.type) {
      case GROUPS:

        // todo :: groupId
debugger
        this.groupOrder(params);
        break;
      case ACCOUNTS:

        // todo :: accountId
debugger
        this.accountOrder(params);
        break;
    }
  }

  /**
   * @param order -- creating order
   */
  groupOrder(order) {
    this.ordersService.placeGroupOrder(order)
      .subscribe((d: any) => {
        /* `Placed ${d.type} order to ${d.direction} ${d.amount} ${d.pair} @ ${d.openPrice}. `*/
        this.notifier.notify('success', `${d}`);
        this.modalService.closeAllModals();
      }, error1 => {
        this.notifier.notify('error', `Error msg: ${error1.message}.`);
      });
  }

  /**
   * @param order -- creating order
   */
  accountOrder(order) {
    this.ordersService.placeAccountOrder(order)
      .subscribe((d: any) => {
        /* `Placed ${d.type} order to ${d.direction} ${d.amount} ${d.pair} @ ${d.openPrice}.` */
        this.notifier.notify('success', `${d}`);
        this.modalService.closeAllModals();
      }, error1 => {
        this.notifier.notify('error', `Error msg: ${error1.message}.`);
      });
  }
}
