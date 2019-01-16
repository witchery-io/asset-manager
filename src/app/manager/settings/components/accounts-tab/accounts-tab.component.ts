import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { getAccountsFromSection } from '@app/core/reducers';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { ModalService } from '@app/shared/services';
import { BsModalRef } from 'ngx-bootstrap';
import { SettingsSet } from '@settings/actions/settings.actions';
import { LoadBalance } from '@settings/actions/balance.actions';
import { LoadOrders } from '@settings/actions/orders.actions';
import { LoadPositions } from '@settings/actions/positions.actions';
import { Store } from '@ngrx/store';
import { SettingsState } from '@settings/reducers';
import { getAccountFromSection } from '@settings/state/settings.selectors';
import { LoadAccount } from '@settings/actions/account.actions';

@Component({
  selector: 'app-accounts-tab',
  templateUrl: 'accounts-tab.component.html',
  styleUrls: ['./accounts-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsTabComponent implements OnInit {

  @Input()
  accountS: any;

  @Input()
  accountsS: any;

  role = 'admin';
  faPlus = faPlus;
  faEdit = faEdit;
  modalRef: BsModalRef;
  formValues: any;

  constructor(
    private modalService: ModalService,
    private store: Store<SettingsState>,
  ) {
  }

  get currAccount() {
    return getAccountFromSection(this.accountS);
  }

  get accounts() {
    return getAccountsFromSection(this.accountsS);
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

  selectAccount(id) {
    /*
    * Set current trading id and type
    * */
    this.store.dispatch(new SettingsSet({id: id, type: 'accounts', groupByPair: false}));
    this.store.dispatch(new LoadAccount(id));

    /*
    * Load data
    * */
    this.store.dispatch(new LoadBalance({id: id, type: 'accounts', groupByPair: false}));
    this.store.dispatch(new LoadOrders({id: id, type: 'accounts', groupByPair: false}));
    this.store.dispatch(new LoadPositions({id: id, type: 'accounts', groupByPair: false}));
  }
}
