import {
  Component,
  OnInit,
} from '@angular/core';

import {
  AccountService,
  GroupsService,
  OrderService,
} from '../../services';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  accounts: any;
  groups: any;

  constructor(
    private accountService: AccountService,
    private groupsService: GroupsService,
    private orderService: OrderService,
  ) { }

  ngOnInit() {
    this.orderService.groupByPair = false;
    this.resetOrders();
    this.fetchGroup();
    this.fetchAccount();
  }

  update() {
    this.fetchGroup();
    this.fetchAccount();
  }

  fetchGroup() {
    this.groupsService.getGroups().subscribe(groups => this.groups = groups);
  }

  fetchAccount() {
    this.accountService.getAccounts().subscribe(accounts => this.accounts = accounts);
  }

  changeTab() {
    this.resetOrders();
  }

  resetOrders() {
    this.orderService.setOrders();
    this.orderService.setPositions();
  }
}
