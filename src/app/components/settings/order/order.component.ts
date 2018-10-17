import {Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild} from '@angular/core';
import {OrderService} from '../../../services/order.service';
import {BsModalRef, BsModalService, TabsetComponent} from 'ngx-bootstrap';
import {Order} from '../../../models/order';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Margin} from '../../../models/margin';
import {Exchange} from '../../../models/exchange';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {

  modalRef: BsModalRef;
  @Input() order: any;

  exchangeForm: FormGroup;
  marginForm: FormGroup;

  @ViewChild('staticTabs') staticTabs: TabsetComponent;

  selectedOrder: number;
  selectedPosition: number;
  orderType = ['buy', 'sell'];
  orderTypeO = ['stop', 'market', 'limit'];
  orderContext = ['exchange', 'margin'];
  orders = [];

  currentOrder: any;

  enums = {
    'buy': 0,
    'sell': 1,
    'stop': 0,
    'market': 1,
    'limit': 2,
    'exchange': 0,
    'margin': 1,
  };

  currentOrderTab: number;

  currentlyDeleting: string;

  constructor(public orderService: OrderService,
              private modalService: BsModalService) {
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   // console.log(changes);
  //   // this.fetchOrders();
  // }

  ngOnInit() {
    // this.selectTab(0);
    this.fetchOrders();

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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  selectTab(tab_id: number) {
    this.currentOrderTab = tab_id;
  }

  fetchOrders() {

    // this.orders = [];
    //
    // if (this.order.type === 'group') {
    //   this.orderService.getGroupOrders(this.order.id, this.order.groupByPair)
    //     .subscribe(
    //       orders => {
    //         this.orders = orders;
    //       }
    //     );
    // } else {
    //   this.orderService.getAccountOrders(this.order.id, this.order.groupByPair)
    //     .subscribe(
    //       orders => {
    //         this.orders = orders;
    //       }
    //     );
    // }

  }

  modify() {
    // code ...
  }

  confirm(): void {
    console.log('Confirmed!');
    console.log(this.currentOrderTab);
    this.modalRef.hide();
  }

  decline(): void {
    console.log('Declined!');
    console.log(this.currentOrderTab);
    this.modalRef.hide();
  }

  openOrderModal(template, order, type) {
    this.currentOrder = order;
    console.log(type);
    this.marginForm.patchValue({
      o_type: type,
      amount: this.currentOrder.amount,
    });
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    // this.staticTabs.tabs[1].active = true;

  }

  placeOrder(direction, type, model) {
    const order: Order = {
      amount: model.amount,
      open_price: model.price,
      pair: this.currentOrder.pair,
      type: {
        context: this.enums[type],
        direction: this.enums[direction],
        type: this.enums[model.o_type],
      }
    };

    // if (this.currentType === 'group') {
    //   this.orderService.placeGroupOrder(this.currentTypeId, order)
    //     .subscribe(
    //       data => {
    //         this.fetchOrders();
    //       }
    //     );
    // } else {
    //   this.orderService.placeAccountOrder(this.currentTypeId, order)
    //     .subscribe(
    //       data => {
    //         this.fetchOrders();
    //       }
    //     );
    // }

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
