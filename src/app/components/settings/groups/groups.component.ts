import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';

import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import {
  BsModalRef,
  BsModalService,
} from 'ngx-bootstrap';

import {
  Group
} from '../../../models';

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

  @Input() groups: any;
  @Input() accounts: any;
  @Output() update: EventEmitter<any> = new EventEmitter();
  modalRef: BsModalRef;
  groupForm: FormGroup;
  addAccountForm: FormGroup;
  editGroupForm: FormGroup;
  group: any;
  groupAccounts: any;
  account: any;
  balance: any;
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

  openModal(template: TemplateRef<any>, options = {}) {
    this.modalRef = this.modalService.show(template, options);
  }

  createGroup(model: Group, isValid: boolean) {
    if (isValid) {
      this.groupsService.createGroup({...model, ...{allocation_method: +model.allocation_method}})
        .subscribe(() => {
            this.update.emit(null);
            this.groupForm.reset({allocation_method: 0, active: true});
            this.modalRef.hide();
          },
        );
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
          this.update.emit(null);
          this.updateGroupAccount(result.group_id);
          this.modalRef.hide();
        });
    }
  }

  chooseGroup(index) {
    this.group = this.groups[index];

    this.orderService.orders = [];
    this.orderService.positions = [];
    this.orderService.tradeType = 'group';
    this.orderService.tradeTypeId = this.group.id;

    this.orderService.getGroupBalance(this.group.id)
      .subscribe(balance => {
        this.balance = balance;
      });


    this.orderService.getGroupOrders(this.group.id)
      .subscribe(orders => {
        if (orders !== null && orders.length > 0) {
          this.orderService.orders = orders;
        }
      });


    this.orderService.getGroupPositions(this.group.id)
      .subscribe(positions => {
        if (positions !== null && positions.length > 0) {
          this.orderService.positions = positions;
        }
      });

    this.updateGroupAccount(this.group.id);
  }

  updateGroupAccount(id) {
    this.groupsService.getGroup(id)
      .subscribe(group => this.groupAccounts = group.accounts);
  }

  chooseAccount(index) {
    this.account = this.groupAccounts[index];

    this.orderService.orders = [];
    this.orderService.positions = [];

    this.orderService.tradeType = 'account';
    this.orderService.tradeTypeId = this.account.id;

    this.accountService.getAccount(this.account.id)
      .subscribe(account => {
        this.account = account;
      });

    this.orderService.getAccountBalance(this.account.id)
      .subscribe(balance => {
        this.balance = balance;
      });

    this.orderService.getAccountOrders(this.account.id)
      .subscribe(orders => {
        if (orders !== null && orders.length > 0) {
          this.orderService.orders = orders;
        }
      });

    this.orderService.getAccountPositions(this.account.id)
      .subscribe(positions => {
        if (positions !== null && positions.length > 0) {
          this.orderService.positions = positions;
        }
      });
  }

  edit(item_index, template: TemplateRef<any>) {
    this.editGroupForm.patchValue(this.groups[item_index]);
    this.openModal(template);
  }
}
