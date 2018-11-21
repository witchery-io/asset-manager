import {
  Component,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';

import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import {
  ViewCell,
} from 'ng2-smart-table';

import {
  BsModalRef,
  BsModalService,
} from 'ngx-bootstrap';

import {
  OrderService,
  NotifierService,
  TickService,
  AccountService,
} from '../../../services';

import {
  Order,
  Exchange,
  Margin,
} from '../../../models';

@Component({
  selector: 'app-button-view, button-view',
  templateUrl: './button-view.component.html',
  styleUrls: ['./button-view.component.scss'],
})
export class ButtonViewComponent implements ViewCell, OnInit {
  @Input() value: string | number;
  @Input() rowData: any;

  exchangeForm: FormGroup;
  marginForm: FormGroup;
  modalRef: BsModalRef;
  currentTickId: number;
  enums = {
    'buy': 0,
    'sell': 1,
    'stop': 0,
    'market': 1,
    'limit': 2,
    'exchange': 0,
    'margin': 1,
  };
  private readonly notifier: NotifierService;

  constructor(
    private modalService: BsModalService,
    private orderService: OrderService,
    private notifierService: NotifierService,
    private tickService: TickService,
    private accountService: AccountService,
  ) {
    this.notifier = notifierService;
  }

  ngOnInit() {
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
    return this.tickService.ticks[this.currentTickId];
  }

  openModal(template: TemplateRef<any>, params = {}) {
    this.modalRef = this.modalService.show(template, params);
  }

  tickSettings(template: TemplateRef<any>) {
    this.currentTickId = +this.value;
    this.openModal(template, { class: 'modal-sm' });
  }

  placeOrder(direction, type, model) {
    const order: Order = {
      amount: model.amount,
      open_price: model.price,
      pair: this.tick.pair,
      type: {
        context: this.enums[type],
        direction: this.enums[direction],
        type: this.enums[model.o_type],
      }
    };
    if (this.orderService.tradeType === 'group') {
      this.orderService.placeGroupOrder(this.orderService.tradeTypeId, order)
        .subscribe((d: any) => {
          const _msg = `Placed ${ d.type.type } order to ${ d.type.direction } ${ d.amount } ${ d.pair } @ ${ d.open_price }.#111`;
          this.notifier.notify( 'success', _msg);
          this.orderService.fetchOrders();
        }, error1 => {
          this.notifier.notify( 'error', `Error msg: ${ error1.message }`);
        });
    } else if (this.orderService.tradeType === 'account') {
      this.orderService.placeAccountOrder(this.orderService.tradeTypeId, order)
        .subscribe((d: any) => {
          const _msg = `Placed ${ d.type.type } order to ${ d.type.direction } ${ d.amount } ${ d.pair } @ ${ d.open_price }.#122`;
          this.notifier.notify( 'success', _msg);
          this.orderService.fetchOrders();
        }, error1 => {
          this.notifier.notify( 'error', `Error msg: ${ error1.message }`);
        });
    }
  }

  buyExchange(model: Exchange, isValid: boolean) {
    if (isValid) {
      this.placeOrder('buy', 'exchange', model);
      this.modalRef.hide();
    }
  }

  sellExchange(model: Exchange, isValid: boolean) {
    if (isValid) {
      this.placeOrder('sell', 'exchange', model);
      this.modalRef.hide();
    }
  }

  buyMargin(model: Margin, isValid: boolean) {
    if (isValid) {
      this.placeOrder('buy', 'margin', model);
      this.modalRef.hide();
    }
  }

  sellMargin(model: Margin, isValid: boolean) {
    if (isValid) {
      this.placeOrder('sell', 'margin', model);
      this.modalRef.hide();
    }
  }

  get role() {
    return this.accountService.role;
  }
}
