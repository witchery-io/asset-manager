import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { getAccountsFromSection, getGroupsFromSection } from '@app/core/reducers';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { ModalService } from '@app/shared/services';
import { BsModalRef } from 'ngx-bootstrap';
import { GroupService } from '@app/core/services';
import { SettingsSet, SettingsUpdate } from '@settings/actions/settings.actions';
import { LoadBalance } from '@settings/actions/balance.actions';
import { LoadOrders } from '@settings/actions/orders.actions';
import { LoadPositions } from '@settings/actions/positions.actions';
import { Store } from '@ngrx/store';
import { SettingsState } from '@settings/reducers';
import { getGroupFromSection } from '@settings/state/settings.selectors';
import { LoadGroup } from '@settings/actions/group.actions';

@Component({
  selector: 'app-groups-tab',
  templateUrl: './groups-tab.component.html',
  styleUrls: ['./groups-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupsTabComponent implements OnInit {

  @Input()
  groupS: any;

  @Input()
  groupsS: any;

  @Input()
  accountsS: any;

  @Input()
  accountId: string;

  role = 'admin';
  faPlus = faPlus;
  faEdit = faEdit;
  modalRef: BsModalRef;
  formValues: any;


  constructor(
    private modalService: ModalService,
    private groupService: GroupService,
    private store: Store<SettingsState>,
  ) {
  }

  get selectedGroup() {
    return getGroupFromSection(this.groupS);
  }

  get groups() {
    return getGroupsFromSection(this.groupsS);
  }

  get accounts() {
    return getAccountsFromSection(this.accountsS);
  }

  ngOnInit() {
  }

  openModal(template: any, options = {}) {
    this.modalRef = this.modalService.show(template, options);
  }

  edit(group, template: any, options = {}) {
    this.formValues = group;
    this.openModal(template, options);
  }

  selectGroup(id) {
    /*
    * Set current trading id and type
    * */
    this.store.dispatch(new SettingsUpdate({
      id: id,
      accountId: null,
    }));
    this.store.dispatch(new LoadGroup(id));

    /*
    * Load data
    * */
    this.store.dispatch(new LoadBalance({
      id: id,
      type: 'groups',
      groupByPair: false,
    }));
    this.store.dispatch(new LoadOrders({
      id: id,
      type: 'groups',
      groupByPair: false,
    }));
    this.store.dispatch(new LoadPositions({
      id: id,
      type: 'groups',
      groupByPair: false,
    }));
  }

  selectAccount(id) {
    /*
    * Set current trading id and type
    * */
    this.store.dispatch(new SettingsUpdate({
      accountId: id,
    }));

    /*
    * Load data
    * */
    this.store.dispatch(new LoadBalance({
      id: id,
      type: 'groups',
      groupByPair: false,
    }));
    this.store.dispatch(new LoadOrders({
      id: id,
      type: 'groups',
      groupByPair: false,
    }));
    this.store.dispatch(new LoadPositions({
      id: id,
      type: 'groups',
      groupByPair: false,
    }));
  }
}
