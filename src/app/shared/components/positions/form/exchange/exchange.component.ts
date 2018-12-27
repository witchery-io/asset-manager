import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderContext, OrderDirection, OrderType, Role } from '@app/shared/enums';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent implements OnInit {

  @Input()
  pair: string;

  @Input()
  role: string;

  exchangeForm: FormGroup;

  ROLE = Role;

  constructor() { }

  ngOnInit() {
    this.exchangeForm = new FormGroup({
      o_type: new FormControl('0', [<any>Validators.required]),
      price: new FormControl(0),
      amount: new FormControl('', [<any>Validators.required]),
    });
  }

  buy(model: any, isValid: boolean) {
    if (!isValid) {
      return false;
    }

    // this.placeOrder('buy', 'exchange', model);
  }

  sell(model: any, isValid: boolean) {
    if (!isValid) {
      return false;
    }

    // this.placeOrder('sell', 'exchange', model);
  }
/*
  placeOrder(direction, context, model) {
    this.spinner.show();

    const order = { // todo Order is removed
      amount: model.amount,
      open_price: model.price,
      pair: this.position.pair,
      type: {
        context: +OrderContext[context],
        direction: +OrderDirection[direction],
        type: +OrderType[model.o_type],
      }
    };

    if (this.tradeType === 'group') {
      this.positionsService.placeGroupOrder(this.tradeTypeId, order)
        .subscribe((d: any) => {

          this.notifier.notify('success',
            `Placed ${OrderType[d.type.type]} order to ${OrderDirection[d.type.direction]}
             ${d.amount} ${d.amount} @ ${d.open_price}.#236o`);
        }, error1 => {

          this.notifier.notify('error', `Error msg: ${error1.message}`);
        }, () => {
          this.spinner.hide();
        });
    } else if (this.tradeType === 'account') {

      this.positionsService.placeAccountOrder(this.tradeTypeId, order)
        .subscribe((d: any) => {

          this.notifier.notify('success',
            `Placed ${OrderType[d.type.type]} order to ${OrderDirection[d.type.direction]}
             ${d.amount} ${d.amount} @ ${d.open_price}.#245o`);
        }, error1 => {

          this.notifier.notify('error', `Error msg: ${error1.message}`);
        }, () => {
          this.spinner.hide();
        });
    }

    this.modalRef.hide();
  }*/
}
