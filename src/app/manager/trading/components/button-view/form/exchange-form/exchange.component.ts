import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderContext, OrderDirection, OrderType } from '@app/shared/enums';
import { NotifierService } from 'angular-notifier';
import { ModalService, OrdersService } from '@app/shared/services';
import { ACCOUNT, GROUP } from '@app/shared/enums/trading.enum';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss'],
})
export class ExchangeComponent implements OnInit {

  @Input()
  pair: string;

  @Input()
  id: string; // 6a86df61-c190-4347-9b61-34cbd88d38a4

  @Input()
  type: string; // group, account

  exchangeForm: FormGroup;
  private readonly notifier: NotifierService;

  constructor(
    private ordersService: OrdersService,
    private notifierService: NotifierService,
    private modalService: ModalService,
  ) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.exchangeForm = new FormGroup({
      o_type: new FormControl('0', [<any>Validators.required]),
      price: new FormControl(0),
      amount: new FormControl('', [<any>Validators.required]),
    });
  }

  buy(model: any, isValid: boolean) {
    if (isValid) {
      const order = {
        amount: model.amount,
        open_price: model.price,
        pair: this.pair,
        type: {
          context: OrderContext.exchange,
          direction: OrderDirection.buy,
          type: +model.o_type,
        }
      };

      this.order(order);
    }
  }

  sell(model: any, isValid: boolean) {
    if (!isValid) {
      const order = {
        amount: model.amount,
        open_price: model.price,
        pair: this.pair,
        type: {
          context: OrderContext.exchange,
          direction: OrderDirection.sell,
          type: +model.o_type,
        }
      };

      this.order(order);
    }
  }

  private order(order) {
    switch (this.type) {
      case GROUP:
        this.groupOrder(order);
        break;
      case ACCOUNT:
        this.accountOrder(order);
        break;
    }
  }

  groupOrder(order = {}) {
    this.ordersService.placeGroupOrder(this.id, order)
      .subscribe((d: any) => {
        const msg = `Placed ${OrderType[d.type.type]} order to ${OrderDirection[d.type.direction]}
           ${d.amount} ${d.pair} @ ${d.open_price}.`;
        this.notifier.notify('success', msg);
      }, error1 => {
        this.notifier.notify('error', `Error msg: ${error1.message}`);
      }, () => {
        this.modalService.closeAllModals();
      });
  }

  accountOrder(order: any) {
    this.ordersService.placeAccountOrder(this.id, order)
      .subscribe((d: any) => {
        const msg = `Placed ${OrderType[d.type.type]} order to ${OrderDirection[d.type.direction]}
           ${d.amount} ${d.pair} @ ${d.open_price}.`;
        this.notifier.notify('success', msg);
      }, error1 => {
        this.notifier.notify('error', `Error msg: ${error1.message}`);
      }, () => {
        this.modalService.closeAllModals();
      });
  }
}
