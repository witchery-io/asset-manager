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
  @Input() id: string;
  @Input() type: string;
  @Input() permission: string;
  @Input() accounts: any;
  @Input() position: any;
  role = 'admin';
  faPlus = faPlus;
  faMinus = faMinus;
  user: any;
  ROLE = Role;
  PARENT = PARENT;
  isCollapsed: boolean;
  modalRef: BsModalRef;
  formValues: any;
  groupByPair = true;
  private readonly notifier: NotifierService;
  // account_name: string;

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
    // return this.account_name;
    return '';
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
/*    if (this.permission !== 'parent' && this.type === 'group' && this.accounts && !this.groupByPair) {
      for (const account of this.accounts) {
        if (account.id === this.position.account) {
          this.account_name = account.acc_name;
          break;
        }
      }
    }*/
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
    this.positionsService.closePosition(this.position.id)
      .subscribe(() => {
        this.modalService.closeAllModals();
        this.notifier.notify('success',
          `Order cancelled,
           ${this.position.type}, ${this.position.direction} ${this.position.amount} ${this.position.pair} @ ${this.position.openPrice}.`);
      });
  }

  onOrder(params) {
    params.pair = this.position.pair;
    params.positionId = this.position.id;

    switch (this.type) {
      case GROUPS:
        this.groupOrder(this.id, params);
        break;
      case ACCOUNTS:
        this.accountOrder(this.id, params);
        break;
    }
  }

  /**
   * @param id * important param
   * @param order -- creating order
   */
  groupOrder(id, order) {
    this.ordersService.placeGroupOrder(id, order)
      .subscribe((d: any) => {
        this.modalService.closeAllModals();
        this.notifier.notify('success',
          `Placed ${d.type} order to ${d.direction} ${d.amount} ${d.pair} @ ${d.openPrice}.`);
      });
  }

  /**
   * @param id * important param
   * @param order -- creating order
   */
  accountOrder(id, order) {
    this.ordersService.placeAccountOrder(id, order)
      .subscribe((d: any) => {
        this.modalService.closeAllModals();
        this.notifier.notify('success',
          `Placed ${d.type} order to ${d.direction} ${d.amount} ${d.pair} @ ${d.openPrice}.`);
      });
  }
}
