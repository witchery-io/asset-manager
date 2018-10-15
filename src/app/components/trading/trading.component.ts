import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { GroupsService } from '../../services/groups.service';
import { AccountService } from '../../services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TickService } from '../../services/tick.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Margin } from '../../models/margin';
import { Exchange } from '../../models/exchange';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.scss'],
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
  ticks: any[] = [];
  orders: any[] = [];

  slelectedOrder: number;
  selectedPosition: number;

  public columns: Array<any> = [
    {
      title: 'Instrument',
      className: ['office-header', 'text-success'],
      name: 'pair',
      filtering: { sort: 'asc', placeholder: 'Filter by pair' }
    },
    { title: 'Last', name: 'last', filtering: { filterString: '', placeholder: 'Filter by pair' } },
    { title: '24h%', name: 'daily_change', filtering: { filterString: '', placeholder: 'Filter by pair' } },
    { title: 'Vol USD', name: 'volume', filtering: { filterString: '', placeholder: 'Filter by pair' } },
  ];

  public config: any = {
    sorting: { columns: this.columns },
    className: ['table-striped', 'table-bordered', 'table-sm']
  };

  enums = {
    'buy': 0,
    'sell': 1,
    'stop': 0,
    'market': 1,
    'limit': 2,
    'exchange': 0,
    'margin': 1,
  };

  orderType = ['buy', 'sell'];
  orderOType = ['stop', 'market', 'limit'];
  orderMType = ['exchange', 'margin'];

  constructor(
    private modalService: BsModalService,
    private groupsService: GroupsService,
    private accountService: AccountService,
    private orderService: OrderService,
    private tickService: TickService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.currentType = params['type'];
      this.currentTypeId = params['id'];

      this.fetchOrders();
    });

    this.fetchTicks();

    // @todo POXEL!
    // setInterval(() => {
    //   this.fetchTicks();
    // }, 5000);
    // setInterval(() => {
    //   this.fetchOrders();
    // }, 5000);

    this.groupsService.getGroups().subscribe(
      groups => {
        this.groups = groups;
      }
    );

    this.accountService.getAccounts().subscribe(
      accounts => {
        this.accounts = accounts;
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
    console.log(tickId);
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

  get tick() {
    return this.ticks[this.currentTickId];
  }

  fetchTicks() {
    this.tickService.getTicks().subscribe(
      ticks => {
        ticks.sort((a: any, b: any) => {
          if (a.pair < b.pair) {
            return -1;
          } else if (a.pair > b.pair) {
            return 1;
          } else {
            return 0;
          }
        });

        this.ticks = ticks;
      }
    );
  }

  fetchOrders() {
    this.orderService.getGroupOrders(this.currentTypeId)
      .subscribe(
        orders => {
          this.orders = orders;
        }
      );
  }

  changeType(type, current_type_id) {
    this.currentTypeId = current_type_id;
    this.fetchOrders();
    this.router.navigate([`/trading/${ type }/${ current_type_id }`]);
  }

  get selectedGroup() {
    return this.currentType === 'group' ? this.currentTypeId : '';
  }

  get selectedAccount() {
    return this.currentType === 'account' ? this.currentTypeId : '';
  }

  placeOrder(direction, type, model) {
    const order: Order = {
      amount: model.amount,
      open_price: model.price,
      pair: this.tick.pair,
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
            this.fetchOrders();
          }
        );
    } else {
      this.orderService.placeAccountOrder(this.currentTypeId, order)
        .subscribe(
          data => {
            this.fetchOrders();
          }
        );
    }

  }

  buyExchange(model: Exchange, isValid: boolean) {
    if (isValid) {
      this.placeOrder('buy', 'exchange', model);
    }

  }

  sellExchange(model: Exchange, isValid: boolean) {
    if (isValid) {
      this.placeOrder('sell', 'exchange', model);
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
