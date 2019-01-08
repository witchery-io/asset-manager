import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderContext, OrderDirection, Role } from '@app/shared/enums';
import { ACCOUNT, GROUP } from '@app/shared/enums/trading.enum';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {

  ROLE = Role;

  @Input()
  pair: string; // BTCUSD

  @Input()
  type: string; // group, account

  @Input()
  role: string; // admin, guest

  @Input()
  values: any; // there are form values

  @Input()
  marketType: string; // margin and exchange

  marketForm: FormGroup;
  @Output() groupOrder: EventEmitter<any> = new EventEmitter();
  @Output() accountOrder: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    this.marketForm = new FormGroup({
      o_type: new FormControl('0', [<any>Validators.required]),
      price: new FormControl(0),
      amount: new FormControl('', [<any>Validators.required]),
    });

    this.marketForm.patchValue(this.values || []);
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
    console.log('Market', order);

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
