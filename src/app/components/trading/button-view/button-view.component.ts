import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { OrderService } from '../../../services/order.service';
import { MessageService } from '../../../services/message.service';
import { TickService } from '../../../services/tick.service';
import { Order } from '../../../models/order';
import { Exchange } from '../../../models/exchange';
import { Margin } from '../../../models/margin';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'button-view',
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

  constructor(
    private modalService: BsModalService,
    private orderService: OrderService,
    private messageService: MessageService,
    private tickService: TickService,
  ) {
  }

  ngOnInit() {

    // console.log('ButtonViewComponent - ngOnInit', this);

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

  get order() {
    return {
      id: this.orderService.tradeTypeId,
      type: this.orderService.tradeType,
      groupByPair: true,
    };
  }

  get tick() {
    return this.tickService.ticks[this.currentTickId];
  }

  openModal(template: TemplateRef<any>, params = {}) {
    this.modalRef = this.modalService.show(template, params);
  }

  tickSettings(template: TemplateRef<any>) {
    this.currentTickId = +this.value;
    this.openModal(template);
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
        .subscribe(
          () => {
            this.messageService.sendMessage({
              type: 'success',
              msg: `You successfully read this important alert message 1 .`,
            });
            this.fetchOrders();
          }
        );
    } else {
      this.orderService.placeAccountOrder(this.orderService.tradeTypeId, order)
        .subscribe(
          () => {
            this.messageService.sendMessage({
              type: 'success',
              msg: `You successfully read this important alert message 2.`,
            });
            this.fetchOrders();
          }
        );
    }
  }

  fetchOrders() {

    this.orderService.orders = [];
    this.orderService.positions = [];

    if (this.orderService.tradeType === 'group') {
      this.orderService.getGroupOrders(this.orderService.tradeTypeId, this.order.groupByPair)
        .subscribe(
          orders => {
            if (orders !== null && orders.length > 0) {
              this.orderService.orders = orders;
            }
          }
        );


      this.orderService.getGroupPositions(this.orderService.tradeTypeId, this.order.groupByPair)
        .subscribe(
          positions => {
            if (positions !== null && positions.length > 0) {
              this.orderService.positions = positions;
            }
          }
        );

    } else {
      this.orderService.getAccountOrders(this.orderService.tradeTypeId, this.order.groupByPair)
        .subscribe(
          orders => {
            if (orders !== null && orders.length > 0) {
              this.orderService.orders = orders;
            }
          }
        );

      this.orderService.getAccountPositions(this.orderService.tradeTypeId, this.order.groupByPair)
        .subscribe(
          positions => {
            if (positions !== null && positions.length > 0) {
              this.orderService.positions = positions;
            }
          }
        );
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
}
