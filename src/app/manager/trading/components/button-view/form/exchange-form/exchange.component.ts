import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderContext, OrderDirection } from '@app/shared/enums';
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
  type: string; // group, account

  exchangeForm: FormGroup;
  @Output() groupOrder: EventEmitter<any> = new EventEmitter();
  @Output() accountOrder: EventEmitter<any> = new EventEmitter();

  constructor() {
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
    if (isValid) {
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
    console.log('EXCHANGE', order);
    switch (this.type) {
      case GROUP:
        this.groupOrder.emit(order);
        break;
      case ACCOUNT:
        this.accountOrder.emit(order);
        break;
    }
  }
}
