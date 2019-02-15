import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Role } from '@app/shared/enums';

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
      type: new FormControl('stop', [<any>Validators.required]),
      price: new FormControl(0),
      amount: new FormControl('', [<any>Validators.required]),
      isOCO: new FormControl(false),
      priceOCOStop: new FormControl(0),
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
        price: model.price,
        context: this.marketType,
        direction: direction,
        type: model.type,
        isOCO: model.isOCO,
        priceOCOStop: model.priceOCOStop,
      });
    }
  }
}
