import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { getAccountsFromSection, getGroupsFromSection } from '@app/core/reducers';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { ModalService } from '@app/shared/services';
import { BsModalRef } from 'ngx-bootstrap';
import { Observable } from 'rxjs';
import { GroupService } from '@app/core/services';

@Component({
  selector: 'app-groups-tab',
  templateUrl: './groups-tab.component.html',
  styleUrls: ['./groups-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupsTabComponent implements OnInit {

  role = 'admin';
  faPlus = faPlus;
  faEdit = faEdit;
  modalRef: BsModalRef;

  @Input()
  accountsS: any;

  formValues: any;

  @Input()
  id: string;

  @Input()
  section: any;

  group: Observable<any>;

  constructor(
    private modalService: ModalService,
    private groupService: GroupService,
  ) {
  }

  get groups() {
    return getGroupsFromSection(this.section);
  }

  get accounts() {
    return getAccountsFromSection(this.accountsS);
  }

  ngOnInit() {
    this.group = this.groupService.getGroup(this.id);
  }

  openModal(template: any, options = {}) {
    this.modalRef = this.modalService.show(template, options);
  }

  edit(group, template: any, options = {}) {
    this.formValues = group;
    this.openModal(template, options);
  }

  selectGroup() {
    // select current group
  }

  selectAccount() {
    // code ...
  }
}
