import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { getAccountsFromSection } from '@app/core/reducers';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { ModalService } from '@app/shared/services';
import { BsModalRef } from 'ngx-bootstrap';
import { SettingsUpdate } from '@settings/actions/settings.actions';
import { LoadBalance } from '@settings/actions/balance.actions';
import { LoadOrders } from '@settings/actions/orders.actions';
import { LoadPositions } from '@settings/actions/positions.actions';
import { Store } from '@ngrx/store';
import { SettingsState } from '@settings/reducers';
import { getAccountFromSection } from '@settings/state/settings.selectors';
import { LoadAccount } from '@settings/actions/account.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadGroup } from '@settings/actions/group.actions';

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
  ) {
  }

  get selectedAccount() {
    return getAccountFromSection(this.account);
  }

  get accounts() {
    return getAccountsFromSection(this.accountsSection);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.store.dispatch(new LoadAccount(params.id));
    });
  }

  openModal(template: any, options = {}) {
    this.modalRef = this.modalService.show(template, options);
  }

  edit(account, template: any, options = {}) {
    this.formValues = account;
    this.openModal(template, options);
  }

  selectAccount(id) {
    const orderTab = this.route.snapshot.paramMap.get('orderTab');
    const selAccount = this.router.navigate(
      [`./settings/accounts/${id}/accounts/${orderTab}`]
    );

    selAccount.then(() => {});
  }
}
