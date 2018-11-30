import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Group, User } from '../../../models';
import {
  AccountService,
  NotifierService,
  OrderService,
  GroupsService
} from '../../../services';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {
  groups: any[];
  accounts: any[];
  user: User;
  modalRef: BsModalRef;
  groupForm: FormGroup;
  addAccountForm: FormGroup;
  editGroupForm: FormGroup;
  group: any;
  groupAccounts: any;
  account: any;
  private readonly notifier: NotifierService;

  constructor(
    private modalService: BsModalService,
    private groupsService: GroupsService,
    private notifierService: NotifierService,
    public orderService: OrderService,
    public accountService: AccountService,
  ) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.orderService.groupByPair = false;
    this.groupsService.getGroups().subscribe(groups => this.groups = groups);
    this.accountService.getAccounts().subscribe(accounts => this.accounts = accounts);
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    this.groupForm = new FormGroup({
      name: new FormControl('', [<any>Validators.required]),
      allocation_method: new FormControl(0, [<any>Validators.required]),
      active: new FormControl(true, [<any>Validators.required]),
      exchange: new FormControl('bitfinex', [<any>Validators.required]),
      base_currency: new FormControl('usd', [<any>Validators.required]),
    });

    this.editGroupForm = new FormGroup({
      name: new FormControl('', [<any>Validators.required]),
      allocation_method: new FormControl(0, [<any>Validators.required]),
      active: new FormControl(true, [<any>Validators.required]),
      exchange: new FormControl('bitfinex', [<any>Validators.required]),
      base_currency: new FormControl('usd', [<any>Validators.required]),
    });

    this.addAccountForm = new FormGroup({
      account_id: new FormControl('', [<any>Validators.required]),
    });
  }

  get balance() {
    return this.orderService.balance;
  }

  openModal(template: TemplateRef<any>, options = {}) {
    this.modalRef = this.modalService.show(template, options);
  }

  createGroup(model: Group, isValid: boolean) {
    if (isValid) {
      this.groupsService.createGroup({ ...model, ...{ allocation_method: +model.allocation_method } })
        .subscribe(() => {
          this.groupsService.getGroups().subscribe(groups => this.groups = groups);
          this.accountService.getAccounts().subscribe(accounts => this.accounts = accounts);
          this.groupForm.reset({allocation_method: 0, active: true});
          this.modalRef.hide();
        });
    }
  }

  editGroup(model: Group, isValid: boolean) {
    if (isValid) {
      this.groupsService.editGroup(model)
        .subscribe(() => {
          this.modalRef.hide();
          this.notifier.notify( 'success', `Group success edited`);
        }, error1 => {
          this.notifier.notify( 'error', `Error msg: ${ error1.message }`);
        });
    }
  }

  createAccount(model: any, isValid: boolean) {
    if (isValid) {
      this.groupsService.addAccount(this.group.id, model)
        .subscribe((result: { group_id: string }) => {
          this.groupsService.getGroups().subscribe(groups => this.groups = groups);
          this.accountService.getAccounts().subscribe(accounts => this.accounts = accounts);
          this.updateGroupAccount(result.group_id);
          this.modalRef.hide();
        });
    }
  }

  chooseGroup(index) {
    this.group = this.groups[index];
    this.orderService.tradeType = 'group';
    this.orderService.tradeTypeId = this.group.id;
    this.orderService.fetchBalance();
    this.orderService.fetchOrders();
    this.orderService.fetchPositions();
    this.updateGroupAccount(this.group.id);
  }

  updateGroupAccount(id) {
    this.groupsService.getGroup(id).subscribe(group => this.groupAccounts = group.accounts);
  }

  chooseAccount(index) {
    this.account = this.groupAccounts[index];
    this.orderService.tradeType = 'account';
    this.orderService.tradeTypeId = this.account.id;
    this.orderService.fetchBalance();
    this.orderService.fetchOrders();
    this.orderService.fetchPositions();
  }

  edit(item_index, template: TemplateRef<any>) {
    this.editGroupForm.patchValue(this.groups[item_index]);
    this.openModal(template);
  }

  get role() {
    return this.user.role;
  }
}
