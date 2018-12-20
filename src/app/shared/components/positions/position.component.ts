import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { OrderContext, OrderDirection, OrderType, PARENT, Role } from '@app/shared/enums';
import { BsModalRef } from 'ngx-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalService, PositionsService } from '@app/shared/services';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

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
  exchangeForm: FormGroup;
  marginForm: FormGroup;
  private readonly notifier: NotifierService;
  account_name: string;


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

  get tradeType() { // group or account
    return 'group';
  }

  get tradeTypeId() { // account or group >> id <<
    return '6a86df61-c190-4347-9b61-34cbd88d38a4';
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

    this.marginForm.patchValue({
      o_type: 'stop',
      amount: amount,
    });

    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  orderLimit(template) {

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

    this.marginForm.patchValue({
      o_type: 'limit',
      amount: amount,
    });

    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  orderClose() {
    this.spinner.show();
    this.modalRef.hide();
    this.positionsService.closePosition(this.position)
      .subscribe(() => {

        this.notifier.notify('success',
          `Order cancelled, ${OrderType[this.position.type.type]}, ${OrderDirection[this.position.type.direction]}
           ${this.position.amount} ${this.position.pair} @ ${this.position.open_price}.#o109o`);
      }, error1 => {

        this.notifier.notify('error', `Error msg: ${error1.message}`);
      }, () => {
        this.spinner.hide();
      });
  }

  buyExchange(model: any, isValid: boolean) {  // >> Exchange << first arg. is removed
    if (!isValid) {
      return false;
    }

    this.placeOrder('buy', 'exchange', model);
  }

  sellExchange(model: any, isValid: boolean) { // >> Exchange << first arg. is removed
    if (!isValid) {
      return false;
    }

    this.placeOrder('sell', 'exchange', model);
  }

  buyMargin(model: any, isValid: boolean) { // Margin is removed
    if (!isValid) {
      return false;
    }

    this.placeOrder('buy', 'margin', model);
  }

  sellMargin(model: any, isValid: boolean) { // >> Margin << first arg. is removed
    if (!isValid) {
      return false;
    }

    this.placeOrder('sell', 'margin', model);
  }

  placeOrder(direction, context, model) {
    this.spinner.show();

    const order = { // todo Order is removed
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
      this.positionsService.placeGroupOrder(this.tradeTypeId, order)
        .subscribe((d: any) => {

          this.notifier.notify('success',
            `Placed ${OrderType[d.type.type]} order to ${OrderDirection[d.type.direction]}
             ${d.amount} ${d.amount} @ ${d.open_price}.#236o`);
        }, error1 => {

          this.notifier.notify('error', `Error msg: ${error1.message}`);
        }, () => {
          this.spinner.hide();
        });
    } else if (this.tradeType === 'account') {

      this.positionsService.placeAccountOrder(this.tradeTypeId, order)
        .subscribe((d: any) => {

          this.notifier.notify('success',
            `Placed ${OrderType[d.type.type]} order to ${OrderDirection[d.type.direction]}
             ${d.amount} ${d.amount} @ ${d.open_price}.#245o`);
        }, error1 => {

          this.notifier.notify('error', `Error msg: ${error1.message}`);
        }, () => {
          this.spinner.hide();
        });
    }

    this.modalRef.hide();
  }

  collapse() {
    this.isCollapsed = !this.isCollapsed;
    localStorage.setItem(`collapse.position.${this.position.order_number}`, this.isCollapsed ? 'true' : 'false');
  }

}
