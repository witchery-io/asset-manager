import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { getAccountsFromSection, getGroupsFromSection } from '@app/core/reducers';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { ModalService, SharedService } from '@app/shared/services';
import { BsModalRef } from 'ngx-bootstrap';
import { GroupService } from '@app/core/services';
import { Store } from '@ngrx/store';
import { SettingsState } from '@settings/reducers';
import { LoadGroup } from '@settings/actions/group.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { ACCOUNTS, GROUPS } from '@app/shared/enums/trading.enum';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-groups-tab',
  templateUrl: './groups-tab.component.html',
  styleUrls: ['./groups-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupsTabComponent implements OnInit {
  @Input()
  group: any;

  @Input()
  groupsSection: any;

  @Input()
  accountsSection: any;

  @Output()
  select: EventEmitter<any> = new EventEmitter();

  @Input()
  settings: any;

  formValues: any;
  role = 'admin';
  faPlus = faPlus;
  faEdit = faEdit;
  modalRef: BsModalRef;
  private readonly notifier: NotifierService;

  constructor(
    private modalService: ModalService,
    private groupService: GroupService,
    private store: Store<SettingsState>,
    private route: ActivatedRoute,
    private router: Router,
    private shared: SharedService,
    private notifierService: NotifierService,
  ) {
    this.notifier = notifierService;
  }

  get groups() {
    return getGroupsFromSection(this.groupsSection);
  }

  get accounts() {
    return getAccountsFromSection(this.accountsSection);
  }

  get allocationMethod() {
    if (!this.group) {
      return '';
    }

    return this.group.allocationMethod;
  }

  multiplier(val) {
    return this.group.multiplierType === 'fix' ? val || 0 : `${((val || 0)  * 100)}%`;
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

  /**
   * update current group
   * @param group --- updated group
   */
  updateStatus(group) {
    this.groupService.update(group.id, {status: {isActive: !group.status.isActive}})
      .subscribe(() => {
        this.notifier.notify('success', 'Status was successfully updated');
      });
  }

  selectGroup(groupId) {
    this.select.emit({id: groupId, type: GROUPS, subId: null, subType: null});
    this.store.dispatch(new LoadGroup(groupId));
  }

  selectAccount(accountId: string) {
    this.select.emit({id: this.settings.id, type: GROUPS, subId: accountId, subType: ACCOUNTS});
  }
}
