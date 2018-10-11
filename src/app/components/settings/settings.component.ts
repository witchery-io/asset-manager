import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { GroupsService } from '../../services/groups.service';
import { Group } from '../../models/group';
import { Account } from '../../models/account';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  modalRef: BsModalRef;
  accounts: any;
  groups: any;

  currentGroupId: string;
  currentGroupAccounts: string;

  account: any;

  groupForm: FormGroup;
  accountForm: FormGroup;
  addAccountForm: FormGroup;

  constructor(
    private modalService: BsModalService,
    private accountService: AccountService,
    public groupsService: GroupsService,
    ) { }

  ngOnInit() {
    this.accountService.getAccounts()
      .subscribe(accounts => {
        this.accounts = accounts;
      }
    );

    this.fetchGroup();

    this.accountService.getAccounts()
      .subscribe(account => {
        this.account = account[0];
      }
    );

    this.groupForm = new FormGroup({
      name: new FormControl('', [<any>Validators.required]),
      allocation_method: new FormControl(0, [<any>Validators.required]),
      active: new FormControl(true, [<any>Validators.required]),
      exchange: new FormControl('bifinex', [<any>Validators.required]),
      base_currency: new FormControl('usd', [<any>Validators.required]),
    });

    this.accountForm = new FormGroup({
      acc_name: new FormControl('', [<any>Validators.required]),
      user_name: new FormControl('', [<any>Validators.required]),
      risk: new FormControl(0, [<any>Validators.required]),
      exchange: new FormControl('', [<any>Validators.required]),
      base_currency: new FormControl('', [<any>Validators.required]),
    });

    this.addAccountForm = new FormGroup({
      account_id: new FormControl('', [<any>Validators.required]),
    });
  }

  fetchGroup() {
    this.groupsService.getGroups()
      .subscribe(groups => {
          this.groups = groups;
        }
      );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  currentAccount($event, id) {
    this.accountService.getAccount(id)
      .subscribe(account => {
          this.account = account;
        }
      );
  }

  choseGroupAccount(group_id) {
    this.currentGroupId = group_id;
    this.groupsService.getGroup(group_id)
      .subscribe(group => this.currentGroupAccounts = group.accounts);
  }

  createAccount(model: Account, isValid: boolean) {
    if (isValid) {
      this.accountService.createAccount({ ...model, ...{ risk : +model.risk }})
        .subscribe(() => {
          this.accountForm.reset({ risk: 0 });
          this.modalRef.hide();
        },
        error => console.log(error),
      );
    }
  }

  createGroup(model: Group, isValid: boolean) {
    if (isValid) {
      this.groupsService.createGroup({ ...model, ...{ allocation_method : +model.allocation_method }})
        .subscribe(() => {
          this.groupForm.reset({ allocation_method: 0, active: true });
          this.modalRef.hide();
        },
        error => console.log(error),
      );
    }
  }

  createAddAccount(model: any, isValid: boolean) {
    if (isValid) {
      this.groupsService.addAccount(this.currentGroupId, model)
        .subscribe((result: { group_id: string }) => {
          this.fetchGroup();
          this.choseGroupAccount(result.group_id);
          this.modalRef.hide();
        });
    }
  }
}
