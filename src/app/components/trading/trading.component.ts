import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { GroupsService } from '../../services/groups.service';
import { AccountService } from '../../services/account.service';
import { MessageService } from '../../services/message.service';
import { OrderService } from '../../services/order.service';
import { TickService } from '../../services/tick.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Margin } from '../../models/margin';
import { Exchange } from '../../models/exchange';
import { Order } from '../../models/order';

@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.scss'],
})
export class TradingComponent implements OnInit {
  modalRef: BsModalRef;
  currentTickId: number;
  exchangeForm: FormGroup;
  marginForm: FormGroup;
  groups = [];
  accounts = [];
  orders = [];
  currentOrderTab: number;
  enums = {
    'buy': 0,
    'sell': 1,
    'stop': 0,
    'market': 1,
    'limit': 2,
    'exchange': 0,
    'margin': 1,
  };

  settings = {
    columns: {
      pair: {
        title: 'Instrument',
        filter: true,
      },
      last: {
        title: 'Last',
        filter: false,
      },
      daily_change: {
        title: '24h%',
        filter: false,
      },
      volume: {
        title: 'Vol USD',
        filter: false,
      },
    }
  };

  constructor(
    private modalService: BsModalService,
    private groupsService: GroupsService,
    private accountService: AccountService,
    private orderService: OrderService,
    private messageService: MessageService,
    public tickService: TickService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.orderService.groupByPair = true;

    this.route.params.subscribe(params => {
      this.orderService.tradeType = params['type'];
      this.orderService.tradeTypeId = params['id'];
      this.selectTab(0);

      this.fetchOrders();
    });

    this.groupsService.getGroups().subscribe(groups => {
        this.groups = groups;
      });

    this.accountService.getAccounts().subscribe(accounts => {
        this.accounts = accounts;
      });

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
    let array;
    if (this.orderService.tradeType === 'group') {
      array = this.groups;
    } else {
      array = this.accounts;
    }

    return {
      id: this.orderService.tradeTypeId,
      type: this.orderService.tradeType,
      groupByPair: true,
    };
  }

  tickSettings(template: TemplateRef<any>, tickId) {
    this.currentTickId = tickId;
    this.openModal(template);
  }

  openModal(template: TemplateRef<any>, params = {}) {
    this.modalRef = this.modalService.show(template, params);
  }

  openConfirmModal(template: TemplateRef<any>) {
    this.openModal(template, { class: 'modal-sm' });
  }

  selectTab(tab_id: number) {
    this.currentOrderTab = tab_id;
  }

  get ticks() {
    return this.tickService.ticks;
  }

  get tick() {
    return this.tickService.ticks[this.currentTickId];
  }

  get tradeType() {
    return this.orderService.tradeType;
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

  changeType(type, current_type_id) {
    this.orderService.tradeTypeId = current_type_id;
    this.orderService.tradeType = type;
    this.fetchOrders();
    this.orderService.fetchBalance();
    this.router.navigate([`/dashboard/trading/${ type }/${ current_type_id }`]);
  }

  get selectedGroup() {
    return this.orderService.tradeType === 'group' ? this.orderService.tradeTypeId : '';
  }

  get selectedAccount() {
    return this.orderService.tradeType === 'account' ? this.orderService.tradeTypeId : '';
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
}
