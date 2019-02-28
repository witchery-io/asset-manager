import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Role } from '@app/shared/enums';
import { GroupService } from '@app/core/services';
import { GROUPS } from '@app/shared/enums/trading.enum';
import { Group } from '@app/core/intefaces';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {
  @Input()
  id: string;
  @Input()
  type: string;
  @Input()
  role = 'admin';
  @Input()
  values = {};
  @Input()
  marketType: string;
  @Input()
  balance: any;
  @Output()
  order: EventEmitter<any> = new EventEmitter();
  marketForm: FormGroup;
  ROLE = Role;
  orderType = ['stop', 'market', 'limit'];
  group: Group;
  total = 0;

  constructor(
    private groupService: GroupService,
  ) {
  }

  ngOnInit() {
    if (this.type === GROUPS) {
      this.groupService.getGroup(this.id)
        .subscribe(val => {
          this.group = val;
          this.calcTotal();
        });
    }

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

  calcTotal() {
    if (this.type !== GROUPS || !this.group.accounts) {
      return;
    }

    let total = 0;
    if (this.group.allocationMethod === 'multiplier') {
      for (const a of this.group.accounts) {
        total += (a.multiplier || 0) * this.marketForm.value.amount;
      }
    } else if (this.group.allocationMethod === 'equity') {
      for (const a of this.group.accounts) {
        total += (this.balance.balances[a.id].equity / this.balance.equity) * this.marketForm.value.amount;
      }
    }
    this.total = total;
  }
}
