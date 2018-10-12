import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { GroupsService } from '../../services/groups.service';

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
  ) { }

  ngOnInit() {
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
