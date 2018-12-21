import { Component, Input, OnInit, TemplateRef, } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { ViewCell } from 'ng2-smart-table';
import { BsModalRef, BsModalService, } from 'ngx-bootstrap';
import { NotifierService } from 'angular-notifier';
import { OrderContext, OrderDirection, OrderType } from '@app/shared/enums';
import { OrdersService } from '@app/shared/services';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button-view, button-view',
  templateUrl: './button-view.component.html',
  styleUrls: ['./button-view.component.scss'],
})
export class ButtonViewComponent implements ViewCell, OnInit {
  @Input() value: string | number;
  @Input() rowData: any;
  user: any; // >> User <<
  faPlus = faPlus;

  exchangeForm: FormGroup;
  marginForm: FormGroup;
  modalRef: BsModalRef;
  currentTickId: number;
  private readonly notifier: NotifierService;

  constructor(
    private modalService: BsModalService,
    private ordersService: OrdersService,
    private notifierService: NotifierService,
    // private tickService: TickService,
  ) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

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

  get tick() {
    return {
      pair: 'test pair',
    }; // this.tickService.ticks[this.currentTickId];
  }

  openModal(template: TemplateRef<any>, params = {}) {
    this.modalRef = this.modalService.show(template, params);
  }

  tickSettings(template: TemplateRef<any>) {
    this.currentTickId = +this.value;
    this.openModal(template, {class: 'modal-sm'});
  }

  // return this.orderService.tradeType;
  get tradeType() { // group & account
    return 'group';
  }

  //     return this.orderService.tradeTypeId;
  get tradeTypeId() {
    return true;
  }

  placeOrder(direction, context, model) {
    const order = { // >> Order <<
      amount: model.amount,
      open_price: model.price,
      pair: this.tick.pair,
      type: {
        context: +OrderContext[context],
        direction: +OrderDirection[direction],
        type: +OrderType[model.o_type],
      }
    };
    if (this.tradeType === 'group') {
      this.ordersService.placeGroupOrder('', order) // >> this.tradeTypeId <<
        .subscribe((d: any) => {

          this.notifier.notify('success',
            `Placed ${OrderType[d.type.type]} order to ${OrderDirection[d.type.direction]}
             ${d.amount} ${d.pair} @ ${d.open_price}.#111`);
        }, error1 => {

          this.notifier.notify('error', `Error msg: ${error1.message}`);
        });
    } else if (this.tradeType === 'account') {
      this.ordersService.placeAccountOrder('', order) // >> this.tradeTypeId <<
        .subscribe((d: any) => {

          this.notifier.notify('success',
            `Placed ${OrderType[d.type.type]} order to ${OrderDirection[d.type.direction]}
             ${d.amount} ${d.pair} @ ${d.open_price}.#122`);
        }, error1 => {

          this.notifier.notify('error', `Error msg: ${error1.message}`);
        });
    }
    this.modalRef.hide();
  }

  buyExchange(model: any, isValid: boolean) { // >> Exchange <<
    if (!isValid) {
      return false;
    }

    this.placeOrder('buy', 'exchange', model);
  }

  sellExchange(model: any, isValid: boolean) { // >> Exchange <<
    if (!isValid) {
      return false;
    }

    this.placeOrder('sell', 'exchange', model);
  }

  buyMargin(model: any, isValid: boolean) { // >> Margin <<
    if (!isValid) {
      return false;
    }

    this.placeOrder('buy', 'margin', model);
  }

  sellMargin(model: any, isValid: boolean) { // >> Margin <<
    if (!isValid) {
      return false;
    }

    this.placeOrder('sell', 'margin', model);
  }

  // this.user.role;
  get role() { // admin or guest
    return 'admin';
  }
}
