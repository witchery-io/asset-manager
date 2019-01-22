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

  constructor(
    private modalService: ModalService,
    private store: Store<SettingsState>,
    private route: ActivatedRoute,
    private router: Router,
    private shared: SharedService,
  ) {
  }

  get selectedAccount() {
    return getAccountFromSection(this.account);
  }

  get accounts() {
    return getAccountsFromSection(this.accountsSection);
  }

  ngOnInit() {
    const hasGeneralTab = this.route.snapshot.paramMap.has('generalTab');
    if (!hasGeneralTab) {
      return;
    }

    const generalTab = this.route.snapshot.paramMap.get('generalTab');
    if (generalTab !== ACCOUNTS) {
      return;
    }

    const hasId = this.route.snapshot.paramMap.has('id');
    if (!hasId) {
      return;
    }

    const id = this.route.snapshot.paramMap.get('id');

    this.shared.settingsSubject.next({
      id: id,
      subId: null,
      subType: null,
      type: ACCOUNTS,
      generalTab: ACCOUNTS,
      orderTab: this.route.snapshot.paramMap.get('orderTab'),
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
    this.shared.settingsSubject.next({
      id: id,
      subId: null,
      subType: null,
      type: ACCOUNTS,
      generalTab: ACCOUNTS,
      orderTab: this.route.snapshot.paramMap.get('orderTab'),
    });

    this.store.dispatch(new LoadAccount(id));
  }
}
