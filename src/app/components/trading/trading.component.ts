import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../../services/groups.service';
import { AccountService } from '../../services/account.service';
import { OrderService } from '../../services/order.service';
import { TickService } from '../../services/tick.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonViewComponent } from './button-view/button-view.component';

@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.scss'],
})
export class TradingComponent implements OnInit {
  groups = [];
  accounts = [];

  settings = {
    columns: {
      pair: {
        title: 'Instrument',
        filter: true,
        sortDirection: 'asc',
      },
      last: {
        title: 'Last',
        filter: false,
      },
      daily_change: {
        title: '24h%',
        filter: false,
        type: 'html',
      },
      volume: {
        title: 'Vol USD',
        filter: false,
      },
      add: {
        filter: false,
        type: 'custom',
        renderComponent: ButtonViewComponent,
      },
    },
    pager: {
      perPage: 100
    },
    actions: false,
    attr: {
      class: 'table table-bordered'
    }
  };

  constructor(
    private groupsService: GroupsService,
    private accountService: AccountService,
    private orderService: OrderService,
    private tickService: TickService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.orderService.groupByPair = true;

    this.route.params.subscribe(params => {
      this.orderService.tradeType = params['type'];
      this.orderService.tradeTypeId = params['id'];
    });

    this.groupsService.getGroups().subscribe(groups => {
      this.groups = groups;
    });

    this.accountService.getAccounts().subscribe(accounts => {
      this.accounts = accounts;
    });
  }

  get selectedGroup() {
    return this.orderService.tradeType === 'group' ? this.orderService.tradeTypeId : '';
  }

  get selectedAccount() {
    return this.orderService.tradeType === 'account' ? this.orderService.tradeTypeId : '';
  }

  get source() {
    return this.tickService.source;
  }

  changeType(type, current_type_id) {
    this.orderService.tradeTypeId = current_type_id;
    this.orderService.tradeType = type;
    this.orderService.fetchBalance();
    this.router.navigate([`/dashboard/trading/${ type }/${ current_type_id }`]);
  }

  get order() {
    return {
      id: this.orderService.tradeTypeId,
      type: this.orderService.tradeType,
      groupByPair: true,
    };
  }

  get tradeType() {
    return this.orderService.tradeType;
  }
}
