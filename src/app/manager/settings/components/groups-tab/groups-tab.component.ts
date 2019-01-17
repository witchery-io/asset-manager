import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { getAccountsFromSection, getGroupsFromSection } from '@app/core/reducers';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { ModalService } from '@app/shared/services';
import { BsModalRef } from 'ngx-bootstrap';
import { GroupService } from '@app/core/services';
import { Store } from '@ngrx/store';
import { SettingsState } from '@settings/reducers';
import { getGroupFromSection } from '@settings/state/settings.selectors';
import { LoadGroup } from '@settings/actions/group.actions';
import { ActivatedRoute, Router } from '@angular/router';

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
    private route: ActivatedRoute,
    private router: Router,
  ) {
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
    const id = this.route.snapshot.paramMap.get('id');
    this.accountId = this.route.snapshot.paramMap.get('accId');
    this.store.dispatch(new LoadGroup(id));
  }

  openModal(template: any, options = {}) {
    this.modalRef = this.modalService.show(template, options);
  }

  edit(group, template: any, options = {}) {
    this.formValues = group;
    this.openModal(template, options);
  }

  selectGroup(id) {
    const orderTab = this.route.snapshot.paramMap.get('orderTab');
    const selGroup = this.router.navigate(
      [`./settings/groups/${id}/groups/${orderTab}`]
    );

    selGroup.then(() => {
      this.store.dispatch(new LoadGroup(id));
    });
  }

  selectAccount(accId: string) {
    const id = this.route.snapshot.paramMap.get('id');
    const orderTab = this.route.snapshot.paramMap.get('orderTab');
    const selAccount = this.router.navigate(
      [`./settings/accounts/${id}/${accId}/groups/${orderTab}`]
    );

    selAccount.then(() => {
      this.accountId = accId;
    });
  }
}
