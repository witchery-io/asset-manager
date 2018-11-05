import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { GroupsService } from '../../services/groups.service';
import {OrderService} from '../../services/order.service';

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
    private ordersService: OrderService,
  ) { }

  ngOnInit() {
    this.fetchGroup();
    this.fetchAccount();
    this.ordersService.groupByPair = false;
  }

  update() {
    this.fetchGroup();
    this.fetchAccount();
  }

  fetchGroup() {
    this.groupsService.getGroups().subscribe(groups => {
        this.groups = groups;
      }
    );
  }

  fetchAccount() {
    this.accountService.getAccounts().subscribe(accounts => {
        this.accounts = accounts;
      }
    );
  }
}
