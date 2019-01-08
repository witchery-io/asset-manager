import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderContext, OrderDirection, Role } from '@app/shared/enums';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {

  ROLE = Role;
  OrderDirection = OrderDirection;

  @Input()
  role = 'admin'; // admin, guest

  @Input()
  values = {}; // there are form values

  @Input()
  marketType: string; // margin or exchange

  marketForm: FormGroup;

  @Output()
  order: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    this.marketForm = new FormGroup({
      o_type: new FormControl('0', [<any>Validators.required]),
      price: new FormControl(0),
      amount: new FormControl('', [<any>Validators.required]),
    });

    /*
    * set Form value
    * */
    this.marketForm.patchValue(this.values);
  }

  market(model: any, isValid: boolean, direction) {
    if (isValid) {
      this.order.emit({
        amount: model.amount,
        open_price: model.price,
        type: {
          context: OrderContext[this.marketType],
          direction: OrderDirection[direction],
          type: +model.o_type,
        }
      });
    }
  }
}
