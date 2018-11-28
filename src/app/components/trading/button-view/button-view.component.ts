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
import { ViewCell } from 'ng2-smart-table';
import {
  BsModalRef,
  BsModalService,
} from 'ngx-bootstrap';
import {
  OrderService,
  NotifierService,
  TickService,
} from '../../../services';
import {
  Order,
  Exchange,
  Margin, User,
} from '../../../models';
import {
  OrderContext,
  OrderDirection,
  OrderType,
} from '../../../enums';

@Component({
  selector: 'app-button-view, button-view',
  templateUrl: './button-view.component.html',
  styleUrls: ['./button-view.component.scss'],
})
export class ButtonViewComponent implements ViewCell, OnInit {
  @Input() value: string | number;
  @Input() rowData: any;
  user: User;

  exchangeForm: FormGroup;
  marginForm: FormGroup;
  modalRef: BsModalRef;
  currentTickId: number;
  private readonly notifier: NotifierService;

  constructor(
    private modalService: BsModalService,
    private orderService: OrderService,
    private notifierService: NotifierService,
    private tickService: TickService,
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
    return this.tickService.ticks[this.currentTickId];
  }

  openModal(template: TemplateRef<any>, params = {}) {
    this.modalRef = this.modalService.show(template, params);
  }

  tickSettings(template: TemplateRef<any>) {
    this.currentTickId = +this.value;
    this.openModal(template, { class: 'modal-sm' });
  }

  get tradeType() {
    return this.orderService.tradeType;
  }

  get tradeTypeId() {
    return this.orderService.tradeTypeId;
  }

  placeOrder(direction, context, model) {
    const order: Order = {
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
      this.orderService.placeGroupOrder(this.tradeTypeId, order)
        .subscribe((d: any) => {

          this.notifier.notify( 'success',
            `Placed ${ OrderType[d.type.type] } order to ${ OrderDirection[d.type.direction] }
             ${ d.amount } ${ d.pair } @ ${ d.open_price }.#111`);
          this.orderService.fetchOrders();
        }, error1 => {

          this.notifier.notify( 'error', `Error msg: ${ error1.message }`);
        });
    } else if (this.tradeType === 'account') {
      this.orderService.placeAccountOrder(this.tradeTypeId, order)
        .subscribe((d: any) => {

          this.notifier.notify( 'success',
            `Placed ${ OrderType[d.type.type] } order to ${ OrderDirection[d.type.direction] }
             ${ d.amount } ${ d.pair } @ ${ d.open_price }.#122`);
          this.orderService.fetchOrders();
        }, error1 => {

          this.notifier.notify( 'error', `Error msg: ${ error1.message }`);
        });
    }
    this.modalRef.hide();
  }

  buyExchange(model: Exchange, isValid: boolean) {
    if (!isValid) {
      return false;
    }

    this.placeOrder('buy', 'exchange', model);
  }

  sellExchange(model: Exchange, isValid: boolean) {
    if (!isValid) {
      return false;
    }

    this.placeOrder('sell', 'exchange', model);
  }

  buyMargin(model: Margin, isValid: boolean) {
    if (!isValid) {
      return false;
    }

    this.placeOrder('buy', 'margin', model);
  }

  sellMargin(model: Margin, isValid: boolean) {
    if (!isValid) {
      return false;
    }

    this.placeOrder('sell', 'margin', model);
  }

  get role() {
    return this.user.role;
  }
}
