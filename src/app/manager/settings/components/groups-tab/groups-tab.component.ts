import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { getGroupsFromSection } from '@app/core/reducers';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { ModalService } from '@app/shared/services';
import { BsModalRef } from 'ngx-bootstrap';
import { of } from 'rxjs';

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

  formValues: any;

  @Input()
  id: string;

  @Input()
  section: any;

  constructor(
    private modalService: ModalService,
  ) {
  }

  get groups() {
    return getGroupsFromSection(this.section);
  }

  get accounts() {
    return of();
  }

  get accountsOfGroup() {
    return [];
  }

  ngOnInit() {
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
