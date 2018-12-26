import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderContext, OrderDirection, OrderType } from '@app/shared/enums';
import { NotifierService } from 'angular-notifier';
import { ModalService, OrdersService } from '@app/shared/services';

@Component({
  selector: 'app-margin',
  templateUrl: './margin.component.html',
  styleUrls: ['./margin.component.scss']
})
export class MarginComponent implements OnInit {

  @Input()
  pair: string;

  marginForm: FormGroup;
  private readonly notifier: NotifierService;

  constructor(
    private ordersService: OrdersService,
    private notifierService: NotifierService,
    private modalService: ModalService,
  ) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.marginForm = new FormGroup({
      o_type: new FormControl('0', [<any>Validators.required]),
      price: new FormControl(0),
      amount: new FormControl('', [<any>Validators.required]),
    });
  }

  buy(model: any, isValid: boolean) {
    if (!isValid) {
      return false;
    }

    this.placeOrder(OrderDirection.buy, OrderContext.margin, model);
  }

  sell(model: any, isValid: boolean) {
    if (!isValid) {
      return false;
    }

    this.placeOrder(OrderDirection.sell, OrderContext.margin, model);
  }

  get tradeType() {
    return 'group';
  }

  get tradeTypeId() { // 6a86df61-c190-4347-9b61-34cbd88d38a4
    return '';
  }

  placeOrder(direction, context, model) {
    const order = {
      amount: model.amount,
      open_price: model.price,
      pair: this.pair,
      type: {
        context: context,
        direction: direction,
        type: +model.o_type,
      }
    };

    if (this.tradeType === 'group') {
      this.ordersService.placeGroupOrder(this.tradeTypeId, order)
        .subscribe((d: any) => {

          this.notifier.notify('success',
            `Placed ${OrderType[d.type.type]} order to ${OrderDirection[d.type.direction]} ${d.amount} ${d.pair} @ ${d.open_price}.`);
        }, error1 => {

          this.notifier.notify('error', `Error msg: ${error1.message}`);
        });
    } else if (this.tradeType === 'account') {
      this.ordersService.placeAccountOrder(this.tradeTypeId, order)
        .subscribe((d: any) => {

          this.notifier.notify('success',
            `Placed ${OrderType[d.type.type]} order to ${OrderDirection[d.type.direction]} ${d.amount} ${d.pair} @ ${d.open_price}.`);
        }, error1 => {

          this.notifier.notify('error', `Error msg: ${error1.message}`);
        });
    }
    this.modalService.closeAllModals();
  }
}
