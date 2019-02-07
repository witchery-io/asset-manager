import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { getAccountsFromSection } from '@app/core/reducers';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { ModalService, SharedService } from '@app/shared/services';
import { BsModalRef } from 'ngx-bootstrap';
import { Store } from '@ngrx/store';
import { SettingsState } from '@settings/reducers';
import { getAccountFromSection } from '@settings/state/settings.selectors';
import { LoadAccount } from '@settings/actions/account.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { ACCOUNTS } from '@app/shared/enums/trading.enum';
import { AccountService } from '@app/core/services';
import { NotifierService } from 'angular-notifier';
import { Account } from '@app/core/intefaces';

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
  role = 'admin';
  faPlus = faPlus;
  faEdit = faEdit;
  modalRef: BsModalRef;
  formValues: any;
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

  get selectedAccount(): Account {
    return getAccountFromSection(this.account);
  }

  get accounts() {
    return getAccountsFromSection(this.accountsSection);
  }

  ngOnInit() {
    if (!this.route.firstChild) {
      return;
    }

    const generalTab = this.route.firstChild.snapshot.paramMap.get('generalTab');
    if (generalTab !== ACCOUNTS) {
      return;
    }

    const hasId = this.route.firstChild.snapshot.paramMap.has('id');
    if (!hasId) {
      return;
    }

    const id = this.route.firstChild.snapshot.paramMap.get('id');
    this.shared.setSettings({
      id: id,
      subId: null,
      subType: null,
      type: ACCOUNTS,
      generalTab: ACCOUNTS,
      orderTab: this.route.firstChild.snapshot.paramMap.get('orderTab'),
    });

    this.store.dispatch(new LoadAccount(id));
  }

  openModal(template: any, options = {}) {
    this.modalRef = this.modalService.show(template, options);
  }

  edit(account, template: any, options = {}) {
    this.formValues = account;
    this.openModal(template, options);
  }

  selectAccount(id) {
    if (!this.route.firstChild) {
      return;
    }

    this.shared.setSettings({
      id: id,
      subId: null,
      subType: null,
      type: ACCOUNTS,
      generalTab: ACCOUNTS,
      orderTab: this.route.firstChild.snapshot.paramMap.get('orderTab'),
    });

    this.store.dispatch(new LoadAccount(id));
  }

  /**
   * update current account
   * @param account --- updated account
   */
  updateStatus(account) {
    this.accountService.update(account.id, {isActive: !account.isActive})
      .subscribe(() => {
        this.notifier.notify('success', 'Status was successfully updated');
      });
  }
}
