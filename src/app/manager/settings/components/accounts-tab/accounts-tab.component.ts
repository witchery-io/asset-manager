import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { getAccountsFromSection } from '@app/core/reducers';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { ModalService, SharedService } from '@app/shared/services';
import { BsModalRef } from 'ngx-bootstrap';
import { Store } from '@ngrx/store';
import { SettingsState } from '@settings/reducers';
import { LoadAccount } from '@settings/actions/account.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { ACCOUNTS } from '@app/shared/enums/trading.enum';
import { AccountService } from '@app/core/services';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-accounts-tab',
  templateUrl: 'accounts-tab.component.html',
  styleUrls: ['./accounts-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsTabComponent implements OnInit {
  @Input()
  account: any;

  @Input()
  accountsSection: any;

  @Output()
  select: EventEmitter<any> = new EventEmitter();

  formValues: any;
  role = 'admin';
  faPlus = faPlus;
  faEdit = faEdit;
  modalRef: BsModalRef;
  private readonly notifier: NotifierService;

  constructor(
    private modalService: ModalService,
    private store: Store<SettingsState>,
    private route: ActivatedRoute,
    private router: Router,
    private shared: SharedService,
    private accountService: AccountService,
    private notifierService: NotifierService,
  ) {
    this.notifier = notifierService;
  }

  get accounts() {
    return getAccountsFromSection(this.accountsSection);
  }

  ngOnInit() {
  }

  openModal(template: any, options = {}) {
    this.modalRef = this.modalService.show(template, options);
  }

  edit(account, template: any, options = {}) {
    this.formValues = account;
    this.openModal(template, options);
  }

  selectAccount(accountId) {
    this.select.emit({id: accountId, type: ACCOUNTS});
    this.store.dispatch(new LoadAccount(accountId));
  }

  /**
   * update current account
   * @param account --- updated account
   */
  updateStatus(account) {
    this.accountService.update(account.id, {status: {isActive: !account.isActive}})
      .subscribe(() => {
        this.notifier.notify('success', 'Status was successfully updated');
      });
  }
}
