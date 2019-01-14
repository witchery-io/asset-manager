import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { getAccountsFromSection, getGroupsFromSection } from '@app/core/reducers';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { ModalService } from '@app/shared/services';
import { BsModalRef } from 'ngx-bootstrap';
import { Observable, of } from 'rxjs';
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

  ngOnInit() {
    this.group = this.groupService.getGroup(this.id);
  }

  get groups() {
    return getGroupsFromSection(this.section);
  }

  get accounts() {
    return getAccountsFromSection(this.accountsS);
  }

  openModal(template: TemplateRef<any>, options = {}) {
    this.modalRef = this.modalService.show(template, options);
  }

  edit(group, template: TemplateRef<any>) {
    this.formValues = group;
    this.openModal(template, { class: 'modal-sm' });
  }

  selectGroup() {
    // select current group
  }

  selectAccount() {
    // code ...
  }
}
