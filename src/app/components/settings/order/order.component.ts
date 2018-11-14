import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { BsModalRef, BsModalService, TabsetComponent } from 'ngx-bootstrap';
import { Order } from '../../../models/order';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Margin } from '../../../models/margin';
import { Exchange } from '../../../models/exchange';
import { AccountService } from '../../../services/account.service';
import { MessageService } from '../../../services/message.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {

  modalRef: BsModalRef;
  @Input() order: any;
  @Input() type: any;
  @Input() accounts: any;

  exchangeForm: FormGroup;
  marginForm: FormGroup;

  modifyForm: FormGroup;

  @ViewChild('staticTabs') staticTabs: TabsetComponent;

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

  constructor(
    public orderService: OrderService,
    private modalService: BsModalService,
    public accountService: AccountService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
  ) {
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

  confirm(): void {

    if (this.currentlyDeletingType === 'position') {
      this.orderService.closePositon(this.currentlyDeleting)
        .subscribe(
          data => {
            this.fetchOrders();
          }
        );
    } else {
      this.orderService.cancelOrder(this.currentlyDeleting)
        .subscribe(
          data => {
            this.fetchOrders();

          }
        );
    }

    this.modalRef.hide();
  }

  decline(): void {
    console.log('Declined!');
    console.log(this.currentOrderTab);
    this.modalRef.hide();
  }

  public modify = false;

  openOrderModal(template, order, type, modify) {
    this.modify = modify;
    this.currentOrder = order;
    console.log(type);
    this.marginForm.patchValue({
      o_type: type,
      amount: this.currentOrder.amount,
    });
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    // this.staticTabs.tabs[1].active = true;

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
          this.orderService.placeGroupOrder(this.curr_mod_ord.group, { ...this.curr_mod_ord, ...model }).subscribe(() => {
            this.orderService.getGroupOrders(this.curr_mod_ord.group).subscribe(() => {
              this.messageService.sendMessage({
                type: 'success',
                msg: `Success modified!!!`,
              });
              this.spinner.hide();
            });
          });
        } else {
          this.orderService.placeAccountOrder(this.curr_mod_ord.account, { ...this.curr_mod_ord, ...model }).subscribe(() => {
            this.orderService.getAccountOrders(this.curr_mod_ord.account).subscribe(() => {
              this.messageService.sendMessage({
                type: 'success',
                msg: `Success modified!!!`,
              });
              this.spinner.hide();
            });
          });
        }
      });

      this.modalRef.hide();
    }
  }

  placeOrder(direction, type, model) {
    if (this.modify) {
      this.orderService.cancelOrder(this.currentOrder)
        .subscribe((data) => {
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
              .subscribe(
                gdata => {
                  this.fetchOrders();
                }
              );
          } else {
            this.orderService.placeAccountOrder(this.orderService.tradeTypeId, order)
              .subscribe(
                gdata => {
                  this.fetchOrders();
                }
              );
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
          .subscribe(
            data => {
              this.fetchOrders();
            }
          );
      } else {
        this.orderService.placeAccountOrder(this.orderService.tradeTypeId, order)
          .subscribe(
            data => {
              this.fetchOrders();
            }
          );
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

  tooltip(index) {
    if (!this.accounts) {
      return false;
    }

    return this.type === 'group' ? this.accounts[index].acc_name : '';
  }
}
