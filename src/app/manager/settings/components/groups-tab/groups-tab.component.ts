import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { getAccountsFromSection, getGroupsFromSection } from '@app/core/reducers';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { ModalService, SharedService } from '@app/shared/services';
import { BsModalRef } from 'ngx-bootstrap';
import { GroupService } from '@app/core/services';
import { Store } from '@ngrx/store';
import { SettingsState } from '@settings/reducers';
import { getGroupFromSection } from '@settings/state/settings.selectors';
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

  subId: string;
  role = 'admin';
  faPlus = faPlus;
  faEdit = faEdit;
  modalRef: BsModalRef;
  formValues: any;

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

  get selectedGroup() {
    return getGroupFromSection(this.group);
  }

  get groups() {
    return getGroupsFromSection(this.groupsSection);
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
    if (generalTab !== GROUPS) {
      return;
    }

    const hasId = this.route.snapshot.paramMap.has('id');
    if (!hasId) {
      return;
    }

    const id = this.route.snapshot.paramMap.get('id');
    const subId = this.route.snapshot.paramMap.get('subId');

    this.shared.setSettings({
      id: id,
      subId: subId,
      subType: this.route.snapshot.paramMap.get('subType'),
      type: GROUPS,
      generalTab: generalTab,
      orderTab: this.route.snapshot.paramMap.get('orderTab'),
    });

    this.store.dispatch(new LoadGroup(id));

    const hasSubType = this.route.snapshot.paramMap.has('subType');
    if (hasSubType) {
      this.subId = subId;
    }
  }

  openModal(template: any, options = {}) {
    this.modalRef = this.modalService.show(template, options);
  }

  edit(group, template: any, options = {}) {
    this.formValues = group;
    this.openModal(template, options);
  }

  selectGroup(id) {
    this.shared.setSettings({
      id: id,
      subId: null,
      subType: null,
      type: GROUPS,
      generalTab: GROUPS,
      orderTab: this.route.snapshot.paramMap.get('orderTab'),
    });

    this.store.dispatch(new LoadGroup(id));
  }

  selectAccount(accId: string) {
    this.subId = accId;

    this.shared.setSettings({
      id: this.route.snapshot.paramMap.get('id'),
      subId: accId,
      subType: ACCOUNTS,
      type: GROUPS,
      generalTab: GROUPS,
      orderTab: this.route.snapshot.paramMap.get('orderTab'),
    });
  }
}
