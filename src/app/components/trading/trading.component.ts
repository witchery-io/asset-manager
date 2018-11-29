import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonViewComponent } from './button-view/button-view.component';
import {
  GroupsService,
  AccountService,
  OrderService,
  TickService,
  SharedService,
} from '../../services';

@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.scss'],
})
export class TradingComponent implements OnInit, OnDestroy {
  _symbol: any;
  groups = [];
  accounts = [];
  settings = {
    columns: {
      pair: {
        title: 'INS.', // INSTRUMENT
        sortDirection: 'ASC',
      },
      last: {
        title: 'LAST',
      },
      daily_change: {
        title: '24HR',
        type: 'html',
      },
      volume: {
        title: 'VOL USD',
      },
      add: {
        type: 'custom',
        renderComponent: ButtonViewComponent,
      },
    },
    hideSubHeader: true,
    pager: {
      perPage: 100
    },
    actions: false,
    attr: {
      class: 'table table-xs table-hover'
    }
  };

  constructor(
    private groupsService: GroupsService,
    private accountService: AccountService,
    private orderService: OrderService,
    private tickService: TickService,
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.orderService.groupByPair = true;

    this.route.params.subscribe(params => {
      this.orderService.tradeType = params['type'];
      this.orderService.tradeTypeId = params['id'];

      this.orderService.fetchBalance();
      this.orderService.fetchOrders();
    });

    this.groupsService.getGroups().subscribe(groups => this.groups = groups);
    this.accountService.getAccounts().subscribe(accounts => this.accounts = accounts);
  }

  ngOnDestroy() {
    this.source.setFilter([]);
  }

  get selectedGroup() {
    return this.tradeType === 'group' ? this.tradeTypeId : '';
  }

  get selectedAccount() {
    return this.tradeType === 'account' ? this.tradeTypeId : '';
  }

  get source() {
    return this.tickService.source;
  }

  get tradeType() {
    return this.orderService.tradeType;
  }

  get tradeTypeId() {
    return this.orderService.tradeTypeId;
  }

  changeType(type, current_type_id) {
    this.router.navigate([`/dashboard/trading/${ type }/${ current_type_id }`]);
  }

  onSearch(query: string = '') {
    if (query === '') {
      this.source.setFilter([]);
    } else {
      this.source.setFilter([
        {
          field: 'pair',
          search: query
        },
      ], false);
    }
  }

  onUserRowSelect($event) {
    this._symbol = `${ $event.data.exchangename }:${ $event.data.pair }`;
    this.sharedService.subject.next();
  }
}
