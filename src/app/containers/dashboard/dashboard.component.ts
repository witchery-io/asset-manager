import { Component, OnInit } from '@angular/core';
import {
  AccountService,
  GroupsService,
  OrderService,
} from '../../services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  groups: any;
  accounts: any;
  isCollapsed = true;
  constructor(
    private groupsService: GroupsService,
    private accountService: AccountService,
    private orderService: OrderService,
  ) {
  }

  ngOnInit() {
    this.groupsService.getGroups().subscribe(groups => {
      this.groups = groups;
    });

    this.accountService.getAccounts().subscribe(accounts => {
      this.accounts = accounts;
    });
  }

  get n() {
    if (!this.tradeType || !this.groups || !this.accounts) {
      return '';
    } else if (this.tradeType === 'group') {
      const curr_group = this.groups.filter(group => {
        return group.id === this.tradeTypeId;
      });
      return curr_group[0].name;
    } else if (this.tradeType === 'account') {
      const curr_account = this.accounts.filter(account => {
        return account.id === this.tradeTypeId;
      });
      return curr_account[0].acc_name;
    }
    return '';
  }

  get tradeType() {
    return this.orderService.tradeType;
  }

  get tradeTypeId() {
    return this.orderService.tradeTypeId;
  }
}
