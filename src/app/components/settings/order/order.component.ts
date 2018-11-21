import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';

import {
  BsModalRef,
  BsModalService,
  TabsetComponent,
} from 'ngx-bootstrap';

import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import {
  Order,
  Margin,
  Exchange,
} from '../../../models';

import {
  OrderService,
  AccountService,
  MessageService,
} from '../../../services';

import {
  NgxSpinnerService,
} from 'ngx-spinner';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {

  @Input() type: any;
  @ViewChild('staticTabs') staticTabs: TabsetComponent;
  @Input() accounts: any;
  modalRef: BsModalRef;
  exchangeForm: FormGroup;
  marginForm: FormGroup;
  modifyForm: FormGroup;
  selectedOrder: number;
  selectedPosition: number;
  orderType = ['buy', 'sell'];
  orderTypeO = ['stop', 'market', 'limit'];
  orderContext = ['exchange', 'margin'];
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
  currentlyDeletingType: string;
  curr_mod_ord: any;
  modify = false;

  constructor(
    public orderService: OrderService,
    private modalService: BsModalService,
    private accountService: AccountService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.exchangeForm = new FormGroup({
      o_type: new FormControl('limit', [<any>Validators.required]),
      price: new FormControl(0),
      amount: new FormControl('', [<any>Validators.required]),
    });

    this.modifyForm = new FormGroup({
      open_price: new FormControl(0),
      amount: new FormControl('', [<any>Validators.required]),
    });

    this.marginForm = new FormGroup({
      o_type: new FormControl('limit', [<any>Validators.required]),
      price: new FormControl(0),
      amount: new FormControl('', [<any>Validators.required]),
    });
  }

  openModal(template: TemplateRef<any>, options = {}) {
    this.modalRef = this.modalService.show(template, options);
  }

  selectTab(tab_id: number) {
    this.currentOrderTab = tab_id;
  }

  confirm(): void {
    if (this.currentlyDeletingType === 'position') {
      this.orderService.closePosition(this.currentlyDeleting)
        .subscribe((d: any) => {
          const _msg = `Order cancelled, ${ d.type.type }, ${ d.type.direction } ${ d.amount } ${ d.pair } @ ${ d.open_price }.#112o`;
          this.messageService.sendMessage({
            type: 'success',
            msg: _msg,
          });
          this.orderService.fetchOrders();
        });
    } else if (this.currentlyDeletingType === 'order') {
      this.orderService.cancelOrder(this.currentlyDeleting)
        .subscribe((d: any) => {
          const _msg = `Order cancelled, ${ d.type.type }, ${ d.type.direction } ${ d.amount } ${ d.pair } @ ${ d.open_price }.#122o`;
          this.messageService.sendMessage({
            type: 'success',
            msg: _msg,
          });
          this.orderService.fetchOrders();
        });
    }

    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

  openOrderModal(template, order, type, modify) {
    this.modify = modify;
    this.currentOrder = order;
    this.marginForm.patchValue({
      o_type: type,
      amount: this.currentOrder.amount,
    });
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  openModifyModal(template: TemplateRef<any>, parent_index, child_index) {
    this.curr_mod_ord = child_index === undefined ? this.orders[parent_index] : this.orders[parent_index].suborders[child_index];
    this.modifyForm.patchValue(this.curr_mod_ord);
    this.openModal(template, { class: 'modal-sm' });
  }

  approveOrder(model: any, isValid: boolean) {
    this.spinner.show();
    if (isValid) {
      this.orderService.cancelOrder(this.curr_mod_ord).subscribe(() => {
        if (this.type === 'group') {
          this.orderService.placeGroupOrder(this.curr_mod_ord.group, { ...this.curr_mod_ord, ...model })
            .subscribe((d: any) => {
              const _msg = `Order modified, ${ d.type.type }, to ${ d.type.direction } ${ d.amount } ${ d.pair } @ ${ d.open_price }.#164o`;
              this.messageService.sendMessage({
                type: 'success',
                msg: _msg,
              });
              this.spinner.hide();
              this.orderService.getGroupOrders(this.curr_mod_ord.group).subscribe();
            });
        } else if (this.type === 'account') {
          this.orderService.placeAccountOrder(this.curr_mod_ord.account, { ...this.curr_mod_ord, ...model })
            .subscribe((d: any) => {
              const _msg = `Order modified, ${ d.type.type }, to ${ d.type.direction } ${ d.amount } ${ d.pair } @ ${ d.open_price }.#164o`;
              this.messageService.sendMessage({
                type: 'success',
                msg: _msg,
              });
              this.spinner.hide();
              this.orderService.getAccountOrders(this.curr_mod_ord.account).subscribe();
            });
        }
      });
      this.modalRef.hide();
    }
  }

  placeOrder(direction, type, model) {
    if (this.modify) {
      this.orderService.cancelOrder(this.currentOrder)
        .subscribe(() => {
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
          if (this.orderService.tradeType === 'group') {
            this.orderService.placeGroupOrder(this.orderService.tradeTypeId, order)
              .subscribe((d: any) => {
                const _msg = `Placed ${ d.type.type } order to ${ d.type.direction } ${ d.amount } ${ d.amount } @ ${ d.open_price }.#205o`;
                this.messageService.sendMessage({
                  type: 'success',
                  msg: _msg,
                });
                this.orderService.fetchOrders();
              });
          } else if (this.orderService.tradeType === 'account') {
            this.orderService.placeAccountOrder(this.orderService.tradeTypeId, order)
              .subscribe((d: any) => {
                const _msg = `Placed ${ d.type.type } order to ${ d.type.direction } ${ d.amount } ${ d.amount } @ ${ d.open_price }.#214o`;
                this.messageService.sendMessage({
                  type: 'success',
                  msg: _msg,
                });
                this.orderService.fetchOrders();
              });
          }
        });
    } else {
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
      if (this.orderService.tradeType === 'group') {
        this.orderService.placeGroupOrder(this.orderService.tradeTypeId, order)
          .subscribe((d: any) => {
            const _msg = `Placed ${ d.type.type } order to ${ d.type.direction } ${ d.amount } ${ d.amount } @ ${ d.open_price }.#236o`;
            this.messageService.sendMessage({
              type: 'success',
              msg: _msg,
            });
            this.orderService.fetchOrders();
          });
      } else if (this.orderService.tradeType === 'account') {
        this.orderService.placeAccountOrder(this.orderService.tradeTypeId, order)
          .subscribe((d: any) => {
            const _msg = `Placed ${ d.type.type } order to ${ d.type.direction } ${ d.amount } ${ d.amount } @ ${ d.open_price }.#245o`;
            this.messageService.sendMessage({
              type: 'success',
              msg: _msg,
            });
            this.orderService.fetchOrders();
          });
      }
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

  get positions() {
    return this.orderService.positions;
  }

  get orders() {
    return this.orderService.orders;
  }

  selectOrder(i) {
    if (this.selectedOrder === i) {
      this.selectedOrder = undefined;
    } else {
      this.selectedOrder = i;
    }
  }

  selectPosition(i) {
    if (this.selectedPosition === i) {
      this.selectedPosition = undefined;
    } else {
      this.selectedPosition = i;
    }
  }

  get role() {
    return this.accountService.role;
  }

  get tradeType() {
    return this.orderService.tradeType;
  }

  tooltip(index) {
    if (!this.accounts) {
      return false;
    }

    if (this.type === 'group') {
      let i = 0;
      for (const a of this.accounts) {
        if (a.id === index) {
          return this.accounts[i].acc_name;
        }
        i++;
      }
    }

    return '';
  }
}
