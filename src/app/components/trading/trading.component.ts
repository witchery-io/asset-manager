import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {GroupsService} from '../../services/groups.service';
import {AccountService} from '../../services/account.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TickService} from '../../services/tick.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Margin} from '../../models/margin';
import {Exchange} from '../../models/exchange';
import {Order} from '../../models/order';
import {OrderService} from '../../services/order.service';

@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.scss']
})
export class TradingComponent implements OnInit {

  modalRef: BsModalRef;
  currentType: string;
  currentTypeId: string;
  currentTickId: number;
  exchangeForm: FormGroup;
  marginForm: FormGroup;
  groups: any[] = [];
  accounts: any[] = [];

  enums = {
    'buy': 0,
    'sell': 1,
    'stop': 0,
    'market': 1,
    'limit': 2,
    'exchnage': 0,
    'margin': 1,
  };

  constructor(private modalService: BsModalService,
              private groupsService: GroupsService,
              private accountService: AccountService,
              private orderService: OrderService,
              private tickService: TickService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.currentType = params['type'];
      this.currentTypeId = params['id'];
    });

    this.groupsService.getGroups().subscribe(
      groups => {
        this.groups = groups;
      }
    );

    this.exchangeForm = new FormGroup({
      o_type: new FormControl('limit', [<any>Validators.required]),
      price: new FormControl(0),
      amount: new FormControl('', [<any>Validators.required]),
    });

    this.marginForm = new FormGroup({
      o_type: new FormControl('limit', [<any>Validators.required]),
      price: new FormControl(0),
      amount: new FormControl('', [<any>Validators.required]),
    });
  }

  tickSettings(template: TemplateRef<any>, tickId) {
    this.currentTickId = tickId;
    this.openModal(template);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  // get groups() {
  //   return this.accountService.getAccounts();
  // }

  // get accounts() {
  //   return this.accountService.getAccounts();
  // }

  get ticks() {
    return this.tickService.getTicks();
  }

  get tick() {
    return this.tickService.getTick(this.currentTickId);
  }

  changeType(type, current_type_id) {
    this.currentTypeId = current_type_id;
    this.router.navigate([`/trading/${ type }/${ current_type_id }`]);
  }

  placeOrder(direction, type, model) {
    const order: Order = {
      amount: model.amount,
      open_price: model.price,
      pair: this.tick.instrument,
      type: {
        context: this.enums[type],
        direction: this.enums[direction],
        type: this.enums[model.o_type],
      }
    };

    if (this.currentType === 'group') {
      this.orderService.placeGroupOrder(this.currentTypeId, order)
        .subscribe(
          data => {

          }
        );
    } else {
      this.orderService.placeAccountOrder(this.currentTypeId, order)
        .subscribe(
          data => {

          }
        );
    }

  }

  buyExchange(model: Exchange, isValid: boolean) {
    if (isValid) {
      this.placeOrder('buy', 'exchnage', model);
    }

  }

  sellExchange(model: Exchange, isValid: boolean) {
    if (isValid) {
      this.placeOrder('sell', 'exchnage', model);
    }

  }

  buyMargin(model: Margin, isValid: boolean) {
    if (isValid) {
      this.placeOrder('buy', 'margin', model);
    }

  }

  sellMargin(model: Margin, isValid: boolean) {
    if (isValid) {
      this.placeOrder('sell', 'margin', model);
    }

  }
}
