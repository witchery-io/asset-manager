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
  account: any;
  groupForm: FormGroup;
  accountForm: FormGroup;

  constructor(
    private modalService: BsModalService,
    private accountService: AccountService,
    public groupsService: GroupsService,
    ) { }

  ngOnInit() {
    this.accounts = this.accountService.getAccounts()
      .subscribe(accounts => {
        this.accounts = accounts;
      }
    );

    this.account = this.accountService.getAccount()
      .subscribe(account => {
        this.account = account;
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
      exchanges_name: new FormControl('', [<any>Validators.required]),
      base_currency: new FormControl('', [<any>Validators.required]),
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  createAccount(model: Account, isValid: boolean) {
    if (isValid) {
      this.accountService.createAccount(model)
        .subscribe(() => {
          this.accountForm.reset({ risk: 0 });
          this.modalRef.hide();
        },
        error => console.log(error),
      );
    }
  }

  currentAccount($event, id) {
    this.accountService.getAccount(id)
      .subscribe(account => {
        this.account = account;
      }
    );
  }

  createGroup(model: Group, isValid: boolean) {
    if (isValid) {
      this.groupsService.createGroup(model).subscribe(
        () => {
          this.groupForm.reset({ allocation_method: 0, active: true });
          this.modalRef.hide();
        },
        error => console.log(error),
      );
    }
  }
}
