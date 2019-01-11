import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { getGroupsFromSection } from '@app/core/reducers';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { ModalService } from '@app/shared/services';
import { BsModalRef } from 'ngx-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  groupForm: FormGroup;
  addAccountForm: FormGroup;
  editGroupForm: FormGroup;
  @Input()
  id: string;

  @Input()
  section: any;

  constructor(
    private modalService: ModalService,
  ) {
  }

  ngOnInit() {
    this.groupForm = new FormGroup({
      name: new FormControl('', [<any>Validators.required]),
      allocation_method: new FormControl(0, [<any>Validators.required]),
      active: new FormControl(true, [<any>Validators.required]),
      exchange: new FormControl('bitfinex', [<any>Validators.required]),
      base_currency: new FormControl('usd', [<any>Validators.required]),
    });

    this.editGroupForm = new FormGroup({
      name: new FormControl('', [<any>Validators.required]),
      allocation_method: new FormControl(0, [<any>Validators.required]),
      active: new FormControl(true, [<any>Validators.required]),
      exchange: new FormControl('bitfinex', [<any>Validators.required]),
      base_currency: new FormControl('usd', [<any>Validators.required]),
    });

    this.addAccountForm = new FormGroup({
      account_id: new FormControl('', [<any>Validators.required]),
    });
  }

  get groups() {
    return getGroupsFromSection(this.section);
  }

  openModal(template: TemplateRef<any>, options = {}) {
    this.modalRef = this.modalService.show(template, options);
  }

  selectGroup() {
    // select current group
  }

  selectAccount() {
    // code ...
  }

  edit(group, template: TemplateRef<any>) {
    this.editGroupForm.patchValue(group);
    this.openModal(template);
  }

  get accounts() {
    return [];
  }

  get accountsOfGroup() {
    return [];
  }
}
