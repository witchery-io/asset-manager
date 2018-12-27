import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { OrderDirection, OrderType, Role } from '@app/shared/enums';
import { BsModalRef } from 'ngx-bootstrap';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalService, PositionsService } from '@app/shared/services';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { PARENT } from '@app/shared/enums/trading.enum';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
})
export class PositionComponent implements OnInit {

  @Input()
  permission: string;

  @Input()
  accounts: any;

  @Input()
  position: any;

  faPlus = faPlus;
  faMinus = faMinus;

  user: any; // User
  ROLE = Role;
  PARENT = PARENT;
  OrderDirection = OrderDirection;
  isCollapsed: boolean;
  modalRef: BsModalRef;
  account_name: string;
  private readonly notifier: NotifierService;

  formValues: any;

  constructor(
    private positionsService: PositionsService,
    private modalService: ModalService,
    private notifierService: NotifierService,
    private spinner: NgxSpinnerService,
  ) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    const collapse = JSON.parse(localStorage.getItem(`collapse.position.${this.position.order_number}`));
    this.isCollapsed = collapse === null ? true : collapse;
    this.setAccountName();
  }

  get feeOrSwap() {
    return this.tradeType === 'group' ? this.position.fee : this.position.swap;
  }

  get tradeType() { // group or account
    return 'group';
  }

  get tradeTypeId() { // 6a86df61-c190-4347-9b61-34cbd88d38a4
    return '';
  }

  get groupByPair() { // bool value
    return true;
  }

  get role() { // admin or guest
    return 'admin';
  }

  get tooltip() {
    return this.account_name;
  }

  collapse() {
    this.isCollapsed = !this.isCollapsed;
    localStorage.setItem(`collapse.position.${this.position.order_number}`, this.isCollapsed ? 'true' : 'false');
  }

  setAccountName() {
    if (this.permission !== 'parent' && this.tradeType === 'group' && this.accounts && !this.groupByPair) {
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
      o_type: 0,
      amount: this.amount,
    };

    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  orderLimit(template) {
    this.formValues = {
      o_type: 2,
      amount: this.amount,
    };

    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  get amount() {
    console.log('set amount');
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
}
