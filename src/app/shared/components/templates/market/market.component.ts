import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderContext, OrderDirection, Role } from '@app/shared/enums';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {

  @Input()
  role = 'admin';

  @Input()
  values = {};

  @Input()
  marketType: string;

  @Output()
  order: EventEmitter<any> = new EventEmitter();

  marketForm: FormGroup;

  ROLE = Role;

  orderType = ['stop', 'market', 'limit'];

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
